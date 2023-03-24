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

export default {
  name: "About",
  components: { Navbar, Footer },

  setup() {
    
    const userEmail = localStorage.getItem("email");
    const { isLoggedIn } = useRequireAuth(userEmail);

  
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

.footer {
  bottom: 0;
  position: absolute;
  padding: 10px;
  margin-bottom: 100px;
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

@media screen and (max-width: 480px) {
  
  .about {
    width: 450px
  }

  .about p {
    width: 300px
  }
}

@media screen and (max-width: 480px) {
  
  .about {
    width: 450px;
    align-items: flex-start;
    
  }

  .about p {
    width: 300px
  }
}

</style>