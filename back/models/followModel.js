import mongoose from "mongoose";

const followSchema  = new mongoose.Schema({

    userID: {
        type: String,
        required: true,
    },

    follow: {
        type: Array,
    }

  

})


const followModel = mongoose.model("follows",followSchema);

export default followModel;