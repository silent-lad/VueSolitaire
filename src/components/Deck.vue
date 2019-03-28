<template>
  <div>
    <ul
      class="card_holder card"
      id="9"
    >
      <li
        v-for="card in decks[8]"
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
  </div>
</template>
<script>
export default {};
</script>

