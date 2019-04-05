<template>
  <div>
    <div class="mobile_warn card-5">
      <h1 style="padding:10px;">
        Please keep your phone in
        <span style="color:orange;">Landscape</span> mode to play the game
      </h1>
    </div>
    <div class="main_table">
      <div class="upper_table">
        <div
          style="position:absolute;top:-10px;left:6%;"
          @click="dealCards()"
          class="card_holder card"
          :class="decks[7].length == 0 ? '' : 'down'"
        ></div>
        <div
          style="position:absolute;top:-10px;left:16%;"
          class="card_holder card "
          @click="
            selectCard(dealtCards[dealtCards.length - 1], dealtCards, 'dealing')
          "
        >
          <Card
            v-if="dealtCards.length != 0"
            :card="dealtCards[dealtCards.length - 1]"
            :isSelected="dealtCards[dealtCards.length - 1].isSelected"
          ></Card>
        </div>
        <div
          class="card card_holder "
          style="margin:5% 5% 0px 0px;cursor:pointer;"
          v-for="(card, index) in foundation"
          :key="index"
          id="1"
          @click="selectCard(card, index, 'foundation')"
        >
          <Holder v-if="card == ''"></Holder>
          <Card
            v-if="card != ''"
            :key="card.rank + card.suit"
            :card="card"
            :isSelected="card.isSelected"
          ></Card>
        </div>
      </div>
      <div class="bottom_table">
        <div
          class="card card_holder"
          v-for="deck in decks.slice(0, 7)"
          :key="decks.indexOf(deck) || 'null'"
          id="1"
        >
          <Holder
            v-if="deck.length == 0"
            @click.native="selectCard('', deck, 'holder')"
          ></Holder>
          <transition-group name="list2" tag="div">
            <Card
              v-for="card in deck"
              :key="card.rank + card.suit + card.isDown"
              :card="card"
              :isSelected="card.isSelected"
              @click.native="selectCard(card, deck)"
            ></Card>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Holder from "../components/Holder.vue";
import { ranks, suits, symbols } from "../assets/gameInfo.json";
import {
  klondikeInit,
  processRank,
  checkFoundation,
  isDroppable,
  isMovable
} from "../assets/js/klondikeSolitaire.js";
import flip from "../assets/audio/flip.wav";
import shuffle2 from "../assets/audio/shuffle2.wav";

export default {
  name: "Klondike",
  components: { Card, Holder },
  props: { gameMode: Number },
  data: function() {
    return {
      ranks,
      suits,
      symbols,
      decks: [],
      foundation: ["", "", "", ""],
      selectedCard: "",
      selectedDeck: "",
      selectedArray: [],
      completedHands: 0,
      flip,
      dealtCards: [],
      shuffle2
    };
  },
  methods: {
    klondikeInit,
    processRank,
    checkFoundation,
    isDroppable,
    isMovable,
    gameOver: function() {
      console.log("GameOver");
    },
    handComplete: function() {
      console.log("complete");
      this.completedHands++;
      if (this.completedHands == 8) {
        this.gameOver();
      }
    },
    removeSelection: function() {
      console.log("hig");
      if (this.selectedCard != "") {
        this.selectedArray.forEach(element => {
          element.isSelected = false;
        });
        this.selectedArray = [];
        this.selectedCard.isSelected = false;
        this.selectedCard = "";
        this.selectedDeck = "";
        this.$forceUpdate();
      } else {
        return;
      }
    },
    dealCards: function() {
      this.playSound();
      if (this.decks[7].length == 0) {
        this.refillDealingCards();
        return;
      }
      var newCard = this.decks[7].pop();
      newCard.isDown = false;
      this.dealtCards.push(newCard);
      this.$forceUpdate();
    },
    refillDealingCards: function(params) {
      this.decks[7] = this.dealtCards.reverse();
      this.dealtCards = [];
    },
    selectCard: function(cardSelected, deck, type) {
      this.playSound();
      if (type == "dealing" && this.selectedCard != "") {
        return;
      }

      if (type == "foundation" && this.selectedCard) {
        console.log("asaksdn");

        if (
          this.selectedDeck[this.selectedDeck.length - 1] ==
            this.selectedCard ||
          processRank(this.selectedCard) - processRank(cardSelected) == 1
        ) {
          console.log("akhri");
          if (checkFoundation(cardSelected, this.selectedCard)) {
            console.log("akhri2");
            this.foundation[deck] = this.selectedCard;
            this.selectedDeck.pop();
            try {
              if (
                this.selectedDeck[this.selectedDeck.length - 1].isDown == true
              ) {
                console.log("skfdjljdsfljbsdlfjbljb");
                this.selectedDeck[this.selectedDeck.length - 1].isDown = false;
                this.$forceUpdate();
              } else {
                console.log("omg");
              }
            } catch (e) {}
            // cardSelected = this.selectedCard;
          }
          this.removeSelection();
          return;
        }
        this.removeSelection();
        return;
      }
      if (type == "holder" && this.selectedCard) {
        if (this.selectedCard.rank == "K") {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            var movedCards = this.selectedDeck.splice(
              this.selectedDeck.indexOf(this.selectedCard)
            );
            movedCards.forEach(newCard => {
              deck.push(newCard);
            });
            if (deck.length != 0) {
              if (
                this.selectedDeck[this.selectedDeck.length - 1].isDown == true
              ) {
                this.selectedDeck[this.selectedDeck.length - 1].isDown = false;
                this.$forceUpdate();
              }
            }

            this.removeSelection();
          } else {
            this.removeSelection();
          }
        }
      }
      if (this.selectedCard == "") {
        console.log(1);
        if (cardSelected.isDown) {
          console.log(1);
          return;
        }
        this.selectedCard = cardSelected;
        this.selectedDeck = deck;
        this.selectedCard.isSelected = true;
        if (isMovable(this.selectedCard, this.selectedDeck)) {
          console.log(1);
          this.selectedArray = this.selectedDeck.slice(
            this.selectedDeck.indexOf(this.selectedCard)
          );
          console.log(1);
          this.selectedArray.forEach(element => {
            element.isSelected = true;
          });
        }
        this.$forceUpdate();
      } else {
        console.log(2);
        console.log(isDroppable(cardSelected, this.selectedCard));
        if (isDroppable(cardSelected, this.selectedCard)) {
          console.log(2);
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            console.log(2);
            var movedCards = this.selectedDeck.splice(
              this.selectedDeck.indexOf(this.selectedCard)
            );
            movedCards.forEach(newCard => {
              deck.push(newCard);
            });
            try {
              if (
                this.selectedDeck[this.selectedDeck.length - 1].isDown == true
              ) {
                console.log("skfdjljdsfljbsdlfjbljb");
                this.selectedDeck[this.selectedDeck.length - 1].isDown = false;
                this.$forceUpdate();
              } else {
                console.log("omg");
              }
            } catch (e) {}
            console.log(this.selectedDeck[this.selectedDeck.length - 1].isDown);
            this.$forceUpdate();
            console.log("sdkjfa");

            this.removeSelection();
            console.log("hi", deck);
          } else {
            console.log(3);
            this.removeSelection();
          }
        } else {
          this.removeSelection();
        }
      }
    },
    playSound(shuffle) {
      if (shuffle) {
        var audio = new Audio(shuffle2);
        audio
          .play()
          .then(_ => {
            console.log(_);
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        var audio = new Audio(flip);
        audio.play();
      }
    }
  },
  watch: {
    foundation: function(array) {
      ranks = array.map(el => el.rank);
      if (ranks == ["K", "K", "K", "K"]) {
        this.gameOver();
      }
    }
  },
  created() {
    this.klondikeInit.bind(this);
    this.klondikeInit();
  }
};
</script>
<style>
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

.upper_table {
  display: flex;
  flex-direction: row-reverse;
  padding: 0;
  margin: 0px;
}
.bottom_table {
  display: flex;
  border: none;
  justify-content: space-evenly;
  height: 100vh;
  width: 100%;
  padding: 0;
}
.main_table {
  background-image: radial-gradient(
    rgba(57, 172, 57, 0.726),
    rgb(0, 116, 0),
    darkgreen
  );
  margin: 0px 0px;
}
@media screen and (max-width: 780px) {
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  .card {
    height: 60px;
  }
  .card_stack.down {
    margin-bottom: -55px;
  }
  .card_stack {
    margin-bottom: -45px;
  }
  .rank {
    font-size: 9px;
    margin-left: 1px;
  }
  .rank.bottom {
    /* position: absolute; */
    position: relative;
    top: 17px;
    left: 3px;
    text-align: left;
    /* transform: translate(50%, 50%); */
    transform: rotate(180deg);
    /* padding-left: 5px; */
  }
  .card_stack.selected {
    box-shadow: 5px 5px 10px blue;
    border: 3px solid blue;
    transform: translate(2px, 2px);
  }
}
@media screen and (orientation: portrait) {
  .main_table {
    display: none;
  }
}

.list2-enter {
  opacity: 0;
}
.list2-enter-to {
  opacity: 1;
}
.list2-leave {
  opacity: 1;
}
.list2-leave-to {
  opacity: 0;
}
/* @media screen and (orientation:landscape) { … } */
</style>

