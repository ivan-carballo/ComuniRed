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
        type: Array,
        required: true,
    },

})


const inboxModel = mongoose.model("notiinboxs",inboxSchema);

export default inboxModel;