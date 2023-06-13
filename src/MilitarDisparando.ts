import { Container, Sprite } from "pixi.js";

export class MilitarDisparando extends Container{

    constructor(){
        super();

        const militar: Sprite = Sprite.from("militar");
	    militar.position.set(120,140);
	    militar.scale.set(1.3, 1.3);
	
        const mortero: Sprite = Sprite.from("mortero");
        mortero.position.set(505,205);
        mortero.scale.set(0.075, 0.075);
        mortero.angle = 43;

        this.addChild(militar);
        this.addChild(mortero);
    }
}