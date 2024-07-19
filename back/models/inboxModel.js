import mongoose from "mongoose";

const inboxSchema  = new mongoose.Schema({

    userID1: {
        type: String,
        required: true,
    },

    userID2: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now(),
    },

    dateString: {
        type: String,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    state: {
        type: Boolean,
        default: 0,
    },



})


const inboxModel = mongoose.model("inboxs",inboxSchema);

export default inboxModel;