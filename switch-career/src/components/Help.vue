<template>
  <div class="help">
    <h3>To ensure the that our readers get the best out of your experiences, you can think about aspects in
    relate to:</h3>
    <p>* What prompted you to switch your career? In other words, the reasons</p>
    <p>* How did you prepare for the career switch? </p>
    <p>* Did you do any self study in relates to the new industry you are about to go to?</p>
    <p>* How was the school experience in the new industry?</p>
    <p>* Any resources you would like to share</p>
    <p>* What would you have done differently now that you are in the new industry now?</p>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
h3 {
    padding: 20px;
}
p {
    text-align: start;
    margin-bottom: 20px;
    border-radius: 5px;
    
}

/* Media Queries */

@media screen and(max-width: 480px) {

  .help {
    width: 375px;
  }
  
}

@media screen and(max-width: 375px) {

  .help {
    width: 305px;
  }

  h3 {
    padding: 0px;
  }
  
}
</style>