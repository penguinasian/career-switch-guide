import mongoose from "mongoose";
import Blog from "../models/blogSchema.js";


// Post a blog
const postBlog = async (req, res) => {

    try {
        console.log(req.body)
        const response = await new Blog(req.body).save()
        res.status(200).json({blogData: req.body})

    } catch (error) {
        console.error(error.message)
        res.status(409).json({message: error.message})
    }
}

// Edit a blog
const editBlog = async (req, res) => {
    
    let blogId = req.params.id

    console.log(new mongoose.Types.ObjectId(blogId))

    const blog = req.body.blog
    
    try {
        
        const response = await Blog.findOneAndUpdate({_id: new mongoose.Types.ObjectId(blogId)}, {blog}, {new: true})
        res.status(200).json({message: "successfully updated"})

    } catch (error) {
        
        res.status(409).json({message: error.message})
    }
}

// Get blogs
const getBlogs = async (req, res) => {

    try {
        
        const response = await Blog.find({})
        res.status(200).json(response)
        console.log(response)

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}


// Get a blog
const getBlog = async (req, res) => {

        const  id  = req.params.id
        console.log(new mongoose.Types.ObjectId(id))
        console.log(id)
    try {
        
        const response = await Blog.findById({_id: new mongoose.Types.ObjectId(id)})
        console.log(response)
        res.status(200).json(response)

    } catch (error) {
        
        res.status(409).json({message: error.message})
    }
}


export { postBlog, getBlogs, getBlog, editBlog }