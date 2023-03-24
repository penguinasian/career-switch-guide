<template>
  <div class="auth">
    <h1>Career Switch Guide</h1>
    <form @submit.prevent="handleSubmit">
      <h2>Log in</h2>
      <div class="input-field">
        <label>Email</label>
        <input type="text" v-model="email" required />
      </div>
      <div class="input-field">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>

      <p class="error" v-if="error">{{ error }}</p>

      <div style="display: flex; align-items: center; flex-direction: column">
        <!-- <p v-if="errorMessage.length > 0" class="error"> {{ errorMessage }}</p> -->
        <p>Not a member yet? <router-link to="/signup">Sign up</router-link></p>
        <button class="btn-primary">Log in</button>
      </div>
      <div class="line">or</div>
      <button class="btn-primary" @click="loginUser">Log in with Google</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Login",
  emits: ["switchLoginModal", "userLogin"],
  setup(props, ctx) {
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    const router = useRouter();

    const toggleLoginModal = () => {
      ctx.emit("switchLoginModal");
    };

    const loginUser = () => {
      ctx.emit("userLogin");
    };

    const handleSubmit = async () => {
      console.log(email.value, password.value);
      const userData = {
        email: email.value,
        password: password.value,
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/user/login",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        const loginResponse = await response.json();
        console.log(response.ok);
        if (!response.ok) {
          throw Error(loginResponse.message);
        }
        error.value = null;
        localStorage.setItem("jwttoken", loginResponse.jwttoken);
        localStorage.setItem("email", loginResponse.email);
        router.push({ name: "blogs" });
      } catch (err) {
        error.value = err.message;
        console.error(err.message);
      } finally {
        // error.value = null
      }
    };

    return {
      toggleLoginModal,
      handleSubmit,
      email,
      password,
      error,
      loginUser,
    };
  },
};
</script>

<style scoped>
h1 {
  margin-top: 100px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  margin: auto;
  background: rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-top: 100px;
  border-radius: 10px;
 
}

.input-field {
  display: flex;
  flex-direction: column;
  width: 70%;
}

label {
  text-align: start;
  margin-bottom: 5px;
}

.line {
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-column-gap: 1.2rem;
  align-items: center;
}

.line::before,
.line::after {
  content: "";
  display: block;
  height: 1px;
  width: 150px;
  background-color: lightgray;
}

a {
  text-decoration: underline;
}

a:hover {
  cursor: pointer;
}

/* Media Queries */

@media screen and (max-width: 480px) {
  .line::before,
  .line::after {
    
    width: 100px;
  
  }
}

@media screen and (max-width: 375px) {
  .line::before,
  .line::after {
    
    width: 80px;
  
  }

   form {
    margin-top: 30px;
  }

  h1 {
    margin-top: 70px;
  }
}
</style>