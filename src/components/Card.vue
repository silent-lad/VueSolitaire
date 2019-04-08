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
li {
  list-style: none;
  font-size: 25px;
}
ul {
  padding: 0;
}
.card.down {
  background: url("https://i.ibb.co/KhFKFRM/sl.png") rgb(255, 255, 255);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  text-decoration: transparent;
}
.rank {
  margin-left: 0.2vw;
  font-size: 1.4vw;
  line-height: 1.5vw;
}
.rank.bottom {
  position: relative;
  top: 3.8vw;
  text-align: left;
  transform: rotate(180deg);
  margin-right: 0.4vw;
}
.card_stack.down {
  margin-bottom: -8.5vw;
}
.card.down > .rank {
  visibility: hidden;
}
.card_stack {
  transition: all 0.2s linear;
  position: relative;
  margin-bottom: -7vw;
}
.card_stack:hover {
  box-shadow: 4px 4px 10px rgb(247, 210, 0);
}
.card_stack.selected {
  box-shadow: 5px 5px 10px blue;
  border: 3px solid blue;
  transform: translateY(20px) scale(1.1);
}
.card {
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.5);
  width: 7vw;
  height: 9.8vw;
  border-radius: 0.3vw;
  border: 1px solid black;
  padding: 0;
}
.heart {
  background: url("../assets/suits/heart.png") rgb(255, 255, 255);
  color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.spades {
  background: url("../assets/suits/spades.png") rgb(255, 255, 255);
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.clubs {
  background: url("../assets/suits/clubs.png") rgb(255, 255, 255);
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.diamond {
  background: url("../assets/suits/diamond.png") rgb(255, 255, 255);
  color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
@media screen and (max-width: 780px) {
  .card_stack.selected {
    box-shadow: 5px 5px 10px blue;
    border: 3px solid blue;
    transform: translate(2px, 2px);
  }
}
</style>