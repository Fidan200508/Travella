// BackEnd/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

//1.PROTECT FUNCTION 
export const protect = async (req, res, next) => {
    let token;

    //1.Check if Authorization header contains a Bearer token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //Extract the token from the Bearer string
            token = req.headers.authorization.split(' ')[1];

            //2.Verify the token using the secret key
            //Decode the token using JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //3.Find the user in the database
            //Get user by ID from token and exclude the password field
            req.user = await User.findById(decoded.id).select('-password');
            
            //If everything is valid, move to the next function (controller)
            next();

        } catch (error) {
            console.error('Token Xətası:', error);
            //401 Unauthorized status code
            res.status(401).json({ message: 'Token is not available.' });
        }
    }

    //If no token is found
    if (!token) {
        res.status(401).json({ message: 'Not found.' });
    }
};

//2.ADMIN CHECK FUNCTION
export const admin = (req, res, next) => {
    //If protect middleware passed, req.user will be available
    if (req.user && req.user.isAdmin) {
        next(); //Allow access if user is admin
    } else {
        res.status(401).json({ message: 'Admin icazəsi tələb olunur.' });
    }
};