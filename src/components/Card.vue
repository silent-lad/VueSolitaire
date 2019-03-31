<template>
  <div
    class="card card_stack"
    :class="card.isDown?'down':card.suit"
    style="cursor:pointer;"
    draggable="true"
  >
    <div class="rank">{{card.rank}}</div>
    <div class="rank">{{symbols[`${card.suit}`]}}</div>
    <div class="rank bottom">{{symbols[`${card.suit}`]}}</div>
    <div class="rank bottom">{{card.rank}}</div>
  </div>
</template>
<script>
import { ranks, suits, symbols } from "../assets/gameInfo.json";
export default {
  data: function() {
    return {
      symbols
    };
  },
  props: {
    card: Object
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
  background: url("../assets/sl.png") rgb(255, 255, 255);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  text-decoration: transparent;
}
.rank {
  margin-left: 2px;
}
.rank.bottom {
  /* position: absolute; */
  position: relative;
  top: 43px;
  text-align: left;
  /* transform: translate(50%, 50%); */
  transform: rotate(180deg);
  padding-left: 5px;
}
.card_stack.down {
  margin-bottom: -125px;
}
.card.down > .rank {
  visibility: hidden;
}
.card_stack {
  position: relative;
  margin-bottom: -100px;
}
.card {
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.5);
  width: 7vw;
  height: 140px;
  border-radius: 4px;
  border: 1px solid black;
  padding: 0;
}
.heart {
  background: url("../assets/suits/heart.png") rgb(255, 255, 255);
  font-size: 20px;
  color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.spades {
  background: url("../assets/suits/spades.png") rgb(255, 255, 255);
  font-size: 20px;
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.clubs {
  background: url("../assets/suits/clubs.png") rgb(255, 255, 255);
  font-size: 20px;
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
.diamond {
  background: url("../assets/suits/diamond.png") rgb(255, 255, 255);
  font-size: 20px;
  color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
}
</style>

// v-on:dragstart="drag(card,$event,index)"
//     v-on:dragend="dragend(card,$event)"
//     v-on:dragenter="dragenter(card, $event)"
//         @click="selectCard(card)"