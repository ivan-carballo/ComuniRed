import mongoose from "mongoose";

const postSchema  = new mongoose.Schema({

    userID: {
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


const postModel = mongoose.model("posts",postSchema);

export default postModel;