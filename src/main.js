import { createCourse } from "./course.js";

import * as THREE from "three";

import { Player } from "./player.js";
import { Controls } from "./controls.js";
import { TouchControls } from "./touchControls.js";
import { Physics } from "./physics.js";
import { ChaseCamera } from "./camera.js";



const canvas =
document.getElementById("game");



const renderer =
new THREE.WebGLRenderer({

    canvas,
    antialias:true

});


renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
window.devicePixelRatio
);



const scene =
new THREE.Scene();

scene.background =
new THREE.Color(0x87ceeb);

scene.fog = new THREE.Fog(
    0x87ceeb,
    80,
    300
);



const camera =
new THREE.PerspectiveCamera(

    75,
    window.innerWidth /
    window.innerHeight,

    0.1,
    1000

);



// Lighting

const sun = new THREE.DirectionalLight(
    0xffffff,
    3
);

sun.position.set(40,60,30);
sun.castShadow = true;

scene.add(sun);

scene.add(
    new THREE.HemisphereLight(
        0xb1e1ff,
        0x444422,
        2
    )
);



// Road

createCourse(scene);

// Large grass field
const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshStandardMaterial({
        color: 0x3ba93b
    })
);

grass.rotation.x = -Math.PI / 2;
grass.position.y = -0.01; // slightly below the road
scene.add(grass);




// Car

const car =
new THREE.Mesh(

    new THREE.BoxGeometry(
        2,
        1,
        4
    ),

    new THREE.MeshStandardMaterial({
        color:0xffffff
    })

);


car.position.y =
0.5;


scene.add(car);



// Controls

const controls =
new Controls();


new TouchControls(
controls.input
);



// Game systems

const player =
new Player(car);


const physics =
new Physics(player);


const chaseCamera =
new ChaseCamera(
camera,
car
);



// Remove loading

document.getElementById(
"loading"
).style.display="none";



const clock =
new THREE.Clock();



function animate(){

    requestAnimationFrame(
        animate
    );


    const delta =
    clock.getDelta();



    player.input =
    controls.input;


    player.update(
        delta
    );


    physics.update(
        delta
    );


    chaseCamera.update(
        delta
    );



    document.getElementById(
    "speed"
    ).innerText =
    Math.round(
        Math.abs(player.speed)
    )
    +" km/h";



    document.getElementById(
    "score"
    ).innerText =
    "Drift Score: "
    +
    Math.floor(
        physics.driftScore
    );



    renderer.render(
        scene,
        camera
    );

}


animate();

const hud=document.createElement("div");

hud.style.position="fixed";
hud.style.left="20px";
hud.style.top="20px";

hud.style.background="rgba(0,0,0,.5)";

hud.style.padding="15px";

hud.style.borderRadius="15px";

hud.style.color="white";

hud.style.fontFamily="Arial";

hud.style.fontSize="24px";

document.body.appendChild(hud);



window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);


});
