<template>
  <div class="card holder" style="cursor:pointer;" draggable="true"></div>
</template>
<script>
export default {
  name: "Holder",
  data: function() {
    return {
      isDisplayed: false
    };
  }
};
</script>

<style>
.holder {
  opacity: 0;
}
.display {
  display: block;
}
.notDisplay {
  display: none;
}
</style>