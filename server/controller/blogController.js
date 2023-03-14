import Blog from "../models/blogSchema.js";


// Post a blog
const postBlog = async (req, res) => {

    const { curIndustry, preIndustry, reasons, obstacles, schoolExperience, newWorkExperience, moreAdvice, email, user} = req.body

    try {
        
        const response = await new Blog(req.body).save()
        res.status(200).json({blogData: req.body})

    } catch (error) {
        console.error(error.message)
        res.status(409).json({message: error.message})
    }
}

// Get blogs
const getBlogs = async (req, res) => {

    try {
        
        const response = await Blog.find({})
        res.status(200).json(response)

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export { postBlog, getBlogs }