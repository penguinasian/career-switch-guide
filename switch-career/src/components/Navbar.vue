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

    const viewProfile = () => {};

    return { toggle, logOut, email, viewProfile, showMenu };
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
  }


/* media queries */

@media screen and (max-width: 600px) {

  .nav-links span  {
    margin-right: 20px;
  }
  
}


@media screen and (max-width: 480px) {

  .nav-bar {
    width: 400px;
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
    gap: 15px;
    z-index: 10;
    float: right;
    background: rgba(0, 0, 0, 0.08);
    padding: 10px;
    border-radius: 5px;
  }
}

</style>