<template>
<div>
  <div class="mobile_warn card-5">
  <h1 style="padding:10px;">Please keep your phone in <span style="color:orange;">Landscape</span> mode to play the game</h1>
  </div>
  <div class="green_table">
    <!-- <button @click="displayInit();"></button> -->
    <div
      class="card card_holder"
      v-for="deck in decks.slice(0,10)"
      :key="decks.indexOf(deck)||'null'"
      id="1"
    >
      <Holder 
      v-if="deck.length==0" 
      @click.native="selectCard('',deck,true)"
      ></Holder>
      <transition-group name="list" tag="div">
      
        <Card
          v-for="card in deck"
          :key="card.rank+card.deck+card.suit"
          :card="card"
          :isSelected="card.isSelected"
          @click.native="selectCard(card,deck)"
        ></Card>
      </transition-group>
    </div>
    <div @click="dealCards()" class="pile card down"></div>
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
  isMovable
} from "../assets/spiderSolitaire.js";
import { normalInit } from "../assets/normalSolitaire.js";
import { setTimeout } from "timers";
import flip from "../assets/flip.wav"
import shuffle2 from "../assets/shuffle2.wav"

export default {
  name: "Spider",
  components: { Card ,Holder},
  props:{gameMode:Number},
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
      flip,
      shuffle2
    };
  },
  methods: {
    normalInit,
    spiderInit,
    checkPile,
    processRank,
    checkMoveSpider,
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
      this.playSound(true);
        this.decks.forEach(deck => {
        if (this.decks[10].length > 0) {       
          var newCard = this.decks[10].pop();
          newCard.isDown = false;
          deck.push(newCard);
        }
      });
      this.$forceUpdate();
      
    },
    selectCard: function(cardSelected, deck,holder) {
      this.playSound();
      if(holder&&this.selectedCard){
        if(this.selectedCard.rank=='K'){
          if (isMovable(this.selectedCard, this.selectedDeck)) {
            var movedCards = this.selectedDeck.splice(
              this.selectedDeck.indexOf(this.selectedCard)
            );
            movedCards.forEach(newCard => {
              deck.push(newCard);
            });
            if(deck.lenght!=0){
              if (
                this.selectedDeck[this.selectedDeck.length - 1].isDown == true
              ) {
                this.selectedDeck[this.selectedDeck.length - 1].isDown = false;
              } 
            }            
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

        try{
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
        this.$forceUpdate();}catch(e){
          console.log(e);
          
        }
      } else {

        if (checkMoveSpider(cardSelected, deck, this.selectedCard)) {

          if (isMovable(this.selectedCard, this.selectedDeck)) {

            var movedCards = this.selectedDeck.splice(
              this.selectedDeck.indexOf(this.selectedCard)
            );
            movedCards.forEach(newCard => {
              deck.push(newCard);
            });

           try{ 
              if (
                this.selectedDeck[this.selectedDeck.length - 1].isDown == true
              ) {
                this.selectedDeck[this.selectedDeck.length - 1].isDown = false;
              }
            }catch(e){}
            
            var pileChecker = this.checkPile(deck);
            
            if (typeof pileChecker == 'number') {
              
              
                deck.splice(pileChecker);
                this.playSound();
               
                this.handComplete();
                if(deck.length!=0)
                deck[deck.length-1].isDown = false;
            }
            this.removeSelection();
           
          } else {
            this.removeSelection();
          }
        } else {
          this.removeSelection();
        }
      }
    },
    playSound (shuffle) {
      if(shuffle){
        var audio = new Audio(shuffle2);
        audio.play();
      }else {
        var audio = new Audio(flip);
        audio.play();
      }
    }
  },
  created() {
    if(this.gameMode==1){
      this.spiderInit.bind(this);
      this.spiderInit();
    }else {
      this.normalInit.bind(this);
      this.normalInit();
    }
  }
};
</script>
<style >
.mobile_warn {
  display:none;
}
.card_stack.down {
  margin-bottom: -125px;
}
.card_stack {
  transition: all 0.2s linear;
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
.card_stack:hover {
  box-shadow: 4px 4px 10px rgb(247, 210, 0);
}
.card_stack.selected {
  box-shadow: 5px 5px 10px blue;
  border: 3px solid blue;
  transform: translateY(20px) scale(1.1);
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
/* html {
  background: green;
} */
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
  /* background: green; */
  /* background-image: radial-gradient(
    rgba(57, 172, 57, 0.726),
    rgb(0, 116, 0),
    darkgreen
  ); */
}
.card_holder {
  /* card length margin */
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
  transform: translateY(30px);
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
@media screen and (orientation:portrait) {
   .mobile_warn {

   background: #D66666;
  border-radius: 10px;
  display: inline-block;
  color: #A32A2C;
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size:12px;
  /* height: 100px; */
  margin: 1rem;
  position: relative;
  width: 90%;

  }
  .card-5 {
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}
  .green_table{
    display:none;
  }   
}
/* @media screen and (orientation:landscape) { … } */
</style>

