import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },

    ban: {
        type: String,
        enum: ['no', 'yes'],
        default: 'no'
    }, 

    dateban: {
        type: Date,
    },

    img: {
        type: String,
    }




})


const userModel = mongoose.model("users",userSchema);

export default userModel;