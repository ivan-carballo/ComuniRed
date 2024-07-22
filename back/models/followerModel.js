import mongoose from "mongoose";

const followerSchema  = new mongoose.Schema({

    userID: {
        type: String,
        required: true,
    },

    follower: {
        type: Array,
    }

  

})


const followerModel = mongoose.model("followers",followerSchema);

export default followerModel;