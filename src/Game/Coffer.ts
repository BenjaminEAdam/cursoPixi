import { Graphics, Rectangle, Sprite } from "pixi.js";
import { Spearheads } from "./Spearheads";
import { DynamicObject } from "./DynamicObject";

export class Coffer extends DynamicObject{
    
    public override isFloor: Boolean;
    private hitbox: Graphics;
    
    constructor(){
        super();

        this.isFloor = false;
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.1);
        this.hitbox.drawRect(-10, 0, 105, 60);
        this.hitbox.endFill(); 

        const box = Sprite.from("cofre");
        box.scale.set(0.057,0.057);
        const pinches_izquierdos = new Spearheads(4);
        pinches_izquierdos.scale.set(-1,-1);
        pinches_izquierdos.position.set(-5, 62);
        const pinches_derechos = new Spearheads(4);
        pinches_derechos.scale.set(1,-1);
        pinches_derechos.position.set(87, 62);
             
        this.addChild(pinches_derechos);
        this.addChild(pinches_izquierdos);
        this.addChild(box);
        this.addChild(this.hitbox);
    }
    override getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

}