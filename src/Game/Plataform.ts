import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Plataform extends Container implements IHitbox{

    private hitbox : Graphics;
    
    constructor(typePlat : string){
        super();
        
        this.hitbox = new Graphics();

        if(typePlat == "plataforma"){
            const plataforma = Sprite.from("plataforma");
            this.addChild(plataforma);

            this.hitbox.beginFill(0x0000FF, 0.2);
            this.hitbox.drawRect(0, 170, 1280, 300);
            this.hitbox.endFill();
            this.addChild(this.hitbox);
        }
        else if(typePlat == "piso"){
            const piso = Sprite.from("piso");
            this.addChild(piso);

            this.hitbox.beginFill(0x0000FF, 0.2);
            this.hitbox.drawRect(0, 0, 3000, 340);
            this.hitbox.endFill();
            this.addChild(this.hitbox);
        }else{
            console.log("DEVOLVER UN STRING VALIDO");
            this.hitbox.beginFill(0x0000FF, 0.2);
            this.hitbox.drawRect(0, 0, 0, 0);
            this.hitbox.endFill();
            this.addChild(this.hitbox);
        }
    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}