import * as THREE from "three"
function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true})
    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(1920,1080);
    return renderer;
}

export { createRenderer };