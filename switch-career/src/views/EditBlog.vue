<template>
  <Navbar :isLoggedIn="isLoggedIn" />
  <div v-if="blogData" class="edit-blog">
    <h2>Hi {{ blogData.user }}</h2>

    <p>You can now edit your blog</p>

    <form class="blog-content" @submit.prevent="handleEditBlog">
      <textarea v-model="updatedBlog"></textarea>
      <button class="btn-primary">Submit</button>
    </form>
  </div>
  <div class="test"></div>
  <Footer />
</template>


<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import fetchABlog from "../composables/fetchABlog";
import useRequireAuth from "../composables/useRequireAuth";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "EditBlog",
  components: { Navbar, Footer },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const blogId = route.params.id;

    const userEmail = localStorage.getItem("email");
    const jwttoken = localStorage.getItem("jwttoken");

    const { isLoggedIn, requireAuth } = useRequireAuth(userEmail, jwttoken);

    requireAuth(userEmail);

    const { blogData, blogContent } = fetchABlog(blogId, jwttoken);
    console.log("blog data: ", blogData.value)

    const updatedBlog = ref(blogContent);
    console.log(updatedBlog.value);

    const handleEditBlog =  async () => {

      try {
        
        const response = await fetch("http://localhost:3000/api/v1/blog/post/" + blogId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + jwttoken,
          },
          body: JSON.stringify({blog: updatedBlog.value}),
        });

        const data = await response.json();
        console.log(data);
        
        router.push({name: "profile"})
      } catch (error) {
        console.error(error.message);
      }
    }

    return { blogData, isLoggedIn, blogContent, updatedBlog, handleEditBlog };
  },
};
</script>

<style scoped>
.edit-blog {
  margin-top: 100px;
}

textarea {
  padding: 10px;
  border: none;
  background: lightgray;
  width: 882px;
  height: 600px;
  border-radius: 6px;
  box-shadow: 5px 10px 12px #acabab;
}

.blog-content {
  display: flex;
  flex-direction: column;
}


</style>