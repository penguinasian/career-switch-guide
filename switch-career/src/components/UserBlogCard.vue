<template>
  <div class="user-blog-card">
    <h2>{{ userBlog.user }}</h2>
    <div>
      <p> Current Industry: {{ userBlog.curIndustry }}</p>
      <p> Previous Industry: {{ userBlog.preIndustry }}</p>
    
    </div>
    <router-link :to="{ name: 'blog', params: { id: userBlog._id } }"><button v-if="!edit" class="btn-primary">Read more</button></router-link>
    <router-link :to="{ name: 'edit-blog', params: { id: userBlog._id } }"><button v-if="edit" class="btn-primary">Edit your blog</button></router-link>
    <!-- <button class="btn-primary">Read more</button> -->
  </div>
 
</template>

<script>
import { ref } from "vue";

export default {
  name: "UserBlogCard",
  props: ["userBlog", "edit"],
  setup(props) {
   
  },
};
</script>

<style scoped>
.user-blog-card {
  justify-content: space-between;
}

.user-blog-card p {
  text-align: start;
}
</style>