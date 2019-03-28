<template>
  <div class="main">
    <ul
      class="card_holder card"
      id="1"
    >
      <li
        v-for="card in deck_one"
        class="card card_stack"
        :key="card.value"
        :class="card.isDown?'down':card.suite"
      >
        <div class="value">{{card.value}}</div>
        <img
          class="value"
          :src="getImgUrl(card.suite)"
          width="15px"
        >
      </li>

    </ul>
    <ul
      class="card_holder card"
      id="2"
    >
      <li class="card down card_stack "></li>
      <li class="card down card_stack "></li>
    </ul>
    <div
      class="card_holder card"
      id="3"
    ></div>
    <div
      class="card_holder card"
      id="4"
    ></div>
    <div
      class="card_holder card"
      id="5"
    ></div>
    <div
      class="card_holder card"
      id="6"
    ></div>
    <div
      class="card_holder card"
      id="7"
    ></div>
    <div
      class="card_holder card"
      id="8"
    ></div>
    <div
      class="card_holder card"
      id="9"
    ></div>
    <div
      class="card_holder card"
      id="10"
    ></div>
    <ul
      class="card_holder_extra card down"
      id="12"
    >
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "main",
  data: function() {
    return {
      numbers: [1, 2, 3, 4, 5],
      deck_one: [
        { value: "K", isDown: true, suite: "heart" },
        { value: "K", isDown: true, suite: "heart" },
        { value: "K", isDown: false, suite: "spades" },
        { value: "K", isDown: false, suite: "heart" }
      ]
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    getImgUrl: function(suite) {
      return require("./assets/suites/" + suite + ".png");
    }
  }
};
// ♣, ♦, ♥, and ♠
</script>
<style >
li {
  font-size: 25px;
}
.card.first {
  margin: 0% -3% !important;
}
.card.down {
  background: url("./assets/sl.png") rgb(255, 255, 255);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  text-decoration: transparent;
}
.card.down > .value {
  visibility: hidden;
}
.card_stack.down {
  margin-bottom: -130%;
}
.card_stack {
  margin-bottom: -110%;
}
.card {
  width: 7vw;
  height: 19vh;
  border-radius: 2px;
  border: 1px solid black;
  padding: 0;
}
.card_deck {
  border: 2px solid black;
  border-radius: 10%;
  width: 8vw;
  list-style: none;
  margin-left: none;
  margin-top: -150%;
  margin: 5% 0;
  padding: 0;
  height: 19vh;
  background: rgb(124, 7, 7);
}
body {
  margin: 0px !important;
}
.main {
  display: flex;
  border: none;
  justify-content: space-evenly;
  height: 100vh;
  width: 100vw;
  padding: 0;
  background: green;
}
.card_holder {
  margin: 5% 0;
  list-style: none;
  background: rgba(0, 0, 0, 0.3);
}
.heart {
  background: url("./assets/suites/heart.png") rgb(255, 255, 255);
  font-size: 20px;
  color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}
.spades {
  background: url("./assets/suites/spades.png") rgb(255, 255, 255);
  font-size: 20px;
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}
.clubs {
  background: url("./assets/suites/clubs.png") rgb(255, 255, 255);
  font-size: 20px;
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}
.diamond {
  background: url("./assets/suites/diamond.png") rgb(255, 255, 255);
  font-size: 20px;
  color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}
.card_holder_extra {
  position: absolute;
  top: 65vh;
  left: 90vw;
}
</style>

