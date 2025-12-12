// BackEnd/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    //Unique username of the user
    username: {
        type: String,
        required: true,
        unique: true
    },
    //Unique email address of the user
    email: {
        type: String,
        required: true,
        unique: true
    },
    //User password (stored in hashed form)
    password: {
        type: String,
        required: true
    },
    isAdmin: { 
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true 
});

//PRE-SAVE HOOK (PASSWORD HASHING)
//This function runs before saving the user document to the database
userSchema.pre('save', async function (next) {
    //If the password was not modified (for example, only email was updated), skip hashing
    if (!this.isModified('password')) {
        next();
    }
    
    //1.Generate a random salt
    const salt = await bcrypt.genSalt(10);
    
    //2.Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
});

//METHODS (PASSWORD COMPARISON)
//Method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;