<template>
  <Navbar :isLoggedIn="isLoggedIn" />
  <div class="hero">
    <div class="hero-left">
      <h1>Hi, {{ userName }}</h1>
      <p>
        We hope you will be inspired by the career switching stories shared by
        the community memebers! Filter the blogs based on your own career
        interests or click the create button to create and share your
        experience.
      </p>
      <router-link to="/blog-form"
        ><button class="btn-primary">Create</button></router-link
      >
    </div>
    <div class="hero-right">
      <form>
        <!-- <div>
          <label>Current Industry: </label>
          <select v-model="curIndustry">
            <option value="all" selected>
              All
            </option>
            <option value="software engineering">
              Software engineering
            </option>
            <option value="accounting">Accounting</option>
            <option value="nursing">Nursing</option>
            <option value="banking">Banking</option>
            <option value="finance">Finance</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="cook">Cook</option>
          </select>
        </div> -->

        <div>
          <label>Filter by your desired industry: </label>
          <select v-model="desiredIndustry">
            <option value="all" selected>
              All
            </option>
            <option value="software engineering">
              Software engineering
            </option>
            <option value="accounting">Accounting</option>
            <option value="nursing">Nursing</option>
            <option value="banking">Banking</option>
            <option value="finance">Finance</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="cook">Cook</option>
          </select>
        </div>
      </form>
    </div>
  </div>
  <div class="user-stories">
    <div v-if="filteredBlogs.length > 0" class="user-stories">
      <div
        v-for="userBlog in filteredBlogs"
        :key="userBlog.name"
        class="user-story"
      >
        <UserBlogCard :userBlog="userBlog" class="user-blog-card" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { computed, ref } from "vue";
import UserBlogCard from "../components/UserBlogCard.vue";
import Navbar from "../components/Navbar.vue";
import { useRouter } from "vue-router";
import useRequireAuth from "../composables/useRequireAuth.js";
import Footer from "../components/Footer.vue";

export default {
  name: "UserBlogs",
  components: { UserBlogCard, Navbar, Footer },
  setup() {
    const userBlogs = ref([]);
    
    const error = ref(null);
    const desiredIndustry = ref("all")
    const curIndustry = ref("all")
    const usertoken = ref(localStorage.getItem("jwttoken"));
    const userEmail = localStorage.getItem("email");
    console.log(userEmail);
    console.log(usertoken);
    const router = useRouter();

    const { requireAuth, isLoggedIn, userName } = useRequireAuth(userEmail);
    console.log(isLoggedIn.value);

    requireAuth(userEmail);

    const loadUserBlogs = async () => {
      try {
        const data = await fetch("http://localhost:3000/api/v1/blog/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwttoken"),
          },
        });
        console.log(data);
        if (!data.ok) {
          router.push("/");
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

    

    const filteredBlogs = computed(() => {

          if ( desiredIndustry.value === "all") {
            return userBlogs.value
          }

         return userBlogs.value.filter((userBlog) => userBlog.curIndustry === desiredIndustry.value)
    })

    // const handleFilter = () => {
      
     

    //      return userBlogs.value.filter((userBlog) => userBlog.curIndustry === newIndustry.value && userBlog.preIndustry === curIndustry.value)
     

     
    // }

    return { userBlogs, error, usertoken, isLoggedIn, requireAuth, userName, desiredIndustry, curIndustry, filteredBlogs };
  },
};
</script>

<style scoped>


/* .user-story:nth-child(even) > .user-story-card {
  flex-direction: row-reverse !important;
  justify-content: flex;
  margin-left: 150px;
} */

.hero-left {
  align-items: center;
}

.hero-left p {
  text-align: start;
}


</style>