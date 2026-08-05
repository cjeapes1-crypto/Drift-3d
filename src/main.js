import * as THREE from "three";
import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { Physics } from "./physics.js";
import { ChaseCamera } from "./camera.js";

// Canvas
const canvas = document.getElementById("game");

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Lights
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(20, 30, 20);
scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 0.8));

// Ground
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500),
    new THREE.MeshStandardMaterial({
        color: 0x3f3f3f
    })
);

ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Car
const car = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 4),
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
);

car.position.y = 0.5;
scene.add(car);

// Systems
const player = new Player(car);
const controls = new Controls();
const physics = new Physics(player);
const chaseCamera = new ChaseCamera(camera, car);

// Hide loading screen
document.getElementById("loading").style.display = "none";

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Pass controls to player
    player.input = controls.input;

    // Update systems
    player.update(delta);
    physics.update(delta);
    chaseCamera.update(delta);

    // HUD
    document.getElementById("speed").innerText =
        Math.round(Math.abs(player.speed)) + " km/h";

    document.getElementById("score").innerText =
        "Drift Score: " + Math.floor(physics.driftScore);

    document.getElementById("boostBar").style.width =
        physics.boost + "%";

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
