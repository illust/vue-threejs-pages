<template>
    <div>
      <canvas id="three"></canvas>
    </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: "CrossWord3D",  
  data () {
    return {
        renderer: null,
        camera: null,
        light: null,
        ambientLight: null,
        cameraControls: null,
        scene: null
    }
  },
  methods: {
    init(){
        const canvas = document.querySelector('#three')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight 

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true})
        this.renderer.setPixelRatio( window.devicePixelRatio)

        // SCENE
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x000000)

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(10, 15, -42)

        // LIGHTS
        this.ambientLight = new THREE.AmbientLight(0x7c7c7c, 3.0)

        this.light = new THREE.DirectionalLight(0xFFFFFF, 3.0)
        this.light.position.set(0.32, 0.39, 0.7)

        // EVENTS
        window.addEventListener("resize",this.onWindowResize)

        // Controls
        this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
        this.cameraControls.update()

        // RENDER
        this.renderer.setAnimationLoop(this.render)

        // PLANE MESH
        const planeMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(10,10),
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                visible: false
            })
        )
        planeMesh.name = "plane"
        planeMesh.rotateX(-Math.PI / 2)

        // BOTTOM MESH
        const bottomMesh = new THREE.Mesh(
            new THREE.BoxGeometry(10,10,2),
            new THREE.MeshBasicMaterial( {color: 0xc99d4c} )
        )
        bottomMesh.rotateX(-Math.PI / 2)

        bottomMesh.position.set(0, -1.01, 0)

        
        // HIGHLIGHT MESH
        const highlightMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1,1),
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            })
        )
        highlightMesh.rotateX(-Math.PI / 2)

        highlightMesh.position.set(1.5, 0, -1.5)


        // BLACK GROUP
        const blackGroup = new THREE.Group()
        for(let i = 0; i < 50 ; i++){
                    // BLOCk MESH
            const blockMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(1,1),
                new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    color: 0x000000
                })
            )
            blockMesh.rotateX(-Math.PI / 2)
            // 生成随机整数部分
            const integerPart1 = Math.floor(Math.random() * 9) - 4;
            const integerPart2 = Math.floor(Math.random() * 9) - 4;

            // 生成随机小数部分（.0 或 .5）
            const decimalPart = 0.5
            const posx = integerPart1 + decimalPart
            const posz = integerPart2 + decimalPart
            blockMesh.position.set(posx, 0, posz)
            blackGroup.add(blockMesh)
        }

        // GRID
        const gridMesh = new THREE.GridHelper(10,10,0x1e80ff,0x95858536)

        this.scene.add(this.ambientLight)
        this.scene.add(this.light)
        this.scene.add(planeMesh)
        this.scene.add(bottomMesh)
        this.scene.add(highlightMesh)
        this.scene.add(blackGroup)
        this.scene.add(gridMesh)

        // RAYCASTER
        const mousePosition = new THREE.Vector2()
        const raycaster = new THREE.Raycaster()
        let intersects;
        window.addEventListener("mousedown", e => {
            mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
            mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1
            raycaster.setFromCamera(mousePosition,this.camera)
            intersects = raycaster.intersectObjects(this.scene.children)
            intersects.forEach(intersect => {
                console.log("intersect",intersect);
                if(intersect.object.name === "plane"){
                    const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5)
                    highlightMesh.position.set(highlightPos.x, 0, highlightPos.z)
                }
            })
        })
    },
    render(){
        this.renderer.render(this.scene, this.camera)
    },
    onWindowResize(){
      this.renderer.setSize(window.innerWidth,window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.render()
    },
  },
  mounted () {
    this.init()
    // this.render()
  }
}
</script>

<style  scoped>

</style>
