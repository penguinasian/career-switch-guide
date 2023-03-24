<template>
  <div class="nav-bar">
    <h3>Switch Career</h3>
    <div class="nav-links">
      <router-link to="/"><span>Home</span></router-link>
      <router-link to="/about"><span>About</span></router-link>
      <router-link to="/login" v-if="!isLoggedIn"
        ><span class="login-link">Log in</span></router-link
      >
      <router-link to="/profile" v-if="isLoggedIn"
        ><span @click="viewProfile">Profile</span></router-link
      >
      <router-link to="/login" v-if="isLoggedIn"
        ><span class="login-link" @click="logOut">Log out</span></router-link
      >
    </div>
    <span class="material-symbols-outlined" @click="showMenu = !showMenu">
      menu
    </span>
  </div>

  <div class="menu-bar" v-if="showMenu">
    
      <p @click="closeMenu">X</p>
   
    
    <router-link to="/"><span>Home</span></router-link>
    <hr>
    <router-link to="/about"><span>About</span></router-link>
    
    <hr>
    <router-link to="/login" v-if="!isLoggedIn"
      ><span class="login-link">Log in</span></router-link
    >
   
    <router-link to="/profile" v-if="isLoggedIn"
      ><span @click="viewProfile">Profile</span></router-link
    >
   <hr>
    <router-link to="/login" v-if="isLoggedIn"
      ><span class="login-link" @click="logOut">Log out</span></router-link
    >
    
  </div>
</template>

<script>
import { ref } from "vue";
import logOutUser from "../composables/logOutUser.js";

export default {
  name: "Navbar",
  emits: ["toggleLogin"],
  props: ["isLoggedIn"],
  setup(props, ctx) {
    const showMenu = ref(false);
    const email = localStorage.getItem("email");
    console.log(email);
    const toggle = () => {
      console.log("clicked");
      ctx.emit("toggleLogin");
    };

    const logOut = () => {
      logOutUser(email, props.isLoggedIn);
    };

    const closeMenu = () => {
      showMenu.value = false
    }

    const viewProfile = () => {};

    return { toggle, logOut, email, viewProfile, showMenu, closeMenu };
  },
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 10px;
  top: 0;
}

.nav-bar h3 {
  margin-left: 50px;
}

.nav-links {
  display: flex;
}

.nav-links span {
  margin-right: 50px;
}

.login-link {
  background: #a05639;
  padding: 6px;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
}

.menu-bar {
  display: none;
  
}

.material-symbols-outlined {
  display: none;
  margin-right: 20px;
}

/* media queries */

@media screen and (max-width: 600px) {
  .nav-bar h3 {
    margin-left: 20px;
  }

  .nav-links span {
    margin-right: 20px;
  }
}

@media screen and (max-width: 520px) {


  .nav-bar h3 {
    margin-left: 20px;
  }

  .nav-links span {
    margin-right: 20px;
  }
}

@media screen and (max-width: 480px) {

  hr {
    width: 85%;
  }
  .material-symbols-outlined {
    display: block;
  }

  .nav-links {
    display: none;
  }


  .menu-bar {
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    background: #439aa7;
    opacity: 0.98;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  .menu-bar a {
    margin-top: 20px;
    margin-left: 30px;
    font-weight: bold;
  }



  .menu-bar p {
    width: 85%;
    text-align: right;
    font-size: 26px;
  }

  .menu-bar p:hover {
    cursor: pointer;
  }

  .menu-bar span {
    font-size: 20px;
  }
  
  .menu-bar a:nth-child(1) {
    padding-top: 50px;
  }
  
  .home {
    display: none;
  }
}
</style>