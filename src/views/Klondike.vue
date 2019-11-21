<template>
  <div>
    <div class="mobile_warn card-5">
      <h1 style="padding:10px;">
        Please keep your phone in
        <span style="color:orange;">Landscape</span> mode to play the game
      </h1>
    </div>
    <div class="main_table">
      <button class="goback" @click="$router.push('/')">
        <i class="fas fa-long-arrow-alt-left"></i> Menu
      </button>
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
        >
          <div
            v-if="dealtCards.length != 0"
            :ref="
              dealtCards[dealtCards.length - 1].rank +
                dealtCards[dealtCards.length - 1].deck +
                dealtCards[dealtCards.length - 1].suit
            "
            class="card_wrapper"
            @click="
              selectCard(
                dealtCards[dealtCards.length - 1],
                dealtCards,
                'dealing'
              )
            "
            @dragstart="
              dragInit($event, dealtCards[dealtCards.length - 1], dealtCards)
            "
            @drag="dragCards($event, dealtCards[dealtCards.length - 1], true)"
            @dragend="drop($event, dealtCards[dealtCards.length - 1], true)"
          >
            <Card
              v-if="dealtCards.length != 0"
              :card="dealtCards[dealtCards.length - 1]"
              :isSelected="dealtCards[dealtCards.length - 1].isSelected"
            ></Card>
          </div>
        </div>
        <div
          class="card card_holder "
          style="margin:5% 5% 0px 0px;cursor:pointer;"
          v-for="(card, index) in foundation"
          :key="index"
          id="1"
          @click="selectCard(card, index, 'foundation')"
          @dragenter="dragEnter($event, card, index)"
        >
          <Holder v-if="card == ''"></Holder>
          <Card
            v-if="card != ''"
            :key="card.rank + card.suit"
            :card="card"
            :isSelected="card.isSelected"
            draggable="false"
          ></Card>
        </div>
      </div>
      <div class="bottom_table">
        <div
          class="card card_holder"
          v-for="deck in decks.slice(0, 7)"
          :key="decks.indexOf(deck) || 'null'"
          id="1"
          @dragenter="
            if (deck.length == 0) {
              dragEnter($event, 'empty', deck);
            }
          "
        >
          <Holder
            v-if="deck.length == 0"
            @click.native="selectCard('', deck, 'holder')"
          ></Holder>
          <transition-group name="list" tag="div">
            <div
              v-for="card in deck"
              :key="card.rank + card.suit + card.isDown"
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
import { moveCards } from "../assets/js/spiderSolitaire.js";
import flipSound from "../assets/audio/flip2.wav";
import shuffleSound from "../assets/audio/shuffle3.wav";

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
      flipSound,
      dealtCards: [],
      shuffleSound,
      highlightedDeck: "",
      highlightedCard: ""
    };
  },
  methods: {
    klondikeInit,
    processRank,
    checkFoundation,
    isDroppable,
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
      this.selectCard(card, deck, "dealing");
    },
    dragCards: function(e, card, dealer) {
      this.selectedArray.forEach(card => {
        var ref = `${card.rank + card.deck + card.suit}`;
        if (dealer) {
          var c = this.$refs[ref].children[0];
        } else {
          var c = this.$refs[ref][0].children[0];
        }
        var x = e.pageX - this.origin.x;
        var y = e.pageY - this.origin.y;
        if (e.pageX == 0) {
          var css = "z-index:9999;transform:translate3d(0px,0px, 0px);";
        } else {
          var css =
            "z-index:9999;pointer-events: none; transform: scale(1.05, 1.05) rotate(0deg) translate3d(" +
            x +
            "px, " +
            y +
            "px, 0px);";
        }
        c.style.cssText = css;
      });
    },
    drop: function(e, card, dealer) {
      if (typeof this.highlightedDeck == "number") {
        if (
          this.checkFoundation(this.highlightedCard, this.selectedCard) &&
          this.selectedArray.length == 1
        ) {
          this.foundation[this.highlightedDeck] = this.selectedCard;
          this.selectedDeck.pop();
          this.selectedArray.forEach(card => {
            if (dealer) {
              var c = this.$refs[`${card.rank + card.deck + card.suit}`]
                .children[0];
            } else {
              var c = this.$refs[`${card.rank + card.deck + card.suit}`][0]
                .children[0];
            }
            if (dealer) {
              var css = "z-index:0;pointer-events:auto;";
            } else {
              var css = "z-index:0;pointer-events:auto;display:none;";
            }
            c.style.cssText = css;
          });
          try {
            this.selectedDeck[this.selectedDeck.length - 1].isDown = false;
          } catch (e) {
            console.log(e);
          }

          this.removeSelection();
          this.$forceUpdate();
          return;
        }
      }
      if (this.highlightedCard == "empty") {
        if (card.rank == "K") {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            this.moveCards(
              this.highlightedDeck,
              this.selectedDeck,
              this.selectedCard
            );
            this.selectedArray.forEach(card => {
              if (dealer) {
                var c = this.$refs[`${card.rank + card.deck + card.suit}`]
                  .children[0];
              } else {
                var c = this.$refs[`${card.rank + card.deck + card.suit}`][0]
                  .children[0];
              }
              if (dealer) {
                var css = "z-index:0;pointer-events:auto;";
              } else {
                var css = "z-index:0;pointer-events:auto;display:none;";
              }
              c.style.cssText = css;
            });
            this.removeSelection();
            this.playSound();
          } else {
            this.removeSelection();
          }
        }
      }
      if (isDroppable(this.highlightedCard, this.selectedCard)) {
        if (isMovable(this.selectedCard, this.selectedDeck)) {
          this.selectedArray.forEach(card => {
            if (dealer) {
              var c = this.$refs[`${card.rank + card.deck + card.suit}`]
                .children[0];
            } else {
              var c = this.$refs[`${card.rank + card.deck + card.suit}`][0]
                .children[0];
            }
            if (dealer) {
              var css = "z-index:0;pointer-events:auto;";
            } else {
              var css = "z-index:0;pointer-events:auto;display:none;";
            }
            c.style.cssText = css;
          });
          this.moveCards(
            this.highlightedDeck,
            this.selectedDeck,
            this.selectedCard
          );
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
          if (dealer) {
            var c = this.$refs[`${card.rank + card.deck + card.suit}`]
              .children[0];
          } else {
            var c = this.$refs[`${card.rank + card.deck + card.suit}`][0]
              .children[0];
          }
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
      if (confirm("Congrats,You Won the Game.Do you want to continue?")) {
        this.spiderInit();
      } else {
        this.$router.push("/");
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
        this.removeSelection();
        return;
      }
      if (type == "foundation") {
        if (this.selectedCard) {
          if (
            this.selectedDeck[this.selectedDeck.length - 1] ==
              this.selectedCard ||
            processRank(this.selectedCard) - processRank(cardSelected) == 1
          ) {
            if (checkFoundation(cardSelected, this.selectedCard)) {
              this.foundation[deck] = this.selectedCard;
              this.selectedDeck.pop();
              try {
                if (
                  this.selectedDeck[this.selectedDeck.length - 1].isDown == true
                ) {
                  this.selectedDeck[
                    this.selectedDeck.length - 1
                  ].isDown = false;
                  this.$forceUpdate();
                }
              } catch (e) {}
            }
            this.removeSelection();
            return;
          }
          this.removeSelection();
          return;
        } else {
          return;
        }
      }
      if (type == "holder" && this.selectedCard) {
        if (this.selectedCard.rank == "K") {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            this.moveCards(deck, this.selectedDeck, this.selectedCard);
            this.$forceUpdate();
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
      } else {
        if (isDroppable(cardSelected, this.selectedCard)) {
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            this.moveCards(deck, this.selectedDeck, this.selectedCard);
            this.$forceUpdate();
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
@media screen and (orientation: portrait) {
  .main_table {
    display: none;
  }
}

/* @media screen and (orientation:landscape) { … } */
</style>

