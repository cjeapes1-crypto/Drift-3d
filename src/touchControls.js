export class TouchControls {

    constructor() {

        this.input = {
            throttle: false,
            brake: false,
            left: false,
            right: false
        };

        this.createControls();

    }


    createButton(text, position) {

        const button = document.createElement("button");

        button.innerText = text;

        button.style.position = "fixed";
        button.style.width = "90px";
        button.style.height = "90px";
        button.style.borderRadius = "50%";
        button.style.fontSize = "25px";
        button.style.opacity = "0.7";
        button.style.zIndex = "1000";

        button.style[position.side] = "30px";
        button.style[position.vertical] = "30px";

        document.body.appendChild(button);

        return button;

    }


    createControls() {

        // Steering - bottom left

        const left = this.createButton(
            "◀",
            {
                side:"left",
                vertical:"bottom"
            }
        );

        left.style.left = "30px";
        left.style.bottom = "40px";


        const right = this.createButton(
            "▶",
            {
                side:"left",
                vertical:"bottom"
            }
        );

        right.style.left = "130px";
        right.style.bottom = "40px";


        // Pedals - bottom right

        const gas = this.createButton(
            "▲",
            {
                side:"right",
                vertical:"bottom"
            }
        );

        gas.style.right = "30px";
        gas.style.bottom = "130px";


        const brake = this.createButton(
            "▼",
            {
                side:"right",
                vertical:"bottom"
            }
        );

        brake.style.right = "30px";
        brake.style.bottom = "30px";


        this.hold(left, "left");
        this.hold(right, "right");
        this.hold(gas, "throttle");
        this.hold(brake, "brake");

    }


    hold(button, action) {

        button.addEventListener(
            "touchstart",
            (e)=>{
                e.preventDefault();
                this.input[action] = true;
            }
        );


        button.addEventListener(
            "touchend",
            ()=>{
                this.input[action] = false;
            }
        );


        button.addEventListener(
            "mousedown",
            ()=>{
                this.input[action] = true;
            }
        );


        button.addEventListener(
            "mouseup",
            ()=>{
                this.input[action] = false;
            }
        );

    }

}
