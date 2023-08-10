import { AnimatedSprite, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../Utils/Keyboard";

export class Player extends PhysicsContainer{

    private playerAnimated: AnimatedSprite;
    private static readonly GRAVITY = 150;
    private static readonly HEADWIND = 0;
    private static readonly SPEED_X = 250;
    private static readonly SPEED_Y = 250;
    public canJump = true;


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

    }

    public override update(deltaMS: number){
        
        super.update(deltaMS/1000);
        
        this.playerAnimated.update(deltaMS / (1000/60));

        //Movimiento horizantal
        if(Keyboard.state.get("ArrowRight")){
            this.speed.x = Player.SPEED_X;
            this.scale.set(1, 1);
        }else if(Keyboard.state.get("ArrowLeft")){
            this.speed.x = -Player.SPEED_X;
            this.scale.set(-1, 1);
            //this.pivot.set(Math.trunc(this.width), 0);
        }else{
            this.speed.x = 0;
        }
        //Movimiento vertical
        if(Keyboard.state.get("ArrowUp") && this.canJump){
            this.canJump = false;
            this.speed.y = -Player.SPEED_Y;
        }

    }
}