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
  overflow: hidden;
}

.nav-bar h3 {
  margin-left: 80px;
}

.nav-links {
  display: flex;
  margin-right: 30px;
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



@media only screen and (max-width: 576px) {
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
    padding: 5px;
    border-radius: 5px;
  }

  .login-link {
    border: none;
    background: none;
    font-weight: lighter;
  }

  .nav-bar {
    max-width: 400px;
    min-width: 400px;
  }
}

@media only screen and (min-width: 576px) {
  .nav-bar {
    max-width: 800px;
    min-width: 800px;
  }

  .menu-bar {
    display: none;
  }

  .material-symbols-outlined {
    display: none;
  }
}


@media only screen and (min-width: 768px) {
  .nav-bar {
    max-width: 800px;
    min-width: 600px;
  }

  .menu-bar {
    display: none;
  }

  .material-symbols-outlined {
    display: none;
  }
}

@media only screen and (min-width: 992px) {
  .nav-bar {
    max-width: 1200px;
    min-width: 1000px;
  }

  .menu-bar {
    display: none;
  }

  .material-symbols-outlined {
    display: none;
  }
}

@media only screen and (min-width: 1200px) {
  .nav-bar {
    max-width: 1500px;
    min-width: 1300px;
  }

  .menu-bar {
    display: none;
  }

  .material-symbols-outlined {
    display: none;
  }
}
</style>