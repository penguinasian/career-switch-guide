import express from 'express';
import { postBlog, getBlogs } from '../controller/blogController.js';

const blogRouter = express.Router()


blogRouter.post('/post', postBlog)

blogRouter.get('/posts', getBlogs)


export { blogRouter }