<template>
  <div id="app">
    <flip-image/>
  </div>
</template>

<script>
import FlipImage from './components/FlipImage.vue';
// import DiscoverThree from './components/DiscoverThree.vue';
// import ThreeDemo from './components/ThreeDemo.vue';

export default {
  name: 'App',
  components: {
    // DiscoverThree,
    // ThreeDemo,
    FlipImage
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
