<template>
  <Navbar />
  <form class="blog-form" @submit.prevent="handleSubmit">
    <h2>We are excited to hear about your story and cannot wait to share it with the community!</h2>
    
    <div class="edu-exp">
      <div class="education">
        <div>
          <label>Education: </label>
          <select v-model="educationType">
            <option value="education" selected>Education</option>
            <option value="accounting">PhD</option>
            <option value="nursing">Masters</option>
            <option value="financial-analyst">Bachelor</option>
            <option value="diploma">Diploma</option>
          </select>
        </div>
        <div>
          <label>School: </label>
          <select v-model="school">
            <option value="school" selected>School</option>
            <option value="bcit">BCIT</option>
            <option value="sfu">SFU</option>
            <option value="ubc">UBC</option>
            <option value="langara">Langara</option>
            <option value="douglas">Douglas</option>
          </select>
        </div>
        <div>
          <label>Program: </label>
          <select v-model="program">
            <option value="program" selected>Program</option>
            <option value="accounting">Accounting</option>
            <option value="nursing">Nursing</option>
            <option value="finance">Finance</option>
            <option value="cook">Cooking</option>
          </select>
        </div>

        <div class="add-more">+</div>
      </div>

      <!-- work experience -->
      <div class="work-experience">
        <div>
          <label>Work Experience: </label>
          <select v-model="industry">
            <option value="industry" selected>Industry</option>
            <option value="accounting">Accounting</option>
            <option value="nursing">Nursing</option>
            <option value="finance">Finance</option>
            <option value="cook">Cook</option>
          </select>
        </div>
        <div>
          <label>Company: </label>
          <select v-model="company">
            <option value="company" selected>Company</option>
            <option value="google">Google</option>
            <option value="facebook">Facebook</option>
            <option value="microsoft">Mircosoft</option>
            <option value="Netflix">Netflix</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Job Title: </label>
          <select v-model="title">
            <option value="title" selected>title</option>
            <option value="frontend">Front-end developer</option>
            <option value="backend">Back-end developer</option>
            <option value="financial-analyst">Financial analyst</option>
            <option value="fullstack">Full Stack developer</option>
            <option value="tech-lead">Tech lead</option>
          </select>
        </div>

        <div class="add-more">+</div>
      </div>

      <h2>Find the questions below you would like to answer</h2>
      <input type="text" placeholder="Search">
      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label>What industry are you currently in?</label>
          <span>delete</span>
        </div>

        <textarea cols="100" rows="10" v-model="curIndustry"></textarea>
      </div>
      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label>What industry are you looking to switch to?</label
          ><span>delete</span>
        </div>

        <textarea cols="100" rows="10" v-model="preIndustry"></textarea>
      </div>

      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label>What prompted you to change your career?</label>
          <span>delete</span>
        </div>

        <textarea cols="100" rows="10" v-model="reasons"></textarea>
      </div>
      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label
            >What were the obstacles when it came to changing your
            career?</label
          >
          <span>delete</span>
        </div>

        <textarea cols="100" rows="10" v-model="obstacles"></textarea>
      </div>
      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label
            >What was your experience like in the new school program you
            swtiched into?</label
          >
          <span><p>delete</p></span>
        </div>

        <textarea cols="100" rows="10" v-model="schoolExperience"></textarea>
      </div>
      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label>How has your work experience been in your new career?</label>
          <span>delete</span>
        </div>

        <textarea cols="100" rows="10" v-model="newWorkExperience"></textarea>
      </div>
      <div class="individual-question">
        <div class="question-title" style="padding: 30px">
          <label>More advice to share, please type in here</label>
          <span><p>delete</p></span>
        </div>

        <textarea cols="100" rows="10" v-model="moreAdvice"></textarea>
      </div>
    </div>
    <!-- <h2>
      Next, choose the questions you would like to answer, which you think may
      be helpful to career switchers
    </h2> -->

    <button class="btn-primary" @click="handleNext">Submit</button>
  </form>
  <Footer />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

import { ref } from "vue";
export default {
  name: "BlogForm",
  components: { Navbar, Footer },
  setup(props) {
    const educationType = ref("education");
    const school = ref("school");
    const program = ref("program");
    const industry = ref("industry");
    const company = ref("company");
    const title = ref("title");
    const curIndustry = ref("")
    const preIndustry = ref("")
    const reasons = ref("")
    const schoolExperience = ref("")
    const newWorkExperience = ref("")
    const moreAdvice = ref("")
    const obstacles = ref("")

    const handleNext = (e) => {
      e.preventDefault();
      console.log("Education type: ", educationType.value);
      console.log("School: ", school.value);
      console.log("Program: ", program.value);
      console.log("Industry: ", industry.value);
      console.log("Company: ", company.value);
      console.log("Title: ", title.value);
    };

    const handleSubmit = async () => {

      const blogData = {
        curIndustry: curIndustry.value,
        preIndustry: preIndustry.value,
        reasons: reasons.value,
        schoolExperience: schoolExperience.value,
        newWorkExperience: newWorkExperience.value,
        moreAdvice: moreAdvice.value,
        obstacles: obstacles.value,
        user: "Andrew"
      }

        try {
          
          const response = await fetch("http://localhost:3000/api/v1/blog/post", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData)
          })

          const data = await response.json()
          console.log(data)

        } catch (error) {
          
          console.error(error.message)
        }
    }

    return {
      educationType,
      school,
      program,
      industry,
      company,
      title,
      curIndustry,
      preIndustry,
      reasons,
      schoolExperience,
      newWorkExperience,
      moreAdvice,
      obstacles,
      handleSubmit
    };
  },
};
</script>

<style scoped>
.blog-form {
  max-width: 1200px;
  /* background: rgba(0, 0, 0, 0.05); */
  /* box-shadow: 5px 10px 12px #acabab; */

  margin: auto;
  margin-top: 150px;
  margin-bottom: 70px;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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
  margin-top: 20px;
  width: 100px;
}

.individual-question {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  margin-bottom: 50px;
  background: #4E6E81;
  /* background: rgba(0, 0, 0, 0.05); */
  box-shadow: 5px 10px 12px #acabab;
  border-radius: 8px;
}

.question-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 822px;
}

/* .individual-question label {
  padding: 30px;
} */

.individual-question span:hover {
  cursor: pointer;
}

textarea {
  /* border-radius: 10px; */
  border: none;
  background: lightgray;
  width: 882px;
}
</style>