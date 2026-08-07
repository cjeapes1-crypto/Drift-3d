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

const light =
new THREE.DirectionalLight(
0xffffff,
2
);

light.position.set(
20,
30,
20
);

scene.add(light);


scene.add(
new THREE.AmbientLight(
0xffffff,
0.8
)
);



// Road

createCourse(scene);




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
