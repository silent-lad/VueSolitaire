<template>
  <div
    class="card card_stack"
    :class="[
      card.isDown ? 'down' : card.suit,
      isSelected ? 'selected' : 'not_selected'
    ]"
    style="cursor:pointer;"
    draggable="true"
  >
    <div class="rank">{{ card.rank }}</div>
    <div class="rank">{{ symbols[`${card.suit}`] }}</div>
    <div class="rank bottom">{{ symbols[`${card.suit}`] }}</div>
    <div class="rank bottom">{{ card.rank }}</div>
  </div>
</template>
<script>
import { ranks, suits, symbols } from "../assets/gameInfo.json";
export default {
  name: "Card",
  data: function() {
    return {
      symbols
    };
  },
  props: {
    card: Object,
    isSelected: Boolean
  },
  created() {
    // console.log(this.card);
  }
};
</script>

<style>
</style>