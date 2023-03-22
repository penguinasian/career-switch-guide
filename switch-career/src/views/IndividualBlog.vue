<template>
  <Navbar :isLoggedIn="isLoggedIn"/>
  <div v-if="blogData" class="individual-blog">
    <h2>Welcome to {{ blogData.user }}'s blog! </h2>
    <p>{{ blogData.user }} was previously in {{blogData.preIndustry}} industry. Now they are {{blogData.curIndustry}} industry</p>
    <p>We hope their journey and experiences can be an inspiration to you!</p>

    <div class="blog">
      <p>{{ blogData.blog }}</p>
    </div>

  </div>
  <div class="test">

  </div>
  <Footer />
</template>

<script>
import useRequireAuth from '../composables/useRequireAuth';
import {useRoute} from "vue-router";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { ref } from "vue";

export default {
    name: 'Blog',
    components: { Navbar, Footer },
    setup(props) {

        const userEmail = localStorage.getItem("email")
        const jwttoken = localStorage.getItem("jwttoken")
        const { isLoggedIn, requireAuth } = useRequireAuth(userEmail)
        requireAuth(userEmail)
        const route = useRoute()
        console.log(route)
        const blogId = route.params.id
        console.log(blogId)
        const blogData = ref(null)

        const getABlog = async () => {

          try {
            
              const response = await fetch("http://localhost:3000/api/v1/blog/post/" + blogId, {
                method: "Get",
                headers: {
                  "Content-Type": "Application/json",
                  "Authorization": "Bearer " + jwttoken,  
                }
              })

              if (!response.ok) {
                throw new Error('Fetch failed')
              }
              const data = await response.json()
              console.log(data)
              blogData.value = data
              
          } catch (err) {
              console.error(err.message)
          }
        }

        getABlog()

        return { blogId, isLoggedIn, requireAuth, getABlog, blogData }
    }
}
</script>

<style scoped>


.individual-blog {
  margin: auto;
  margin-top: 120px;
  margin-bottom: 100px;
}

.blog{
  
  max-width: 1200px;
  margin: auto;
  margin-top: 50px;
  box-shadow: 5px 10px 12px #acabab;
  padding: 15px;

  border-radius: 6px;
}

.blog p {
  text-align: start;
  line-height: 2rem;
}


</style>