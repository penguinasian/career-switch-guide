<template>
  <Navbar :isLoggedIn="isLoggedIn" />

  <div class="hero">
    <h2>Hi, {{ userName }}</h2>
    <p>Thanks for stopping by to share your valuble experience.</p>
  </div>

  <form class="blog-form" @submit.prevent="handleSubmit">
    <div class="edu-exp">
      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label>What industry are you currently in?</label>
        </div>

        <select v-model="curIndustry">
          <option value="software engineering" selected>
            Software engineering
          </option>
          <option value="accounting">Accounting</option>
          <option value="nursing">Nursing</option>
          <option value="banking">Banking</option>
          <option value="finance">Finance</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="cook">Cook</option>
        </select>
      </div>
      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label>What was your previous industry?</label>
        </div>

        <select v-model="preIndustry">
          <option value="software engineering" selected>
            Software engineering
          </option>
          <option value="accounting">Accounting</option>
          <option value="nursing">Nursing</option>
          <option value="banking">Banking</option>
          <option value="finance">Finance</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="cook">Cook</option>
        </select>
      </div>
      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label>Your story/experience goes here </label>
          <span class="material-symbols-outlined" @click="toggleHelpModal"> help </span>
        </div>
        <textarea
          cols="100"
          rows="45"
          v-model="blog"
          placeholder="Not sure what exactly to write down? Do not worry, click the help button, it may give you some help"
        ></textarea>
      </div>
    </div>

    <button v-if="!isSharing" class="btn-primary">Submit</button>
    <button v-if="isSharing" class="btn-primary" disabled>Sharing</button>
  </form>
  <div v-if="showHelpModal" class="modal">
    <div class="modal-container">
      <span @click="closeShowHelpModal">X</span>
      <Help />
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Help from "../components/Help.vue";
import { useRouter } from "vue-router";

import { ref } from "vue";
import useRequireAuth from "../composables/useRequireAuth.js";
export default {
  name: "BlogForm",
  components: { Navbar, Footer, Help },
  setup(props) {
    const curIndustry = ref("accounting");
    const preIndustry = ref("software engineering");
    const blog = ref("");
    const showHelpModal = ref(false);
    const isSharing = ref(false);
    const router = useRouter();

    const userEmail = localStorage.getItem("email");
    const jwttoken = localStorage.getItem("jwttoken");
    const { requireAuth, isLoggedIn, userName } = useRequireAuth(userEmail);
    console.log(isLoggedIn.value);

    requireAuth(userEmail);

    console.log(showHelpModal.value);

    const toggleHelpModal = () => {
      showHelpModal.value = !showHelpModal.value;
      console.log("Show help modal: ", showHelpModal.value);
    };

    const closeShowHelpModal = () => {
      showHelpModal.value = !showHelpModal.value;
    };

    const handleSubmit = async () => {
      const blogData = {
        curIndustry: curIndustry.value,
        preIndustry: preIndustry.value,
        blog: blog.value,
        user: userName.value,
        userEmail: userEmail,
      };

      try {
        isSharing.value = true;
        const response = await fetch("http://localhost:3000/api/v1/blog/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + jwttoken,
          },
          body: JSON.stringify(blogData),
        });

        const data = await response.json();
        console.log(data);
        isSharing.value = false;
        router.push({ name: "blogs" });
      } catch (error) {
        console.error(error.message);
      }
    };

    return {
      blog,
      curIndustry,
      preIndustry,
      handleSubmit,
      isLoggedIn,
      requireAuth,
      userName,
      toggleHelpModal,
      showHelpModal,
      closeShowHelpModal,
      isSharing,
    };
  },
};
</script>

<style scoped>
.hero {
  flex-direction: column;
  height: 100px;
  margin-top: 100px;
  margin-bottom: 20px;
}
.blog-form {
  max-width: 1200px;
  margin: auto;
  margin-bottom: 70px;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  text-align: start;
}

input {
  width: 882px;
  height: 30px;
  border-radius: 6px;
  outline: none;
}

input:focus {
  border: 2px solid #a05639;
  box-shadow: 2px 5px 8px #acabab;
}

.edu-exp {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.education {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.add-more {
  border: 1px solid #a05639;
  background: #a05639;
  border-radius: 3px;
  width: 20px;
}

.work-experience {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 60px;
}

.add-more:hover {
  cursor: pointer;
}

.btn-primary {
  width: 100px;
}

.individual-question {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin-bottom: 50px;
  background: #4e6e81;
  border-radius: 8px;
}

.question-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 822px;
}

.individual-question span:hover {
  cursor: pointer;
}

textarea {
  border: none;
  background: lightgray;
  width: 882px;
}

select {
  width: 100%;
  height: 50px;
}

.modal-container {
  height: 450px;
}

/* Media Queries */

@media screen and (max-width: 1200px) {
  .hero {
    width: 900px;
  }

  .blog-form {
    width: 1000px;
  }
}

@media screen and (max-width: 1024px) {
  .hero {
    width: 600px;
  }

  .blog-form {
    width: 800px;
  }

  .individual-question,
  select, textarea {
    width: 800px;
  }

  .question-title {
    width: 740px;
  }

  textarea {
    padding: 0px;
  }

 
}

@media screen and (max-width: 900px) {
  .individual-question,
  select, textarea {
    width: 600px;
  }

  textarea {
    padding: 0px;
  }

  .question-title {
    width: 540px;
  }

  .hero {
    width: 600px;
  }

  .blog-form {
    width: 800px;
  }
}

@media screen and (max-width: 768px) {
  .individual-question,
  select, textarea {
    width: 500px;
  }

  textarea {
    padding: 0px;
  }

  .question-title {
    width: 440px;
  }

  .hero {
    width: 600px;
  }

  .blog-form {
    width: 500px;
  }
}

@media screen and (max-width: 600px) {
  .individual-question,
  select, textarea {
    width: 350px;
  }

  textarea {
    padding: 0px;
  }

  .question-title {
    width: 290px
  }

  .hero {
    width: 500px;
  }

  .blog-form {
    width: 450px;
  }
}

@media screen and (max-width: 480px) {
  .individual-question,
  .question-title,
  select, textarea {
    width: 250px;
  }

  textarea {
    padding: 0px;
  }

  .question-title {
    width: 190px;
  }

  .edu-exp :nth-child(3) .question-title {
    flex-direction: column;
    padding-left: 0px;
    align-items: flex-start;
    gap: 10px;
  }

  span {
    float: right;
  }

  label {
    width: 200px;
  }

  .hero {
    width: 300px;
  }

  .blog-form {
    width: 300px;
  }
}

@media screen and (max-width: 375px) {
  .individual-question,
  .question-title,
  select, textarea {
    width: 220px;
  }

  textarea {
    padding: 0px;
  }

  .question-title {
    width: 160px;
  }

  label {
    width: 160px;
  }

  .hero {
    width: 250px;
  }

  .blog-form {
    width: 250px;
  }
}
</style>