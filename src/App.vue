<template>
  <div class="main">
    <ul
      class="card_holder card"
      id="1"
    >
      <li class="card down card_stack "></li>
      <li class="card down card_stack "></li>
      <li class="card card_stack heart">K ♥</li>
      <li class="card card_stack heart">K ♥</li>
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
      numbers: [1, 2, 3, 4, 5]
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    shuffle: function() {
      var list = [];
      var suits = ["clubs", "diamonds", "hearts", "spades"];
      var card = "";
      while (true) {
        var value = Math.floor(Math.random() * 12 + 1);
        var suit = suits[`${Math.floor(Math.random() * 3 + 1)}`];
        if (list.indexOf(`${value}${suit}`) == -1) {
          list.push(`${value}${suit}`);
        }
        if (list.length == 52) {
          break;
        }
      }
      console.log(list);
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
  background: url("./assets/App.png") rgb(255, 255, 255);
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

