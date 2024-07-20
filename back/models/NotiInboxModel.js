import mongoose from "mongoose";

const notiInboxSchema  = new mongoose.Schema({

    userSend: {
        type: String,
        required: true,
    },

    userReceived: {
        type: String,
        required: true,
    },

})


const notiInboxModel = mongoose.model("inboxs",notiInboxSchema);

export default notiInboxModel;