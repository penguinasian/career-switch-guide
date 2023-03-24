<template>
  <Navbar :isLoggedIn="isLoggedIn" />
  <div class="about">
    <h1>Switch Career provides possiblities</h1>
    <p>
      Switch Career is a platform for sharing career switching experiences and
      stories. It also creates a resource channel for people who are thinking of
      changing their careers.
    </p>
    <router-link :to="{ name: 'signup' }"
      ><button class="btn-primary">Join Switch Career</button></router-link
    >
    <!-- <UserStories /> -->
  </div>
  <Footer class="footer" />
</template>

<script>
import useRequireAuth from "@/composables/useRequireAuth";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { ref } from "vue";

export default {
  name: "About",
  components: { Navbar, Footer },

  setup() {
    
    const isLoggedIn = ref(true)
    
  
    return { isLoggedIn };
  },
};
</script>

<style scoped>
.about {
  
  margin: auto;
  margin-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
}

.about p {
  width: 500px;
  text-align: start;
}



/* media queries  */

@media screen and (max-width: 1024px) {
  
  .about {
    width: 800px
  }
}

@media screen and (max-width: 820px) {
  
  .about {
    width: 800px
  }
}

@media screen and (max-width: 768px) {
  
  .about {
    width: 600px
  }
}

@media screen and (max-width: 600px) {

  h1 {
    width: 300px;
    text-align: start;
  }
  
  .about {
    width: 500px
  }
}

@media screen and (max-width: 480px) {
  
  .about {
    width: 420px;
  }

  .about h1 {
    text-align: center;
  }

  .about p {
    width: 300px
  }
}

@media screen and (max-width: 440px) {
  
  .about {
    width: 400px;
  }

  .about h1 {
    text-align: center;
  }

  .about p {
    width: 300px
  }
}

@media screen and (max-width: 400px) {
  
  .about {
    width: 350px;
  }

  .about h1 {
    text-align: center;
  }

  .about p {
    width: 300px
  }
}

@media screen and (max-width: 375px) {

  .body {
    width: 375px;
    margin: auto;
  }
  
  .about {
    width: 350px;
    
  }

  .about h1 {
    text-align: center;
  }

  .about p {
    width: 300px;
    text-align: center;
  }
}

</style>