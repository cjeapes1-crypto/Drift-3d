export class TouchControls {

    constructor(input) {

        this.input = input;

        this.createControls();

    }


    createControls() {

        const container = document.createElement("div");
        container.id = "touchControls";

        container.innerHTML = `
        
        <div id="steering">
            <button id="left">◀</button>
            <button id="right">▶</button>
        </div>


        <div id="pedals">
            <button id="gas">▲</button>
            <button id="brake">▼</button>
        </div>

        `;

        document.body.appendChild(container);


        this.holdButton(
            "left",
            "left"
        );

        this.holdButton(
            "right",
            "right"
        );

        this.holdButton(
            "gas",
            "throttle"
        );

        this.holdButton(
            "brake",
            "brake"
        );

    }


    holdButton(buttonID, inputName) {

        const button =
            document.getElementById(buttonID);


        button.addEventListener(
            "touchstart",
            (e)=>{

                e.preventDefault();

                this.input[inputName] = true;

            },
            {passive:false}
        );


        button.addEventListener(
            "touchend",
            ()=>{

                this.input[inputName] = false;

            }
        );


        button.addEventListener(
            "mousedown",
            ()=>{

                this.input[inputName] = true;

            }
        );


        button.addEventListener(
            "mouseup",
            ()=>{

                this.input[inputName] = false;

            }
        );

    }

}
