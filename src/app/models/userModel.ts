// define user schema and model

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required!"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})

// Because nextjs has a different behaviour, it attempts to create new model for every Db query. 
// check if users model already exists, if so, use that instance for DB queries
// else create a new one. 
export const User = mongoose.models.users || mongoose.model("users",userSchema)