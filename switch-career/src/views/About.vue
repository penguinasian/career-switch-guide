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
  max-width: 1200px;
  margin: auto;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.about p {
  width: 500px;
  text-align: start;
}

.footer {
  bottom: 0;
  position: absolute;
  margin-bottom: 50px;
}

@media only screen and (max-width: 480px) {
  .about {
    max-width: 800px;
    min-width: 500px;
  }

  .about p {
    width: 200px;
  }
}

@media only screen and (min-width: 480px) {
  .about {
    max-width: 800px;
    min-width: 600px;
  }
}

@media only screen and (max-width: 576px) {
  .about {
    max-width: 800px;
    min-width: 650x;
  }
}

@media only screen and (min-width: 576px) {
  .about {
    
    min-width: 1000px;
  }
}

@media only screen and (min-width: 768px) {
  .about {
    max-width: 1000px;
    min-width: 800px;
  }
}

@media only screen and (min-width: 992px) {
  .about {
    max-width: 1200px;
    min-width: 1000px;
  }
}

@media only screen and (min-width: 1200px) {
  .about {
    max-width: 1500px;
    min-width: 1300px;
  }
}
</style>