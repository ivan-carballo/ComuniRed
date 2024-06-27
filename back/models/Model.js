import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({

    tipo : {
        type: String,
        required: true
    },




})


const userModel = mongoose.model("",userSchema);

export default userModel;