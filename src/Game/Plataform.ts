import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Plataform extends PhysicsContainer implements IHitbox{

    private hitbox : Graphics;
    
    constructor(typePlat : string){
        super();
        
        this.hitbox = new Graphics();

        if(typePlat == "plataforma_tierra"){
            const plataforma = Sprite.from("plataforma_tierra");
            this.addChild(plataforma);

            this.hitbox.beginFill(0x0000FF, 0.2);
            this.hitbox.drawRect(0, 170, plataforma.width, 300);
            this.hitbox.endFill();
            this.addChild(this.hitbox);
        }
        else if(typePlat == "piso_tierra"){
            const piso = Sprite.from("piso_tierra");
            this.addChild(piso);

            this.hitbox.beginFill(0x0000FF, 0.2);
            this.hitbox.drawRect(0, 0, piso.width, 340);
            this.hitbox.endFill();
            this.addChild(this.hitbox);
        }else if(typePlat == "plataforma_piedra"){
            const plataforma = Sprite.from("plataforma_piedra");
            this.addChild(plataforma);

            this.hitbox.beginFill(0x0000FF, 0.2);
            this.hitbox.drawRect(0, 40, plataforma.width, 400);
            this.hitbox.endFill();
            this.addChild(this.hitbox);
        }
        else if(typePlat == "piso_piedra"){
            const piso = Sprite.from("piso_piedra");
            this.addChild(piso);

            this.hitbox.beginFill(0x0000FF, 0.2);
            this.hitbox.drawRect(0, 0, piso.width, piso.height);
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