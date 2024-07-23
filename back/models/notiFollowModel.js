import mongoose from "mongoose";

const notiFollowSchema  = new mongoose.Schema({

    followID: {
        type: String,
        required: true,
    }, 

    followerID: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        requires: true,
    },

    date: {
        type: Date,
        default: Date.now(),
    },

    dateString: {
        type: String,
        required: true,
    },

    img: {
        type: String,
        required: true,
    }



  

})


const notiFollowModel = mongoose.model("notiFollows", notiFollowSchema);

export default notiFollowModel;