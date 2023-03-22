import mongoose from "mongoose";

const { Schema } = mongoose

const blogSchema = new Schema({

    curIndustry: String,
    preIndustry: String,
    blog: String,
    user: String,
    // postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userEmail: String,
    postedBy: String

})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog