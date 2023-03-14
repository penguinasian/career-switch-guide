<template>
  <div class="nav-bar">
    <h3>Switch Career</h3>
    <div class="nav-links">
      <router-link to="/"><span>Home</span></router-link>
      <router-link to="/about"><span>About</span></router-link>
      <router-link to="/"
        ><span class="login-link" @click="toggle">Log in</span></router-link
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Navbar",
  emits: ["toggleLogin"],
  setup(props, ctx) {
    
    const toggle = () => {
      console.log("clicked")
      ctx.emit("toggleLogin");
    };

    // const handleClick = () => {
    //   emit('loginClicked')
    // }
    // const logInClicked = ref(false)

    // console.log(logInClicked.value)

    return { toggle };
  },
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: fixed;
  width: 100%;
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
</style>