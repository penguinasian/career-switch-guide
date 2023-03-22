<template>
  <div class="auth">
    <h1>Career Switch Guide</h1>
    <form @submit.prevent="handleSubmit">
      <h2>Sign up</h2>
      <div class="input-field">
        <label>Username</label>
        <input type="text" v-model="name" required />
      </div>
      <div class="input-field">
        <label>Email</label>
        <input type="text" v-model="email" required />
      </div>
      <div class="input-field">
        <label>Password</label>
        <input type="password" v-model="password" required />
        <p v-if="err" class="error">{{err}}</p>
      </div>
      <div style="display: flex; align-items: center; flex-direction: column">
        <!-- <p v-if="errorMessage.length > 0" class="error"> {{ errorMessage }}</p> -->
        <p>Already a memeber? <router-link to="/login">Login</router-link></p>
        <button class="btn-primary">Sign up</button>
      </div>
      <div class="line">or</div>
      <button class="btn-primary">Sign up with Google</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Signup",
  emits: ["switchSignupModal"],
  setup(props, ctx) {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const err = ref("")

    const toggleSignUpModal = () => {
      console.log("Log in clicked");
      ctx.emit("switchSignupModal");
    };

    const handleSubmit = async () => {
      console.log(name.value, email.value, password.value);
      const userData = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/user/register",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        
        const signupResponse = await response.json();
        if (!response.ok) {
          throw Error(signupResponse.message)
        }
        
        localStorage.setItem("jwttoken", signupResponse.jwttoken);
        localStorage.setItem("email", signupResponse.email);
        router.push({ name: "blogs" });

        localStorage.setItem("jwttoken", signupResponse.jwttoken);
      } catch (error) {
        err.value = error.message
        console.error(error.message);
      }
    };

    return { name, email, password, toggleSignUpModal, handleSubmit, err};
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
  box-shadow: 5px 10px 12px #acabab;
}

.input-field {
  display: flex;
  width: 70%;
  flex-direction: column;
}

label {
  text-align: start;
  margin-bottom: 5px;
}

/* .oauthLogin {
  background: #a05639;
  border-radius: 8px;
} */

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
</style>