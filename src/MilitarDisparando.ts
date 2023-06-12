import { Container, Sprite } from "pixi.js";

export class MilitarDisparando extends Container{

    constructor(){
        super();

        const militar: Sprite = Sprite.from("militar");
	    militar.position.set(120,140);
	    militar.scale.set(1.3, 1.3);
	
        const mortero: Sprite = Sprite.from("mortero");
        mortero.position.set(505,192);
        mortero.scale.set(0.1, 0.1);
        mortero.angle = 40;

        this.addChild(militar);
        this.addChild(mortero);
    }
}