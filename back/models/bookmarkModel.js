import mongoose from "mongoose";

const bookmarkSchema  = new mongoose.Schema({

    userID: {
        type: String,
        required: true,
    },

    postID: {
        type: Array,
        require: true
    }
})


const BookmarkModel = mongoose.model("bookmarks",bookmarkSchema);

export default BookmarkModel;