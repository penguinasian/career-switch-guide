<template>
  <Navbar :isLoggedIn="isLoggedIn" />
  <div class="user-profile">
    <h1>{{ userName }}</h1>
    <h3>Below are the blog(s) you have shared</h3>
    <div class="user-stories">
      <div v-if="userBlogs.length > 0" class="user-stories">
        <div
          v-for="userBlog in userBlogs"
          :key="userBlog.userEmail"
          class="user-story"
        >
          <UserBlogCard :userBlog="userBlog" class="user-blog-card" :edit="edit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useRequireAuth from "@/composables/useRequireAuth";
import Navbar from "../components/Navbar.vue";
import fetchBlog from "@/composables/fetchBlog";
import { ref } from "vue";
import UserBlogCard from "../components/UserBlogCard.vue";

export default {
  name: "Profile",
  components: { Navbar, UserBlogCard },

  setup() {
    const userEmail = localStorage.getItem("email");
    console.log(userEmail);
    const edit = ref(true)

    const { isLoggedIn, userName, requireAuth } = useRequireAuth(userEmail);
    requireAuth(userEmail);

    const { userBlogs, error } = fetchBlog(userEmail)

    return {
      isLoggedIn,
      requireAuth,
      userName,
      userBlogs,
      error,
      edit
    };
  },
};
</script>


<style>
.user-profile {
  margin-top: 100px;
}
</style>