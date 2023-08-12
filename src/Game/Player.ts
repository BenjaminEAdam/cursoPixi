import { AnimatedSprite, Graphics, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../Utils/Keyboard";
import { IHitbox } from "./IHitbox";

export class Player extends PhysicsContainer implements IHitbox{

    private playerAnimated: AnimatedSprite;
    private static readonly GRAVITY = 980;
    private static readonly HEADWIND = 0;
    private static readonly SPEED_X = 250;
    private static readonly SPEED_Y = 750;
    public inPlataform = true;
    private hitbox: Graphics;

    constructor(){
        super();

        this.playerAnimated = new AnimatedSprite(
            [
                Texture.from("soldadoCorriendo1"),
                Texture.from("soldadoCorriendo2"),
                Texture.from("soldadoCorriendo3"),
                Texture.from("soldadoCorriendo4"),
                Texture.from("soldadoCorriendo5"),
                Texture.from("soldadoCorriendo6"),
            ], false
        );
        this.playerAnimated.animationSpeed = 0.15;
        this.playerAnimated.scale.set(0.5, 0.5);
        this.playerAnimated.play();
        this.addChild(this.playerAnimated);
        
        this.acceleration.x = Player.HEADWIND;
        this.acceleration.y = Player.GRAVITY;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.2);
        this.hitbox.drawRect(50, 30, 110, 250);
        this.hitbox.endFill();
        this.playerAnimated.addChild(this.hitbox);

    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public override update(deltaMS: number){
        
        super.update(deltaMS/1000);
        
        this.playerAnimated.update(deltaMS / (1000/60));

        //Movimiento horizantal
        if(Keyboard.state.get("ArrowRight") && this.inPlataform){
            this.speed.x = Player.SPEED_X;
            this.scale.set(1, 1);
        }else if(Keyboard.state.get("ArrowLeft") && this.inPlataform){
            this.speed.x = -Player.SPEED_X;
            this.scale.set(-1, 1);
        }else{
            if(this.inPlataform){
                this.speed.x = 0;
            }
            
        }
        //Movimiento vertical
        if(Keyboard.state.get("ArrowUp") && this.inPlataform){
            this.inPlataform = false;
            this.speed.y = -Player.SPEED_Y;
        }
    }
}