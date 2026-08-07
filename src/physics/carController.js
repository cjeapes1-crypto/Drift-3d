import * as THREE from "three";

export default class CarController {
    constructor(car) {
        this.car = car;

        this.speed = 0;
        this.maxSpeed = 180;
        this.reverseSpeed = -35;

        this.acceleration = 55;
        this.braking = 90;

        this.turnSpeed = 2.4;
        this.friction = 0.985;

        this.nitro = false;

        this.drifting = false;
        this.driftGrip = 0.78;
        this.normalGrip = 1.0;

        this.score = 0;
    }

    update(delta, input) {

        if (input.forward)
            this.speed += this.acceleration * delta;

        if (input.brake)
            this.speed -= this.braking * delta;

        if (this.nitro)
            this.speed += 25 * delta;

        this.speed *= this.friction;

        this.speed = Math.min(this.maxSpeed, this.speed);
        this.speed = Math.max(this.reverseSpeed, this.speed);

        let steer = 0;

        if (input.left)
            steer += 1;

        if (input.right)
            steer -= 1;

        const grip = input.handbrake
            ? this.driftGrip
            : this.normalGrip;

        if (input.handbrake && Math.abs(this.speed) > 40) {

            this.drifting = true;

            this.score +=
                Math.abs(steer) *
                Math.abs(this.speed) *
                delta *
                2;

        } else {

            this.drifting = false;

        }

        this.car.rotation.y +=
            steer *
            this.turnSpeed *
            delta *
            (this.speed / this.maxSpeed);

        const forward = new THREE.Vector3(
            Math.sin(this.car.rotation.y),
            0,
            Math.cos(this.car.rotation.y)
        );

        this.car.position.add(
            forward.multiplyScalar(
                this.speed *
                delta *
                grip
            )
        );
    }
}
