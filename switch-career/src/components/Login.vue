<template>
  <div class="auth">
    <form @submit.prevent="handleSubmit">
      <h3>Log in</h3>
      <div class="input-field">
        <label>Email</label>
        <input type="text" v-model="email" required />
      </div>
      <div class="input-field">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>
     
        <p class="error" v-if="error">{{ error }} </p>
     
        
     
      <div style="display: flex; align-items: center; flex-direction: column">
        <!-- <p v-if="errorMessage.length > 0" class="error"> {{ errorMessage }}</p> -->
        <p>Not a member yet? <a @click="toggleLoginModal">Sign up</a></p>
        <button class="btn-primary">Log in</button>
      </div>
      <div class="line">or</div>
      <button class="btn-primary">Log in with Google</button>
      
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Login",
  emits: ["switchLoginModal"],
  setup(props, ctx) {

    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const toggleLoginModal = () => {
      ctx.emit("switchLoginModal");
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
        console.log(response.ok)
        if (!response.ok) {
            throw Error('Incorrect credentials!')
        }
        error.value = null
        const signupResponse = await response.json();
        console.log(signupResponse.email, signupResponse.jwttoken);
        
      } catch (err) {
        error.value = err.message
        console.error(err.message);
      } finally {
        // error.value = null
      }
    };

    return { toggleLoginModal, handleSubmit, email, password, error };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  margin: auto;
}

.input-field {
  display: flex;
  flex-direction: column;
  width: 100%;
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
</style>