<template>
  <Navbar />
    <div class="not-found">
      <h2>Sorry, the page you are looking for could not be found!</h2>
      <router-link to="/">Go back to home page</router-link>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
    name: 'NotFound',
    components: { Navbar }
}
</script>

<style scoped>
.not-found {
    margin-top: 100px;
}
a {
    text-decoration: underline;
}
</style>