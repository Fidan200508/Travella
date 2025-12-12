// BackEnd/setupTests.js
import dotenv from 'dotenv';

//Load the .env file into the Jest test environment
dotenv.config({ path: './.env' }); 

//If you want to use a different database for the TEST environment:
//process.env.MONGO_URI = process.env.TEST_MONGO_URI;