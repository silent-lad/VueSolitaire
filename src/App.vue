<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
  <!-- <SpiderSolitaire gameMode="1"></SpiderSolitaire> -->
  <!-- <KlondikeSolitaire></KlondikeSolitaire> -->
</template>

<script>
import SpiderSolitaire from "./views/Spider.vue";
import KlondikeSolitaire from "./views/Klondike.vue";

export default {
  name: "mainTable",
  components: { SpiderSolitaire, KlondikeSolitaire },
  data: function() {
    return {
      chosen: false
    };
  }
};
</script>
<style >
a {
  text-decoration: none;
}
.menu {
  text-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  background: #d66666;
  border-radius: 10px;
  display: inline-block;
  color: #a32a2c;
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 12px;
  /* height: 100px; */
  margin: 1rem;
  position: relative;
  width: 90%;
}
.card-5 {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}
.menu_wrapper {
  text-align: center;
  height: 100vh;
  width: 100vw;
}
.option {
  color: brown;
  font-size: 40px;
}
/* .menu {
  
} */
/* @import "./assets/css/style.css"; */
</style>

