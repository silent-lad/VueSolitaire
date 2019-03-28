<template>
  <div class="main">
    <!-- <button @click="displayInit();"></button> -->
    <ul
      class="card_holder card"
      id="1"
    >
      <li
        v-for="card in decks[0]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>

    </ul>
    <ul
      class="card_holder card"
      id="2"
    >
      <li
        v-for="card in decks[1]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>
    </ul>
    <ul
      class="card_holder card"
      id="3"
    >
      <li
        v-for="card in decks[2]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>
    </ul>
    <ul
      class="card_holder card"
      id="4"
    >
      <li
        v-for="card in decks[3]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>
    </ul>
    <ul
      class="card_holder card"
      id="5"
    >
      <li
        v-for="card in decks[4]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>
    </ul>
    <ul
      class="card_holder card"
      id="6"
    >
      <li
        v-for="card in decks[5]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>
    </ul>
    <ul
      class="card_holder card"
      id="7"
    >
      <li
        v-for="card in decks[6]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>
    </ul>
    <ul
      class="card_holder card"
      id="8"
    >
      <li
        v-for="card in decks[7]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>
    </ul>
    <ul
      class="card_holder card"
      id="9"
    >
      <li
        v-for="card in decks[8]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>
    </ul>
    <ul
      class="card_holder card"
      id="10"
    >
      <li
        v-for="card in decks[9]"
        class="card card_stack"
        :key="card.rank+card.deck+card.suit+card.deck"
        :class="card.isDown?'down':card.suit"
      >
        <div class="rank">{{card.rank}}</div>
        <img
          class="rank"
          :src="getImgUrl(card.suit)"
          width="13px"
        >
      </li>
    </ul>
    <div
      class="card_holder_extra card down"
      id="12"
      @click="addCards()"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: "main",
  data: function() {
    return {
      ranks: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
      suits: ["heart", "diamond", "spades", "clubs"],
      decks: [],
      cards: []
    };
  },
  methods: {
    getImgUrl: function(suit) {
      return require("./assets/suits/" + suit + ".png");
    },
    displayInit: function() {
      var deck1 = [];
      var deck2 = [];
      this.ranks.forEach(rank => {
        this.suits.forEach(suit => {
          deck1.push({ rank, isDown: true, suit, deck: 1 });
          deck2.push({ rank, isDown: true, suit, deck: 2 });
        });
      });
      this.cards = [...deck1, ...deck2];
      for (let i = this.cards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * i);

        let temp = this.cards[i];
        this.cards[i] = this.cards[randomIndex];
        this.cards[randomIndex] = temp;
      }
      for (let deckNumber = 0; deckNumber < 10; deckNumber++) {
        this.decks[deckNumber] = [
          ...this.cards.slice(deckNumber * 10 + 0, deckNumber * 10 + 5)
        ];
      }
      this.decks[10] = [...this.cards.slice(50)];
      this.decks.forEach(deck => {
        deck[deck.length - 1].isDown = false;
      });
    },
    addCards: function() {
      this.decks.forEach(deck => {
        if (this.decks[10].length > 0) {
          var newCard = this.decks[10].pop();
          console.log(newCard);

          newCard.isDown = false;
          deck.push(newCard);
          console.log(deck.length);
        }
      });
      this.$forceUpdate();
    }
  },
  created() {
    this.displayInit();
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
  background: url("./assets/sl.png") rgb(182, 28, 28);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  text-decoration: transparent;
}
.card.down > .rank {
  visibility: hidden;
}
.card_stack.down {
  margin-bottom: -125px;
}
.card_stack {
  margin-bottom: -100px;
}
.card {
  width: 7vw;
  height: 140px;
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
  height: 140px;
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
  background: url("./assets/suits/heart.png") rgb(255, 255, 255);
  font-size: 20px;
  color: red;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}
.spades {
  background: url("./assets/suits/spades.png") rgb(255, 255, 255);
  font-size: 20px;
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}
.clubs {
  background: url("./assets/suits/clubs.png") rgb(255, 255, 255);
  font-size: 20px;
  color: black;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
}
.diamond {
  background: url("./assets/suits/diamond.png") rgb(255, 255, 255);
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

