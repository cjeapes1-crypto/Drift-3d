export class Controls {
    constructor() {
        this.input = {
            throttle: false,
            brake: false,
            left: false,
            right: false,
            boost: false
        };

        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                    this.input.throttle = true;
                    break;

                case "KeyS":
                case "ArrowDown":
                    this.input.brake = true;
                    break;

                case "KeyA":
                case "ArrowLeft":
                    this.input.left = true;
                    break;

                case "KeyD":
                case "ArrowRight":
                    this.input.right = true;
                    break;

                case "Space":
                    this.input.boost = true;
                    break;
            }
        });

        window.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "KeyW":
                case "ArrowUp":
                    this.input.throttle = false;
                    break;

                case "KeyS":
                case "ArrowDown":
                    this.input.brake = false;
                    break;

                case "KeyA":
                case "ArrowLeft":
                    this.input.left = false;
                    break;

                case "KeyD":
                case "ArrowRight":
                    this.input.right = false;
                    break;

                case "Space":
                    this.input.boost = false;
                    break;
            }
        });
    }
}
