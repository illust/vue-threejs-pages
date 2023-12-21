import * as THREE from 'three';

function createMaterial() {
    // create a texture loader.
    const textureLoader = new THREE.TextureLoader();
  
    // load a texture
    const texture = textureLoader.load(
      '/textures/monkeyking.jpg',
    );
  
    // create a "standard" material using
    // the texture we just loaded as a color map
    const material = new THREE.MeshStandardMaterial({
      map: texture,
    });
  
    return material;
  }

function createCube() {
    const geometry = new THREE.BoxGeometry(2,2,2);
    const material = createMaterial();
    const cube = new THREE.Mesh(geometry, material);

    cube.rotation.set(-0.5, -0.1, 0.8);
    
    const radianPerSecond = THREE.MathUtils.degToRad(30);

    cube.tick = (delta) => {
        cube.rotation.z += delta * radianPerSecond;
        cube.rotation.x += delta * radianPerSecond;
        cube.rotation.y += delta * radianPerSecond;
    }

    return cube;
}

export { createCube };

