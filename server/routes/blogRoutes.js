import express from 'express';
import { postBlog, getBlogs, getBlog, editBlog } from '../controller/blogController.js';
import authValidation from "../middleware/authValidation.js";

const blogRouter = express.Router()


blogRouter.use(authValidation)


blogRouter.post('/post',  postBlog)

blogRouter.get('/posts', getBlogs)

blogRouter.get('/post/:id', getBlog)

blogRouter.post('/post/:id', editBlog)

export { blogRouter }