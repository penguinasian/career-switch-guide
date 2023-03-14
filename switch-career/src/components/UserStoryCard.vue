<template>
  <div class="user-story-card">
    <img :src="imageUrl">
    <div style="margin: 0" >
      <p>{{ userStory.name }}</p>
      <p>{{ userStory.summary }}</p>
    </div>
    
    <!-- <button class="btn-primary">Read more</button> -->
  </div>
</template>

<script>
import {ref} from 'vue';

export default {
    name: 'UserStoryCard',
    props: ['userStory'],
    setup(props) {
      const imageUrl = ref(require('../assets/profile.jpg'))

      return { imageUrl}
    }
}
</script>

<style scoped>
.user-story-card {
    width: 500px;
    margin: auto;
    padding: 15px;
   
    border-radius: 10px;
    height: 85px;
    box-shadow: 5px 10px 12px #acabab;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-around;
    align-items: center;
    /* background-image: linear-gradient(#0093AB, #D9D9D9); */
    /* background: #5b7c99; */
    background: rgba(0, 0, 0, 0.08);
    border: none
}


img {
  width: 85px;
  height: 85px;
  border-radius: 40px;
}
.user-story-card:hover {
  cursor: pointer;
  /* background: rgba(0, 0, 0, 0.15); */
  background-image: linear-gradient(#659DBD, #a05639);
  transform: scale(1.1);
  transition: 0.5s;
}

.btn-primary {
    margin-top: 10px;
    width:100px;
}
</style>