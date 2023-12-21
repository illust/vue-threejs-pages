<template>
  <div id="container">
  </div>
</template>

<script>
import { World } from './World/world';
export default {
  data () {
    return {
    }
  },
  methods:{
    init(){
        const container = document.querySelector('#container');
        console.log("container",container);
        const world = new World(container);
        world.start();
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style  scoped>
#container{
    width: 100%;
    height: 100%;
}
</style>
