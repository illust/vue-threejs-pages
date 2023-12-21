<template>
    <div>
      <canvas id="three"></canvas>
    </div>
  </template>
  
  <script>
  import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  
  export default {
    name: 'ShaderDemo',
    props: {
      msg: String
    },
    methods:{
      initThree() {
       const scene = new THREE.Scene()
        scene.background = new THREE.Color('#000')
  
        const canvas = document.querySelector('#three')
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight; 
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.alpha=true;
        renderer.shadowMap.enabled = true
  
        const camera = new THREE.PerspectiveCamera(
          50,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        camera.position.z = 15

        let rot = new THREE.Vector3(0,0,0);
        const radius = 4;
        for (let i = 0; i < 120; i++) {
            const geo = new THREE.PlaneGeometry(1.33,1,1,1);
            // const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.4, transparent: true, side: THREE.DoubleSide });
            const mat2 = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 1.0 },
                    resolution: { value: new THREE.Vector2() }
                },

                vertexShader: document.getElementById( 'vertexShader' ).textContent,
                fragmentShader: document.getElementById( 'fragmentShader' ).textContent
            })
            const mesh = new THREE.Mesh(geo, mat2);
            scene.add(mesh);
            mesh.rotateY(rot.y);
            rot.y += 360/120; 
            mesh.translateX(radius);
        }

        // 创建 OrbitControls 实例
        var controls = new OrbitControls(camera, renderer.domElement);

        // 设置一些参数（可选）
        controls.enableRotate = true;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 1.2;
        
        // 渲染循环
        function animate() {
          requestAnimationFrame(animate);
          controls.update(); // 更新控制器
          renderer.render(scene, camera);
        }

        animate()
      },
    },
    mounted(){
      this.initThree()
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
  