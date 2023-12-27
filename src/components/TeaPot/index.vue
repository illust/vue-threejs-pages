<template>
    <div>
      <canvas id="three"></canvas>
      <button @click="clickOnButton" style="color:aqua;width:50px;height:40px;top:0;left:0;position: relative;"></button>
    </div>
  </template>
  
<script>
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';

  
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
        materials : {},
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
        geometry : null
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
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 80000);
    this.camera.position.set(-600, 550, 1300)
    

    // LIGHTS
    this.ambientLight = new THREE.AmbientLight(0x7c7c7c, 3.0)

    this.light = new THREE.DirectionalLight(0xFFFFFF, 3.0)
    this.light.position.set(0.32, 0.39, 0.7)

    // EVENTS
    window.addEventListener("resize",this.onWindowResize)

    // CONTROLS
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls.addEventListener("change",this.render)

    // MATERIALS
    this.materials['wireframe'] = new THREE.MeshBasicMaterial({ wireframe: true})

    // SCENE
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xAAAAAA)

    this.scene.add(this.ambientLight)
    this.scene.add(this.light)

    // GUI
    // this.setupGui()
    },
    setupGui(){
    this.effectController = {
        newTess: 15,
        bottom: true,
        lid: true,
        body: true,
        fitLid: false,
        nonblinn: false,
        newShading: 'glossy'
    } 
    },
    onWindowResize(){
    this.renderer.setSize(window.innerWidth,window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.render()
    },
    render(){
    this.createNewTeapot()
    this.renderer.render(this.scene, this.camera)
    },
    createNewTeapot() {
        this.geometry = new TeapotGeometry(this.teapotSize,
            this.tess,
            this.effectController.bottom,
            this.effectController.lid,
            this.effectController.body,
            this.effectController.fitLid,
            this.effectController.nonblinn,
            this.effectController.newShading
            )
        let teapot = new THREE.Mesh(this.geometry, this.materials['wireframe'])
        this.scene.add(teapot)
    }
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
  