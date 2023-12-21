import * as THREE from 'three';

function createMeshGroup() {
    const group = new THREE.Group();
    // const geometry = new THREE.SphereGeometry(0.25,16,16);
    const geometry = new THREE.CylinderGeometry(0.001,0.3)
    const material = new THREE.MeshStandardMaterial({color: 'indigo',transparent: true, opacity: 0.8,depthWrite: false, flatShading: true })
    const protoSphere = new THREE.Mesh(geometry, material);
    protoSphere.tick = () => {}
    group.add(protoSphere);

    for(let i = 0; i < 1; i += 0.05){
        const sphere = protoSphere.clone();

        // position the spheres on around a circle
        sphere.position.x = Math.cos(2 * Math.PI * i);
        sphere.position.y = Math.sin(2 * Math.PI * i);
        sphere.scale.multiplyScalar(0.01 + i);

        group.add(sphere);
    }
    group.scale.multiplyScalar(2);

    const radiansPerSecond = THREE.MathUtils.degToRad(30);

    group.tick = (delta) => {
        group.rotation.z -= delta * radiansPerSecond;
    };

    return group;
}

export { createMeshGroup };

