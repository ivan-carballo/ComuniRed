import mongoose from "mongoose";

const notificationSchema  = new mongoose.Schema({

    postPrincipalID: {
        type: String,
        required: true,
    },

    userPrincipalID :{
        type: String,
        required: true,
    },

    responseID: {
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

    img: {
        type: String,
    },



})


const notificationModel = mongoose.model("notifications",notificationSchema);

export default notificationModel;