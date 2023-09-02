import { Container, Sprite } from "pixi.js";

export class Spearheads extends Container{

    constructor(){
        super();

        const pinche1 = Sprite.from("pinche");
        pinche1.position.set(0,0);
        pinche1.scale.set(0.025,0.025);
        pinche1.angle = 45;

        const pinche2 = Sprite.from("pinche");
        pinche2.position.set(0,15);
        pinche2.scale.set(0.025,0.025);
        pinche2.angle = 45;

        const pinche3 = Sprite.from("pinche");
        pinche3.position.set(0,30);
        pinche3.scale.set(0.025,0.025);
        pinche3.angle = 45;

        const pinche4 = Sprite.from("pinche");
        pinche4.position.set(0,45);
        pinche4.scale.set(0.025,0.025);
        pinche4.angle = 45;

        const pinche5 = Sprite.from("pinche");
        pinche5.position.set(0,60);
        pinche5.scale.set(0.025,0.025);
        pinche5.angle = 45;

        this.addChild(pinche1);
        this.addChild(pinche2);
        this.addChild(pinche3);
        this.addChild(pinche4);
        this.addChild(pinche5);
    }
}