<template>
  <Navbar @toggleLogin="toggleClick" />
  <div class="home">
    <div class="hero">
      <div class="hero-left">
        <h1>Your Best Career Switching Guide</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
          consectetur libero quas doloremque accusantium voluptas nihil
          consequuntur id sapiente iure aperiam, harum eligendi placeat
          laboriosam atque et, saepe non obcaecati?
        </p>
        <router-link :to="{ name: 'blog-form' }"
          ><button class="btn-primary">Get started</button></router-link
        >
      </div>
      <div class="hero-right">
        <img :src="imgUrl" />
      </div>
      <!-- <UserStories /> -->
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

    
      <h2>How Switch Career works</h2>
      <p style="text-align:center; margin-bottom: 50px;">
        Register and log in to read all the careering swtiching stories shared
        by members. Find your inspiration and motivation. Feel free to share
        your own experiences too!
      </p>
   

    <div class="middle-section">
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
        <button class="btn-primary" style="width: 100px">Join</button>
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
import UserStories from "../components/UserStories.vue";
import Footer from "../components/Footer.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import { ref } from "vue";

export default {
  name: "home",
  components: { Navbar, UserStories, Footer, Login, Signup },
  setup() {
    const logInClicked = ref(false);
    const isSignUp = ref(false);
    const imgUrl = ref(require("../assets/door.jpg"));

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
    return {
      logInClicked,
      toggleClick,
      closeLoginModal,
      toggleLoginModal,
      toggleSignupModal,
      isSignUp,
      closeSignUpModal,
      imgUrl,
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
  width: 1200px;
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

.middle-section {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.middle-section p {
  text-align: center;
}


</style>