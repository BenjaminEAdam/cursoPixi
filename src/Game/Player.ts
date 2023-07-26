import { AnimatedSprite, Sprite, Texture } from "pixi.js";
import { IActualizable } from "../Utils/IActualizable";

export class Player extends Sprite implements IActualizable{

    private playerAnimated: AnimatedSprite = new AnimatedSprite(
        [
            Texture.from("soldadoCorriendo1"),
            Texture.from("soldadoCorriendo2"),
            Texture.from("soldadoCorriendo3"),
            Texture.from("soldadoCorriendo4"),
            Texture.from("soldadoCorriendo5"),
            Texture.from("soldadoCorriendo6"),
        ], false
    );

    constructor(){
        super();

        this.playerAnimated.animationSpeed = 0.15;
        this.playerAnimated.scale.set(0.5, 0.5);
        this.playerAnimated.play();
        this.addChild(this.playerAnimated);
    }

    update(_deltaTime: number, _deltaFrame: number): void {
        this.playerAnimated.update(1);
    }
}