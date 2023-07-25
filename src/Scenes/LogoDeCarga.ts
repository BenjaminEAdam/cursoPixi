import { AnimatedSprite, Container, Graphics, Texture } from "pixi.js";
import { IActualizable } from "../Utils/IActualizable";

export class LogoDeCarga extends Container implements IActualizable{
    
    private morteroAnimated: AnimatedSprite;
    private myCircle: Graphics;
    private myCruz: Graphics;

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

        this.morteroAnimated.play();
        this.morteroAnimated.animationSpeed = 0.17;
        this.morteroAnimated.scale.set(0.075, 0.075);
        this.morteroAnimated.position.set(10,10);
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
        
    }

    update(_deltaTime: number, _deltaFrame: number): void {
        this.morteroAnimated.update(1);
    }

}