import mongoose from "mongoose";

const responseSchema  = new mongoose.Schema({

    postID: {
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
    }



})


const responseModel = mongoose.model("responses",responseSchema);

export default responseModel;