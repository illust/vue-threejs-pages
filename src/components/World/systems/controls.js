// import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 3;
    controls.tick = () => controls.update();
    return controls;
}

export { createControls };
