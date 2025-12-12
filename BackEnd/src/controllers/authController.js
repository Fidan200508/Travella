// BackEnd/controllers/authController.js

import User from '../models/User.js';
import generateToken from '../utils/generateToken.js'; // QEYD: Bu faylı Addım 5-də yaradacağıq!

//1.REGISTER 
//ROUTE:POST /api/auth/register
export const registerUser = async (req, res) => {
    //1.Get user input data from request body
    const { username, email, password } = req.body;

   //2.Check if the email already exists in the database
    const userExists = await User.findOne({ email });

    if (userExists) {
        //400 Bad Request status code
        res.status(400).json({ message: "Bu email artıq qeydiyyatdan keçib." });
        return;
    }

    try {
        //3.Create a new user (password is automatically hashed in User.js model)
        const user = await User.create({
            username,
            email,
            password,
        });

        if (user) {
            //4.Send successful response (201 Created)
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),//Generate and send JWT token to the user
            });
        }
    } catch (error) {
        res.status(400).json({ message: "Registration failed: " + error.message });
    }
};

//2.LOGIN 
//ROUTE:POST /api/auth/login
export const authUser = async (req, res) => {
    //1.Get email and password from request body
    const { email, password } = req.body;

    //2.Find user in the database by email
    const user = await User.findOne({ email });

    //3.If user exists AND password is correct (matchPassword is defined in User model)
    if (user && (await user.matchPassword(password))) {
        //4.Send successful response (200 OK)
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), //Send JWT token again
        });
    } else {
        // 401 Unauthorized status kodu
        res.status(401).json({ message: "Invalid email or password." });
    }
};