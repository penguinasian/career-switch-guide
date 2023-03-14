<template>
  <div class="user-blog-card">
    <h2>Username</h2>
    <div>
      <p> Current Industry: {{ userBlog.curIndustry }}</p>
      <p> Previous Industry: {{ userBlog.preIndustry }}</p>
      <p>{{ userBlog.reasons }}</p>
    </div>
    <button class="btn-primary">Read more</button>
    <!-- <button class="btn-primary">Read more</button> -->
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "UserBlogCard",
  props: ["userBlog"],
  setup(props) {
    const imageUrl = ref(require("../assets/profile.jpg"));

    return { imageUrl };
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