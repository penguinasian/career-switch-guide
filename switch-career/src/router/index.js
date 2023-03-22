import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogForm from '../views/BlogForm.vue'
import UserBlogs from '../views/UserBlogs.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Blog from '../views/IndividualBlog.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '../views/Profile.vue'
import EditBlog from '../views/EditBlog.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: About
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
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/blogs/:id',
    name: 'blog',
    component: Blog,
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    props: true
  },
  {
    path: '/blog-edit/:id',
    name: 'edit-blog',
    component: EditBlog
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
