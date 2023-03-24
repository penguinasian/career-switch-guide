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
    
      <form>
        
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
        
      </form>
    
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


    return { userBlogs, error, usertoken, isLoggedIn, requireAuth, userName, desiredIndustry, curIndustry, filteredBlogs };
  },
};
</script>

<style scoped>


.hero {
  margin-top: 50px;
  margin-bottom: 25px;
}

.hero-left {
  align-items: center;
}

.hero-left p {
  text-align: start;
}

form {
  display: flex;
  justify-content: center;
}

/* media queries */

@media screen and (max-width: 1200px) {
  
  .hero {
    
    width: 1000px;
  }

  form {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 1024px) {
  
  .hero {
 
    width: 800px;
  }

  .hero-left {
    width: 400px;
  }
}

@media screen and (max-width: 820px) {
  
  .hero {
    max-width: 800px;
    width: 600px;
  }

  form {
    flex-direction: column;
  }

}

@media screen and (max-width: 620px) {

  
  .hero {
    max-width: 700px;
    width: 500px;
  }

  .hero-right {
    width: 200px;
  }

  .hero-left {
    width: 220px;
  }

  form {
    flex-direction: column;
  }

}

@media screen and (max-width: 550px) {

 
  .hero {
    
    width: 450px;
  }

  .hero-right {
    width: 180px;
  }

  .hero-left {
    width: 180px;
  }

  form {
    flex-direction: column;
  }

}

@media screen and (max-width: 480px) {

  .hero {
   
    width: 350px;
    flex-direction: column;

  }

  .hero-left {
    width: 280px;
  }

  .hero-right {
    width: 130px;
  }

  form {
    flex-direction: column;
  }

 
}
</style>