<template>
  <SpiderSolitaire gameMode="1"></SpiderSolitaire>
  <!-- <KlondikeSolitaire></KlondikeSolitaire> -->
</template>

<script>
import SpiderSolitaire from "./views/Spider.vue";
import KlondikeSolitaire from "./views/Klondike.vue";

export default {
  name: "mainTable",
  components: { SpiderSolitaire, KlondikeSolitaire },
  data: function() {
    return {};
  }
};
</script>
<style >
@import "./assets/css/style.css";
</style>

