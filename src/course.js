import * as THREE from "three";

export function createCourse(scene){

    // ---------- Grass ----------

    const grass = new THREE.Mesh(
        new THREE.PlaneGeometry(1000,1000),
        new THREE.MeshStandardMaterial({
            color:0x3d8b37
        })
    );

    grass.rotation.x = -Math.PI/2;
    grass.position.y = -0.02;
    scene.add(grass);

    // ---------- Asphalt ----------

    const roadMaterial =
        new THREE.MeshStandardMaterial({
            color:0x3f3f3f
        });

    // Main straight

    const straight = new THREE.Mesh(
        new THREE.BoxGeometry(30,0.05,220),
        roadMaterial
    );

    straight.position.set(0,0,0);
    scene.add(straight);

    // Hairpin

    // Hairpin

const curve = new THREE.Mesh(

    new THREE.TorusGeometry(
        40,
        15,
        16,
        60,
        Math.PI
    ),

    roadMaterial

);

curve.rotation.x = Math.PI/2;
curve.position.set(0,0,-110);

scene.add(curve);

    curve.rotation.x = Math.PI/2;
    curve.position.set(0,0,-110);

    scene.add(curve);

    // Return road

    const returnRoad = new THREE.Mesh(
        new THREE.BoxGeometry(30,0.05,220),
        roadMaterial
    );

    returnRoad.position.set(80,0,0);

    scene.add(returnRoad);

    // ---------- Kerbs ----------

    const kerbMaterial =
        new THREE.MeshStandardMaterial({
            color:0xff2222
        });

    for(let i=-100;i<=100;i+=8){

        const left = new THREE.Mesh(
            new THREE.BoxGeometry(1,0.1,4),
            kerbMaterial
        );

        left.position.set(-15.5,0.05,i);

        scene.add(left);

        const right = left.clone();

        right.position.x = 15.5;

        scene.add(right);

    }

    // ---------- Trees ----------

    for(let i=0;i<80;i++){

        const trunk =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.4,
                    0.5,
                    4
                ),

                new THREE.MeshStandardMaterial({
                    color:0x8b5a2b
                })

            );

        const leaves =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    2.5,
                    12,
                    12
                ),

                new THREE.MeshStandardMaterial({
                    color:0x2f8f2f
                })

            );

        const x =
            (Math.random()-0.5)*500;

        const z =
            (Math.random()-0.5)*500;

        if(Math.abs(x)<40) continue;

        trunk.position.set(x,2,z);

        leaves.position.set(x,5,z);

        scene.add(trunk);
        scene.add(leaves);

    }

    // ---------- Light poles ----------

    for(let i=-100;i<=100;i+=30){

        const pole =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.15,
                    0.15,
                    8
                ),

                new THREE.MeshStandardMaterial({
                    color:0x888888
                })

            );

        pole.position.set(-22,4,i);

        scene.add(pole);

    }

    // ---------- Finish line ----------

    const finish =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                30,
                0.02,
                2
            ),

            new THREE.MeshStandardMaterial({
                color:0xffffff
            })

        );

    finish.position.set(0,0.03,95);

    scene.add(finish);

}
