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
  max-width: 1400px;
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

.loginModal {
  position: fixed;
  z-index: 9998;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  margin: auto;
}

.loginModalContainer {
  position: relative;
  width: 400px;
  height: 650px;
  margin: 0px auto;
  margin-top: 200px;
  padding: 20px 30px;
  background-color: #439aa7;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  border-radius: 8px;
}

.loginModalContainer span {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
}

span:hover {
  cursor: pointer;
}

.hero {
  max-width: 1600px;
  /* margin: auto; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 600px;
}

.hero-left {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-right {
  width: 500px;
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

@media only screen and (max-width: 480px) {
  .nav-bar {
    max-width: 350px;
    min-width: 250px;
    justify-content: center;
  }

  .home {
    max-width: 400px;
    min-width: 350px;
  }

  .hero {
    max-width: 350px;
    min-width: 300px;
  }

  .hero-left {
    width: 150px;
    margin-right: 20px;
  }

  /* .hero-right {
    width: 150px;
  } */

  img {
    width: 130px;
    height: 200px;
  }

  p {
    width: 160px;
    font-size: 12px;
  }

  h1 {
    font-size: 16px;
  }
}

@media only screen and (min-width: 480px) {
  .nav-bar {
    max-width: 350px;
    min-width: 250px;
    justify-content: center;
  }

  .home {
    max-width: 400px;
    min-width: 350px;
  }

  .hero {
    max-width: 350px;
    min-width: 300px;
  }

  .hero-left {
    width: 150px;
    margin-right: 20px;
  }

  /* .hero-right {
    width: 150px;
  } */

  img {
    width: 130px;
    height: 200px;
  }

  p {
    width: 160px;
    font-size: 12px;
  }

  h1 {
    font-size: 16px;
  }
}

@media only screen and (max-width: 576px) {
  .nav-bar {
    max-width: 400px;
    min-width: 350px;
  }

  .home {
    max-width: 500px;
    min-width: 350px;
  }

  .hero {
    max-width: 500px;
    min-width: 350px;
  }

  img {
    width: 130px;
    height: 200px;
  }

  p {
    width: 160px;
    font-size: 12px;
  }

  h1 {
    font-size: 16px;
  }
}

@media only screen and (min-width: 576px) {
  .home {
    max-width: 800px;
    min-width: 600px;
  }

  .hero {
    max-width: 800px;
    min-width: 600px;
  }

  img {
    width: 150px;
    height: 220px;
  }

  p {
    width: 200px;
    font-size: 14px;
  }

  h1 {
    font-size: 18px;
  }
}

@media only screen and (min-width: 768px) {
  .home {
    max-width: 1000px;
    min-width: 800px;
  }

  .hero {
    max-width: 1000px;
    min-width: 800px;
  }
  img {
    width: 180px;
    height: 250px;
  }

  h1 {
    font-size: 20px;
  }

  p {
    width: 250px;
    font-size: 16px;
  }
}

@media only screen and (min-width: 992px) {
  .home {
    max-width: 1200px;
    min-width: 1000px;
  }

  .hero {
    max-width: 1200px;
    min-width: 1000px;
  }

  img {
    width: 220px;
    height: 290px;
  }
  h1 {
    font-size: 25px;
  }

  p {
    width: 300px;
    font-size: 16px;
  }
}

@media only screen and (min-width: 1200px) {
  .home {
    max-width: 1500px;
    min-width: 1300px;
  }

  img {
    width: 250px;
    height: 300px;
  }

  h1 {
    font-size: 30px;
  }
  p {
    width: 350px;
    font-size: 16px;
  }
}
</style>