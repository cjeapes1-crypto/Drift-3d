import * as THREE from "three";

export class ChaseCamera {

    constructor(camera, target) {

        this.camera = camera;
        this.target = target;

        this.offset = new THREE.Vector3(0, 4, -10);

        this.currentPosition = new THREE.Vector3();
        this.currentLookAt = new THREE.Vector3();

    }

    update(delta) {

        const offset = this.offset.clone();

        offset.applyQuaternion(this.target.quaternion);

        const desiredPosition =
            this.target.position.clone().add(offset);

        this.currentPosition.lerp(
            desiredPosition,
            5 * delta
        );

        this.camera.position.copy(this.currentPosition);

        const desiredLookAt =
            this.target.position.clone();

        desiredLookAt.y += 1;

        this.currentLookAt.lerp(
            desiredLookAt,
            8 * delta
        );

        this.camera.lookAt(this.currentLookAt);

    }

}
