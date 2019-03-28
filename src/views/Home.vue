<template>
  <!-- <div class="home"> -->
  <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- </div> -->
  <div class="main">
    <div
      class="card_holder"
      id="1"
    ></div>
    <div
      class="card_holder"
      id="2"
    ></div>
    <div
      class="card_holder"
      id="3"
    ></div>
    <div
      class="card_holder"
      id="4"
    ></div>
    <div
      class="card_holder"
      id="5"
    ></div>
    <div
      class="card_holder"
      id="6"
    ></div>
    <div
      class="card_holder"
      id="7"
    ></div>
    <div
      class="card_holder"
      id="8"
    ></div>
    <div
      class="card_holder"
      id="9"
    ></div>
    <div
      class="card_holder"
      id="10"
    ></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
<style scoped>
.main {
  background: green;
}
.card_holder {
  display: inline-block;
  width: 6vh;
  margin: 0% 2vh;
  height: 20vh;
  background: turquoise;
}
</style>

