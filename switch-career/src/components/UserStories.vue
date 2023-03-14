<template>

  
  <div class="user-stories">
    <div v-if="userStories.length > 0" class="user-stories">
      <div v-for="userStory in userStories" :key="userStory.name" class="user-story">
        <UserStoryCard :userStory="userStory" class="user-story-card"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import UserStoryCard from './UserStoryCard.vue';
import Navbar from './Navbar.vue';

export default {
  name: "UserStories",
  components: { UserStoryCard, Navbar },
  setup() {
    const userStories = ref([]);
    const error = ref(null);

    const loadUserStories = async () => {
      try {
        const data = await fetch("http://localhost:3000/users");
        if (!data.ok) {
          throw Error("no data available!");
        }
        userStories.value = await data.json();
        console.log(userStories.value);
      } catch (err) {
        error.value = err.message;
        console.error(error.value);
      }
    };

    loadUserStories();

    return { userStories, error };
  },
};
</script>

<style scoped>
.user-stories {
  margin-top: 60px;
  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  gap:30px;
  margin-bottom: 50px;
  width: 600px;
}



.user-story:nth-child(even) > .user-story-card{
  
  flex-direction: row-reverse !important;;
  justify-content: flex;
  margin-left: 150px;
}
</style>