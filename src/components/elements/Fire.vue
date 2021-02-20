<template>
  <span class="fire">
    <img :src="image" alt="fire">
  </span>
</template>

<script>
export default {
  name: 'FireElement',
  data() {
    return {
      image: require('assets/elements.jpg')
    }
  }
}
</script>

<style>
.fire {
  width: 50px;
  height: 50px;
  clip-path: circle(50px at 240px 626px);
}
</style>
