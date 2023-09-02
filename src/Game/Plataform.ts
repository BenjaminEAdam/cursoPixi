import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Plataform extends PhysicsContainer implements IHitbox{

    private hitbox : Graphics;
    public isFloor : Boolean;
    
    constructor(typePlat : string){
        super();
        
        this.hitbox = new Graphics();
        this.isFloor = false;

        if(typePlat == "piso_piedra"){
            this.isFloor = true;
            const piso = Sprite.from("pisoPiedra");
            piso.scale.set(0.5,0.3);
            this.addChild(piso);

            this.hitbox.beginFill(0x0000FF, 0.2);
            this.hitbox.drawRect(0, 0, piso.width, piso.height);
            this.hitbox.endFill();
            this.addChild(this.hitbox);
        }else if(typePlat == "caja_madera"){

            //Implementar

        }else{
            console.log("EL STRING INGRESADO EN EL CONSTRUCTOR DE PLATAFORMA NO ES VALIDO");
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