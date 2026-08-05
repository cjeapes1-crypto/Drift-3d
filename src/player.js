export class Player {

    constructor(car){

        this.car = car;

        this.speed = 0;
        this.maxSpeed = 120;

        this.acceleration = 45;
        this.brakeForce = 60;

        this.turnSpeed = 2.2;

        this.heading = 0;

        this.velocity = {
            x:0,
            z:0
        };

        this.input = {
            throttle:false,
            brake:false,
            left:false,
            right:false
        };

    }

    update(delta){

        if(this.input.throttle){

            this.speed += this.acceleration * delta;

        }

        if(this.input.brake){

            this.speed -= this.brakeForce * delta;

        }

        this.speed *= 0.992;

        this.speed = Math.max(-20,
                     Math.min(this.maxSpeed,
                     this.speed));

        if(this.input.left){

            this.heading += this.turnSpeed * delta;

        }

        if(this.input.right){

            this.heading -= this.turnSpeed * delta;

        }

        this.velocity.x =
            Math.sin(this.heading) * this.speed;

        this.velocity.z =
            Math.cos(this.heading) * this.speed;

        this.car.position.x += this.velocity.x * delta;

        this.car.position.z += this.velocity.z * delta;

        this.car.rotation.y = this.heading;

    }

}
