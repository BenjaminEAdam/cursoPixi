import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";
import { Spearheads } from "./Spearheads";

export class BoxAmmunition extends PhysicsContainer implements IHitbox{
    
    private hitbox: Graphics;
    
    constructor(number : number){
        super();

        this.hitbox = new Graphics();
        const box = Sprite.from("cajaMilitar");
        box.scale.set(0.09,0.09);
        const pinches_izquierdos = new Spearheads(3);
        pinches_izquierdos.scale.set(-1,-1);
        pinches_izquierdos.position.set(-5, 50);
        const pinches_derechos = new Spearheads(3);
        pinches_derechos.scale.set(1,-1);
        pinches_derechos.position.set(112, 50);
        const pinches_superiores = new Spearheads(7);
        pinches_superiores.angle = 270;
        pinches_superiores.position.set(0,-2);
        const pinche_esquina_izquierda = new Spearheads(1);
        pinche_esquina_izquierda.position.set(-10,5);
        pinche_esquina_izquierda.angle = 235;
        const pinche_esquina_derecha = new Spearheads(1);
        pinche_esquina_derecha.position.set(104,-6);
        pinche_esquina_derecha.angle = 305;
        
        switch(number){
            case 1:
                this.hitbox.beginFill(0x0000FF, 0.1);
                this.hitbox.drawRect(-10, 0, 130, 50);
                this.hitbox.endFill();
                break;
            case 2:
                this.hitbox.beginFill(0x0000FF, 0.1);
                this.hitbox.drawRect(-10, -10, 130, 60);
                this.hitbox.endFill();
                this.addChild(pinches_superiores);
                this.addChild(pinche_esquina_izquierda);
                this.addChild(pinche_esquina_derecha);
                break;
            default:
                console.log("INGRESE EL NUMERO 1 O EL 2 para crear un BoxAmmunition");
                break;
        }
        this.addChild(pinches_derechos);
        this.addChild(pinches_izquierdos);
        this.addChild(box);
        this.addChild(this.hitbox);
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

}