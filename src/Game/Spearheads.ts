import { Container, Sprite } from "pixi.js";

export class Spearheads extends Container{

    constructor(number: number){
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

        const pinche6 = Sprite.from("pinche");
        pinche6.position.set(0,75);
        pinche6.scale.set(0.025,0.025);
        pinche6.angle = 45;

        const pinche7 = Sprite.from("pinche");
        pinche7.position.set(0,90);
        pinche7.scale.set(0.025,0.025);
        pinche7.angle = 45;

        switch(number){
            case 1:
                this.addChild(pinche1);
                break;
            case 2:
                this.addChild(pinche1);
                this.addChild(pinche2);
                break;
            case 3:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                break;
            case 4:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                this.addChild(pinche4);
                break;
            case 5:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                this.addChild(pinche4);
                this.addChild(pinche5);
                break;
            case 6:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                this.addChild(pinche4);
                this.addChild(pinche5);
                this.addChild(pinche6);
                break;
            case 7:
                this.addChild(pinche1);
                this.addChild(pinche2);
                this.addChild(pinche3);
                this.addChild(pinche4);
                this.addChild(pinche5);
                this.addChild(pinche6);
                this.addChild(pinche7);
                break;
            default:
                console.log("INGRESE UN NÚMERO DEL 1 AL 7 para crear un Spearheads");
                break;
        }
    }
}