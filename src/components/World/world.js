import * as THREE from "three";

import { createCamera } from "./components/camera";
// import { createCube } from "./components/cube";
import { createLights } from "./components/lights";
import { createMeshGroup } from "./components/meshGroup";
import { createScene } from "./components/scene";

import { Loop } from './systems/Loop.js';
import { Resizer } from './systems/Resizer.js';
import { createControls } from './systems/controls';
import { createRenderer } from "./systems/renderer";

import { GUI } from "dat.gui";
let camera;
let scene;
let renderer;
let loop;

class World {
    constructor(container){
        camera = new createCamera();
        scene = new createScene();
        renderer = new createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);

        // const cube = createCube();
        const {ambientLight, mainLight} = createLights();
        const controls = new createControls(camera,renderer.domElement);
        const meshGroup = new createMeshGroup();
        loop.updatables.push(controls, meshGroup);
        // loop.updatables.push(cube);

        const axisHelper = new THREE.AxesHelper(150);
        const gridHelper = new THREE.GridHelper()
        scene.add(ambientLight, mainLight, meshGroup, axisHelper, gridHelper)

        const resizer = new Resizer(container, camera, renderer);
        console.log(resizer);

        const gui = new GUI();
        const groupFolder = gui.addFolder('group');
        groupFolder.add(meshGroup.rotation, 'x', 0, Math.PI * 2)
        groupFolder.add(meshGroup.rotation, 'y', 0, Math.PI * 2)
        groupFolder.add(meshGroup.rotation, 'z', 0, Math.PI * 2)
        groupFolder.open();
        const cameraFolder = gui.addFolder('Camera')
        cameraFolder.add(camera.position, 'z', 0, 10)
        cameraFolder.open()
    }   

    render() {
        // draw a single frame
        renderer.render(scene, camera);
      }
    
      start() {
        loop.start();
      }
    
      stop() {
        loop.stop();
      }
}

export { World };

