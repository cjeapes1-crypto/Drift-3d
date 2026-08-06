export default class TouchControls {

    constructor() {

        this.forward = false;
        this.brake = false;
        this.left = false;
        this.right = false;
        this.handbrake = false;
        this.nitro = false;

        this.createButton("▲",20,300,"forward");
        this.createButton("▼",20,390,"brake");
        this.createButton("◀",20,480,"left");
        this.createButton("▶",120,480,"right");

        this.createButton("HB",window.innerWidth-220,420,"handbrake");
        this.createButton("NOS",window.innerWidth-120,420,"nitro");

    }

    createButton(text,x,y,key){

        const btn=document.createElement("button");

        btn.innerHTML=text;

        btn.style.position="fixed";
        btn.style.left=x+"px";
        btn.style.top=y+"px";

        btn.style.width="90px";
        btn.style.height="90px";

        btn.style.fontSize="30px";
        btn.style.borderRadius="50%";

        btn.style.opacity="0.7";

        btn.style.zIndex=999;

        btn.ontouchstart=()=>{
            this[key]=true;
        };

        btn.ontouchend=()=>{
            this[key]=false;
        };

        document.body.appendChild(btn);

    }

}
