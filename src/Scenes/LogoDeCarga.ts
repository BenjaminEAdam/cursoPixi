import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { IHitbox } from "../Game/IHitbox";
import { PhysicsContainer } from "../Game/PhysicsContainer";

export class LogoDeCarga extends PhysicsContainer implements IHitbox{
    
    private morteroAnimated: AnimatedSprite;
    private static readonly GRAVITY = 60;
    private static readonly HEADWIND = 0;
    private static readonly SPEED_X = 100;
    private static readonly SPEED_Y = -280;
    private myCircle: Graphics;
    private myCruz: Graphics;
    private hitbox: Graphics;

    constructor(){
        super();

        this.morteroAnimated = new AnimatedSprite(
            [
                Texture.from("morteroPosicion1"),
                Texture.from("morteroPosicion2"),
                Texture.from("morteroPosicion3"),
                Texture.from("morteroPosicion4"),
                Texture.from("morteroPosicion5"),
                Texture.from("morteroPosicion6"),
                Texture.from("morteroPosicion7"),
                Texture.from("morteroPosicion8"),
            ], false
        );
        this.morteroAnimated.animationSpeed = 0.17;
        this.morteroAnimated.scale.set(0.075, 0.075);
        this.morteroAnimated.position.set(10,10);
        this.morteroAnimated.play();
        this.addChild(this.morteroAnimated);

        this.myCircle = new Graphics();
        this.myCircle.lineStyle({color: 0xDD0000, width: 5, alpha:1});
        this.myCircle.drawCircle(0,0,50);
        this.myCircle.position.set(50, 50);
        this.addChild(this.myCircle);

        this.myCruz = new Graphics();
        this.myCruz.lineStyle({color: 0xDD0000, width: 5, alpha:0.25});
        this.myCruz.moveTo(0,0)
        this.myCruz.lineTo(100,0);
        this.myCruz.moveTo(50,50)
        this.myCruz.lineTo(50,-50);
        this.myCruz.position.set(0, 50);
        this.addChild(this.myCruz);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.2);
        this.hitbox.drawRect(0, 0, 100, 100);
        this.hitbox.endFill();
        this.addChild(this.hitbox);

        this.acceleration.x = LogoDeCarga.HEADWIND;
        this.acceleration.y = LogoDeCarga.GRAVITY;
        this.speed.x = LogoDeCarga.SPEED_X;
        this.speed.y = LogoDeCarga.SPEED_Y;
        
    }
    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public override update(deltaMS: number){
        super.update(deltaMS/1000);
        this.morteroAnimated.update(deltaMS / (1000/60));
    }

}