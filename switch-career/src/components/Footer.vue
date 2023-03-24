<template>
  <div class="footer">
    <div class="footer-text">
      <p>Contact us</p>
      <p>zhangqiangtianchen@gmail.com</p>
      <p>&copy;careerswitch.inc</p>
    </div>

    <div class="footer-icons">
      <font-awesome-icon
        :icon="{ prefix: 'fab', iconName: 'twitter' }"
        size="2x"
      />
      <font-awesome-icon
        :icon="{ prefix: 'fab', iconName: 'facebook' }"
        size="2x"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  components: {},
};
</script>

<style>
.footer {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  bottom: 0;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
}

.footer-text {
    display: flex;
    justify-content: center;
    
}

.footer-text p {
    margin-left: 50px;
}
.footer-icons {
  display: flex;
  justify-content: center;
  
}
.svg-inline--fa{
    margin-left: 20px;
}

/* Media Queries */


</style>