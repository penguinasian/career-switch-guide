<template>
  <div class="auth">
    <form @submit.prevent="handleSubmit">
      <h3>Sign up</h3>
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
      </div>
      <div style="display: flex; align-items: center; flex-direction: column">
        <!-- <p v-if="errorMessage.length > 0" class="error"> {{ errorMessage }}</p> -->
        <p>Already a memeber? <a @click="toggleSignUpModal">Login</a></p>
        <button class="btn-primary">Sign up</button>
      </div>
      <div class="line">or</div>
      <button class="btn-primary">Sign up with Google</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "Signup",
  emits: ["switchSignupModal"],
  setup(props, ctx) {

    const name = ref("")
    const email = ref("")
    const password = ref("")

    const toggleSignUpModal = () => {
        console.log("Log in clicked")
        ctx.emit("switchSignupModal");
    };

    const handleSubmit = async () => {

        console.log(name.value, email.value, password.value)
        const userData = {
          name: name.value,
          email: email.value,
          password: password.value
        }

        try {
          
            const response = await fetch('http://localhost:3000/api/v1/user/register', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(userData)
            })

            const loginResponse = await response.json()
            console.log(loginResponse)

            localStorage.setItem('jwttoken', loginResponse.jwttoken)
        } catch (error) {

            console.error(error.message)
        }
        
    }

    return { name, email, password, toggleSignUpModal, handleSubmit };
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
  width: 100%;
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