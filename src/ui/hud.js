export default class HUD{

constructor(){

this.panel=document.createElement("div");

this.panel.style.position="fixed";
this.panel.style.left="20px";
this.panel.style.top="20px";

this.panel.style.color="white";
this.panel.style.fontSize="26px";
this.panel.style.fontFamily="Arial";

this.panel.style.background="rgba(0,0,0,.4)";
this.panel.style.padding="15px";
this.panel.style.borderRadius="12px";

document.body.appendChild(this.panel);

}

update(speed,lap,score){

this.panel.innerHTML=

`
Speed ${Math.round(speed)} km/h<br>
Lap ${lap}/3<br>
Drift ${Math.floor(score)}
`;

}

}
