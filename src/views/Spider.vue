<template>
  <div>
    <div class="mobile_warn card-5">
      <h1 style="padding:10px;">
        Please keep your phone in
        <span style="color:orange;">Landscape</span> mode to play the game
      </h1>
    </div>
    <div class="green_table">
      <button class="goback" @click="$router.push('/')">
        <i class="fas fa-long-arrow-alt-left"></i> Menu
      </button>
      <div
        class="card card_holder"
        v-for="deck in decks.slice(0, 10)"
        :key="decks.indexOf(deck) || 'null'"
        id="1"
      >
        <Holder
          v-if="deck.length == 0"
          @click.native="selectCard('', deck, true)"
          @dragenter.native="dragEnter($event, '', deck)"
        ></Holder>
        <transition-group name="list" tag="div">
          <div
            v-for="card in deck"
            :key="card.rank + card.deck + card.suit"
            :ref="card.rank + card.deck + card.suit"
            class="card_wrapper"
            @dragstart="dragInit($event, card, deck)"
            @drag="dragCards($event, card)"
            @dragend="drop($event, card)"
            @dragenter="
              if (card.isDown == false) {
                dragEnter($event, card, deck);
              }
            "
          >
            <Card
              :card="card"
              :isSelected="card.isSelected"
              @click.native="selectCard(card, deck)"
            ></Card>
          </div>
        </transition-group>
      </div>
      <div
        @click="dealCards()"
        class="pile card"
        :class="decks[10].length != 0 ? 'down' : 'card'"
      ></div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Holder from "../components/Holder.vue";
import { ranks, suits, symbols } from "../assets/gameInfo.json";
import {
  spiderInit,
  processRank,
  checkPile,
  checkMoveSpider,
  isMovable,
  moveCards
} from "../assets/js/spiderSolitaire.js";
import { normalInit } from "../assets/js/normalSolitaire.js";
import { setTimeout } from "timers";
import flipSound from "../assets/audio/flip2.wav";
import shuffleSound from "../assets/audio/shuffle3.wav";

export default {
  name: "Spider",
  components: { Card, Holder },
  props: { gameMode: String },
  data: function() {
    return {
      ranks,
      suits,
      symbols,
      decks: [],
      selectedCard: "",
      selectedDeck: "",
      selectedArray: [],
      completedHands: 0,
      flipSound,
      shuffleSound,
      origin
    };
  },
  methods: {
    normalInit,
    spiderInit,
    checkPile,
    processRank,
    checkMoveSpider,
    isMovable,
    moveCards,
    dragInit: function(e, card, deck) {
      this.origin = {
        x: e.pageX,
        y: e.pageY
      };
      event.dataTransfer.setData("text", "silentlad");
      e.dataTransfer.setDragImage(new Image("0", "0"), -10, -10);
      this.removeSelection();
      this.selectCard(card, deck);
    },
    dragCards: function(e, card) {
      this.selectedArray.forEach(card => {
        var ref = `${card.rank + card.deck + card.suit}`;
        var c = this.$refs[ref][0].children[0];
        var x = e.pageX - this.origin.x;
        var y = e.pageY - this.origin.y;
        if (e.pageX == 0) {
          var css = "z-index:9999;transform:translate(0px,0px);display:none;";
        } else {
          var css =
            "z-index:9999;pointer-events: none; transform: scale(1.05, 1.05) rotate(0deg) translate(" +
            x +
            "px, " +
            y +
            "px);";
        }
        c.style.cssText = css;
      });
    },
    drop: function(e, card) {
      if (this.highlightedCard == "") {
        if (card.rank == "K") {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            this.moveCards(
              this.highlightedDeck,
              this.selectedDeck,
              this.selectedCard
            );
            this.isCompleteHand(this.highlightedDeck);
            this.removeSelection();
            this.playSound();
          } else {
            this.removeSelection();
          }
        }
      }

      if (
        checkMoveSpider(
          this.highlightedCard,
          this.highlightedDeck,
          this.selectedCard
        )
      ) {
        if (isMovable(this.selectedCard, this.selectedDeck)) {
          this.selectedArray.forEach(card => {
            var c = this.$refs[`${card.rank + card.deck + card.suit}`][0]
              .children[0];
            var css = "z-index:0;pointer-events:auto;display:none;";
            c.style.cssText = css;
          });
          this.moveCards(
            this.highlightedDeck,
            this.selectedDeck,
            this.selectedCard
          );
          this.isCompleteHand(this.highlightedDeck);
          this.removeSelection();
          this.playSound();
          return;
        } else {
          this.selectedArray.forEach(card => {
            var c = this.$refs[`${card.rank + card.deck + card.suit}`][0]
              .children[0];
            var css = "z-index:0;pointer-events:auto;";
            c.style.cssText = css;
          });
          this.removeSelection();
        }
      } else {
        this.selectedArray.forEach(card => {
          var c = this.$refs[`${card.rank + card.deck + card.suit}`][0]
            .children[0];
          var css = "z-index:0;pointer-events:auto;";
          c.style.cssText = css;
        });
        this.removeSelection();
      }
    },
    dragEnter: function(e, card, deck) {
      this.highlightedCard = card;
      this.highlightedDeck = deck;
    },
    gameOver: function() {
      console.log("GameOver");
      if (confirm("Congrats,You Won the Game.Do you want to continue?")) {
        this.spiderInit();
      } else {
        this.$router.push("/");
      }
    },
    handComplete: function() {
      console.log("complete");
      this.completedHands++;
      if (this.completedHands == 8) {
        this.gameOver();
      }
    },
    removeSelection: function() {
      if (this.selectedCard != "") {
        this.selectedArray.forEach(element => {
          element.isSelected = false;
        });
        this.selectedArray = [];
        this.selectedCard.isSelected = false;
        this.selectedCard = "";
        this.selectedDeck = "";
        this.highlightedCard = "";
        this.highlightedDeck = "";
        this.$forceUpdate();
      } else {
        return;
      }
    },
    dealCards: function() {
      if (this.decks[10].length != 0) {
        this.playSound(true);
        this.decks.forEach(deck => {
          if (this.decks[10].length > 0) {
            var newCard = this.decks[10].pop();
            newCard.isDown = false;
            deck.push(newCard);
          }
        });
        this.decks.forEach(deck => {
          this.isCompleteHand(deck);
        });
        this.$forceUpdate();
      }
    },
    isCompleteHand: function(deck) {
      var pileChecker = this.checkPile(deck);
      if (typeof pileChecker == "number") {
        deck.splice(pileChecker);
        this.playSound();

        this.handComplete();
        if (deck.length != 0) deck[deck.length - 1].isDown = false;
      }
    },
    selectCard: function(cardSelected, deck, holder) {
      this.playSound();
      if (holder && this.selectedCard) {
        if (this.selectedCard.rank == "K") {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            this.moveCards(deck, this.selectedDeck, this.selectedCard);
            this.isCompleteHand(deck);
            this.removeSelection();
          } else {
            this.removeSelection();
          }
        }
      }
      if (this.selectedCard == "") {
        if (cardSelected.isDown) {
          return;
        }
        try {
          this.selectedCard = cardSelected;
          this.selectedDeck = deck;
          this.selectedCard.isSelected = true;
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            this.selectedArray = this.selectedDeck.slice(
              this.selectedDeck.indexOf(this.selectedCard)
            );
            this.selectedArray.forEach(element => {
              element.isSelected = true;
            });
          }
          this.$forceUpdate();
        } catch (e) {
          console.log(e);
        }
      } else {
        if (checkMoveSpider(cardSelected, deck, this.selectedCard)) {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            this.moveCards(deck, this.selectedDeck, this.selectedCard);
            this.isCompleteHand(deck);
            this.removeSelection();
          } else {
            this.removeSelection();
          }
        } else {
          this.removeSelection();
        }
      }
    },
    playSound(shuffle) {
      if (shuffle) {
        var audio = new Audio(this.shuffleSound);
        audio
          .play()
          .then(_ => {
            console.log(_);
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        var audio = new Audio(this.flipSound);
        audio.play();
      }
    }
  },
  created() {
    if (this.gameMode == "1") {
      this.spiderInit.bind(this);
      this.spiderInit();
    } else {
      this.normalInit.bind(this);
      this.normalInit();
    }
  }
};
</script>
<style >
.mobile_warn {
  display: none;
}
body {
  background-image: radial-gradient(
    rgba(57, 172, 57, 0.726),
    rgb(0, 116, 0),
    darkgreen
  );
  margin: 0px !important;
}
.green_table {
  display: flex;
  border: none;
  justify-content: space-evenly;
  height: 100vh;
  width: 100vw;
  padding: 0;
  background-image: radial-gradient(
    rgba(57, 172, 57, 0.726),
    rgb(0, 116, 0),
    darkgreen
  );
}
.card_holder {
  margin: 5% 0;
  list-style: none;
  background: rgba(0, 0, 0, 0.3);
}
.pile {
  position: absolute;
  top: 75vh;
  left: 89.4vw;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  /* transform: translateY); */
}
@media screen and (max-width: ) {
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
}
@media screen and (orientation: portrait) {
  .mobile_warn {
    background: #d66666;
    border-radius: 10px;
    display: inline-block;
    color: #a32a2c;
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 12px;
    margin: 1rem;
    position: relative;
    width: 90%;
  }
  .card-5 {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
  .green_table {
    display: none;
  }
}
.goback {
  cursor: pointer;
  position: absolute;
  text-shadow: 3px 2px 4px rgba(0, 0, 0, 0.548);
  top: 1vh;
  left: 2vw;
  border: none;
  background: none;
  font-family: "Pacifico", cursive;
  font-size: 2vw;
}
/* @media screen and (orientation:landscape) { … } */
</style>
