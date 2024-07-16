import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({

    postPrincipalID: {
        type: String,
        required: true,
    },

    userPrincipalID :{
        type: String,
        required: true,
    },

    username: {
        type: String,
        require: true
    },

    dateString: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

    post: {
        type: String,
        required: true,
    },



})


const notificationModel = mongoose.model("notifications",userSchema);

export default notificationModel;