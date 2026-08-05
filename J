import * as THREE from "three";

const canvas = document.getElementById("game");

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 15);

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(20, 25, 10);
scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 0.8));

// Road
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 40),
    new THREE.MeshStandardMaterial({
        color: 0x404040
    })
);

road.rotation.x = -Math.PI / 2;
scene.add(road);

// Test Car
const car = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 4),
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
);

car.position.y = 0.5;
scene.add(car);

// Hide loading text
document.getElementById("loading").style.display = "none";

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

function animate(){

    requestAnimationFrame(animate);

    renderer.render(scene,camera);

}

animate();
