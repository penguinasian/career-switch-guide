import mongoose from "mongoose";

const { Schema } = mongoose

const blogSchema = new Schema({

    curIndustry: String,
    preIndustry: String,
    reasons: String,
    obstacles: String,
    schoolExperience: String,
    newWorkExperience: String,
    moreAdvice: String,
    // postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    postedBy: String

})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog