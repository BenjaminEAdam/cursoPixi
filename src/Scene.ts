import { Container } from "pixi.js";
import { MilitarDisparando } from "./MilitarDisparando";

export class Scene extends Container{


    constructor(){
        super();

        const militarDisparando: MilitarDisparando = new MilitarDisparando();

        militarDisparando.scale.set(0.8,0.8);
        militarDisparando.position.set(-150, 75);
        militarDisparando.angle = -5;

        this.addChild(militarDisparando);
    }
}