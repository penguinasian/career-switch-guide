import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogForm from '../views/BlogForm.vue'
import UserBlogs from '../views/UserBlogs.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blog-form',
    name: 'blog-form',
    component: BlogForm
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: UserBlogs
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
