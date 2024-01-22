<template>
    <div>
      <canvas id="three"></canvas>
    </div>
  </template>
  
<script>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  
export default {
  name: 'TeaPot',
  props: {
      msg: String
  },
  data() {
      return{
          renderer: null,
          camera: null,
          light: null,
          ambientLight: null,
          cameraControls : null,
          scene: null,
          materials : null,
          geometry : null,
          mesh: null,
          textureLoader: null,
          effectController: {
              newTess: 15,
              bottom: true,
              lid: true,
              body: true,
              fitLid: false,
              nonblinn: false,
              newShading: 'glossy'
          },
          teapotSize : 300,
          tess : -1,
      }
  },
  methods:{
      clickOnButton(){
          this.$router.push({path: "flip-image"})
      },
      init() {
          const canvas = document.querySelector('#three')
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight 

          // RENDERER
          this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true})
          this.renderer.setPixelRatio( window.devicePixelRatio)
          this.renderer.alpha=true
          this.renderer.shadowMap.enabled = true

          // CAMERA
          this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
          this.camera.position.set(600, 550, 1300)
          

          // LIGHTS
          this.ambientLight = new THREE.AmbientLight(0x7c7c7c, 3.0)

          this.light = new THREE.DirectionalLight(0xFFFFFF, 3.0)
          this.light.position.set(0.32, 0.39, 0.7)

          // SCENE
          this.scene = new THREE.Scene()
          this.scene.background = new THREE.Color(0xAAAAAA)

          this.scene.add(this.ambientLight)
          this.scene.add(this.light)

          // EVENTS
          window.addEventListener("resize",this.onWindowResize)

          // CONTROLS
          this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
          this.cameraControls.addEventListener("change",this.render)

          // GEOMETRY
          this.geometry = new THREE.BoxGeometry(100,100,100);

          // MATERIALS & TEXTURE
          this.loader = new THREE.TextureLoader();
          this.loader.load(require("@/assets/mip-low-res-enlarged.png"),(texture) => {
              texture.minFilter = THREE.LinearMipmapLinearFilter
              this.materials = new THREE.MeshBasicMaterial({
                  map: texture
              })
              this.mesh = new THREE.Mesh(this.geometry, this.materials)
              this.scene.add(this.mesh)
          })

      },

      onWindowResize(){
        this.renderer.setSize(window.innerWidth,window.innerHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.render()
      },
      render(){
        this.renderer.render(this.scene, this.camera)
      },
  },

  mounted(){
      this.init()
      this.render()
  }
}
  </script>
  
  <style scoped>
  #three {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  