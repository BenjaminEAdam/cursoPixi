import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Plataform extends Container implements IHitbox{

    private hitbox : Graphics;
    
    constructor(){
        super();
        const plataforma = Sprite.from("plataforma");
        this.addChild(plataforma);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.2);
        this.hitbox.drawRect(0, 170, 1280, 300);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}