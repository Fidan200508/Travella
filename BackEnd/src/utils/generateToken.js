// BackEnd/utils/generateToken.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); //Load JWT_SECRET from the .env file

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', //Token expiration time:30 days
    });
};

export default generateToken;