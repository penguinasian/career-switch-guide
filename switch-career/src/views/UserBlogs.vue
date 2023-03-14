<template>
  <Navbar />
  <div class="hero">
    <div class="hero-left">
      <h1>Hi, UserName</h1>
      <p>
        We hope you will be inspired by the career switching stories shared by
        the community memebers! Filter the blogs based on your own career interests or
        click the create button to create and share your experience.
      </p>
      <button class="btn-primary">Create</button>
    </div>
    <div class="hero-right">
      
      <form>
        <div>
          <label>Current Industry: </label>
          <select id="current-industry" name="current-industry">
            <option value="accounting">Accounting</option>
            <option value="nursing">Nursing</option>
            <option value="financial-analyst">Finacial Analyst</option>
            <option value="cook">Cook</option>
          </select>
        </div>

        <div>
          <label>New Industry: </label>
          <select id="current-industry" name="current-industry">
            <option value="accounting">Accounting</option>
            <option value="nursing">Nursing</option>
            <option value="financial-analyst">Finacial Analyst</option>
            <option value="cook">Software Engineering</option>
          </select>
        </div>

        <button class="btn-primary">Filter</button>
      </form>
    </div>
  </div>
  <div class="user-stories">
    <div v-if="userBlogs.length > 0" class="user-stories">
      <div
        v-for="userBlog in userBlogs"
        :key="userBlog.name"
        class="user-story"
      >
        <UserBlogCard :userBlog="userBlog" class="user-blog-card" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import UserBlogCard from "../components/UserBlogCard.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "UserBlogs",
  components: { UserBlogCard, Navbar },
  setup() {
    const userBlogs = ref([]);
    const error = ref(null);

    const loadUserBlogs = async () => {
      try {
        const data = await fetch("http://localhost:3000/api/v1/blog/posts");
        if (!data.ok) {
          throw Error("no data available!");
        }
        userBlogs.value = await data.json();
        console.log(userBlogs.value);
      } catch (err) {
        error.value = err.message;
        console.error(error.value);
      }
    };

    loadUserBlogs();

    return { userBlogs, error };
  },
};
</script>

<style scoped>
.user-stories {
 
  display: flex;
 
  flex-direction: column;
  gap: 50px;
  margin: auto;
}

/* .user-story:nth-child(even) > .user-story-card {
  flex-direction: row-reverse !important;
  justify-content: flex;
  margin-left: 150px;
} */

.hero-left {
  align-items: center;
}

.user-blog-card {
    width: 1200px;
    margin: auto;
    padding: 15px;
   
    border-radius: 10px;
    /* height: 85px; */
    box-shadow: 5px 10px 12px #acabab;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-between;
    align-items: center;
    /* background-image: linear-gradient(#0093AB, #D9D9D9); */
    /* background: #5b7c99; */
    background: rgba(0, 0, 0, 0.08);
    border: none
}
</style>