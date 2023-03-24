<template>
  <Navbar @toggleLogin="toggleClick" :isLoggedIn="isLoggedIn" />
  <div class="home">
    <div class="hero">
      <div class="hero-left">
        <h1>Your Best Career Switching Guide</h1>
        <p>
          Considering switching to a different career, but not sure where to
          start? Do not worry, Switch Career is here to help. Join the community
          and read the stories/experiences shared by the community members.
        </p>
        <router-link :to="{ name: 'signup' }" v-if="!userEmail"
          ><button class="btn-primary">Get started</button></router-link
        >
        <router-link :to="{ name: 'blog-form' }" v-if="userEmail"
          ><button class="btn-primary">Share your story</button></router-link
        >
        <router-link :to="{ name: 'blogs' }" v-if="userEmail"
          ><button class="btn-primary">Read stories</button></router-link
        >
        
      </div>
      <div class="hero-right">
        <img :src="imgUrl" />
      </div>
    
    </div>

    <div v-if="logInClicked" class="loginModal">
      <div class="loginModalContainer">
        <span @click="closeLoginModal">X</span>
        <Login @switchLoginModal="toggleLoginModal" />
      </div>
    </div>

    <div v-if="isSignUp" class="loginModal">
      <div class="loginModalContainer">
        <span @click="closeSignUpModal">X</span>
        <Signup @switchSignupModal="toggleSignupModal" />
      </div>
    </div>

    <div class="bottom-section">
      <h2>How Switch Career works</h2>
      <p style="text-align: center; margin-bottom: 50px">
        Register and log in to read all the careering swtiching stories shared
        by members. Find your inspiration and motivation. Feel free to share
        your own experiences too!
      </p>
    </div>

    <div class="website-guide-section">
      <div class="website-guide">
        <img src="../assets/signup.png" alt="signup" />
        <h3>Sign up</h3>
        <p>Register an account and be a part of the community</p>
      </div>
      <div class="website-guide">
        <img src="../assets/browsing.png" alt="browsing" />
        <h3>Browse Blogs</h3>
        <p>
          Once you have logged in, you will be able to browse and read all the
          blogs shared by our members about their career switching stories.
        </p>
      </div>
      <div class="website-guide">
        <img src="../assets/sharing.png" alt="sharing" />
        <h3>Share your own experiences</h3>
        <p>
          To help all the career switchers out there, we encourage you to share
          your experiences.
        </p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from "../components/Navbar.vue";

import Footer from "../components/Footer.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import { ref } from "vue";
import useRequireAuth from "../composables/useRequireAuth.js";
import { useRouter } from "vue-router";

export default {
  name: "home",
  components: { Navbar, Footer, Login, Signup },
  setup() {
    const logInClicked = ref(false);
    const isSignUp = ref(false);
    const imgUrl = ref(require("../assets/door.jpg"));
    const router = useRouter();

    const toggleClick = () => {
      logInClicked.value = !logInClicked.value;
    };

    const closeLoginModal = () => {
      logInClicked.value = !logInClicked.value;
    };

    const toggleLoginModal = () => {
      logInClicked.value = !logInClicked.value;
      isSignUp.value = !isSignUp.value;
    };

    const toggleSignupModal = () => {
      logInClicked.value = !logInClicked.value;
      isSignUp.value = !isSignUp.value;
    };

    const closeSignUpModal = () => {
      isSignUp.value = !isSignUp;
    };

    const userEmail = localStorage.getItem("email");
    console.log(userEmail);

    const { isLoggedIn, requireAuth } = useRequireAuth(userEmail);

    if (isLoggedIn.value) {
      router.push({ name: "blogs" });
    }
    requireAuth(userEmail);
    console.log(isLoggedIn.value);
    return {
      logInClicked,
      toggleClick,
      closeLoginModal,
      toggleLoginModal,
      toggleSignupModal,
      isSignUp,
      closeSignUpModal,
      imgUrl,
      isLoggedIn,
      requireAuth,
      userEmail,
    };
  },
};
</script>

<style scoped>
.home {
  /* max-width: 1400px; */
  margin: auto;
  margin-top: 50px;
  margin-bottom: 70px;
  padding: 50px;
}

img {
  width: 250px;
  height: 350px;
  border-radius: 10px;
  filter: drop-shadow(35px 19px 24px rgba(0, 0, 0, 0.68));
  opacity: 0.75;
}


span:hover {
  cursor: pointer;
}

.hero {
  max-width: 1400px;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 600px;
  margin-bottom: 15px;
}

.hero-left {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-right {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-left h1,
p {
  text-align: start;
}

.hero p {
  line-height: 2rem;
}
.btn-primary {
  margin-top: 10px;
}

form {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 20px;
}

.website-guide img {
  width: 100px;
  height: 100px;
}

.website-guide p {
  width: 200px;
}

.website-guide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.website-guide-section {
  display: flex;
  justify-content: space-around;
}

.website-guide-section p {
  text-align: center;
}

/* media queries */

@media screen and (max-width: 1200px) {
  
  .hero {
    max-width: 1200px;
    width: 1000px;
  }
}

@media screen and (max-width: 1024px) {
  
  .hero {
    max-width: 1000px;
    width: 800px;
  }
}

@media screen and (max-width: 820px) {
  
  .hero {
    max-width: 800px;
    width: 600px;
  }

  img {
    width: 220px;
    height: 320px;
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

  img {
    width: 200px;
    height: 300px;
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

  img {
    width: 160px;
    height: 280px;
  }

  .website-guide-section {
    flex-direction: column;
  }
}

@media screen and (max-width: 480px) {

  .home {
    width: 350px;
  }

  .hero {
   
    width: 350px;
    margin-bottom: 35px;
  }

  .hero-left {
    width: 130px;
  }

  .hero-right {
    width: 130px;
  }

  img {
    width: 150px;
    height: 260px;
  }

  .website-guide-section {
    flex-direction: column;
  }
}

@media screen and (max-width: 375px) {

  .home {
    width: 350px;
  }


}


</style>