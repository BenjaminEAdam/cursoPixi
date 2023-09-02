import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
import { Spearheads } from "./Spearheads";

export class BoxArmed extends PhysicsContainer implements IHitbox{

    private hitbox: Graphics;
    
    constructor(number : number){
        super();

        const box = Sprite.from("caja");
        box.scale.set(0.09,0.09);
        const pinches_izquierdos = new Spearheads();
        pinches_izquierdos.scale.set(-1,-1);
        pinches_izquierdos.position.set(-5, 80);
        const pinches_superiores = new Spearheads();
        pinches_superiores.angle = 270;
        pinches_superiores.position.set(0,-5);
        this.hitbox = new Graphics();
        const pinche_esquina = Sprite.from("pinche");
        pinche_esquina.position.set(-10,3);
        pinche_esquina.scale.set(0.025,0.025);
        pinche_esquina.angle = 270;

        switch(number){
            case 1:
                this.hitbox.beginFill(0x0000FF, 0.2);
                this.hitbox.drawRect(-10, 0, 90, 80);
                this.hitbox.endFill();
                break;
            case 2:
                this.hitbox.beginFill(0x0000FF, 0.2);
                this.hitbox.drawRect(-10, -10, 90, 90);
                this.hitbox.endFill();
                this.addChild(pinches_superiores);
                this.addChild(pinche_esquina);
        }
        this.addChild(box);

        
        this.addChild(pinches_izquierdos);
        this.addChild(this.hitbox);
    }
    
    
    
    
    getHitbox(): Rectangle {
        throw new Error("Method not implemented.");
    }
    
}