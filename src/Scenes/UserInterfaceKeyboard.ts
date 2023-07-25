import { Container, NineSlicePlane, Sprite, Texture, Text, Graphics, AnimatedSprite} from "pixi.js";
import { Keyboard } from "../Utils/Keyboard";
import { IActualizable } from "../Utils/IActualizable";

export class UserInterfaceKeyboard extends Container implements IActualizable{

    private morteroAnimated: AnimatedSprite = new AnimatedSprite(
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

    constructor(){
        super();

        const myPanel = new NineSlicePlane(
            Texture.from("pergamino4"),
            50, 50, 50, 50
        );
        myPanel.width = 550;
        myPanel.height = 650;
        
        const myStarCentral = Sprite.from("estrella");
        myStarCentral.height = 110;
        myStarCentral.width = 110;
        myStarCentral.position.set(220,110);

        const myStarLeft = Sprite.from("estrella");
        myStarLeft.height = 90;
        myStarLeft.width = 90;
        myStarLeft.position.set(135,145);

        const myStarRight = Sprite.from("estrella");
        myStarRight.height = 90;
        myStarRight.width = 90;
        myStarRight.position.set(325,145);

        const cinta = Sprite.from("cinta");
        cinta.height = 80;
        cinta.width = 220;
        cinta.position.set(165,225);
        
        const textLevel = new Text("Nivel 20", {
            fontSize:25,
            fill: 0x111111,
            fontFamily:"Arial Black",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 3,
  
        });
        textLevel.position.set(223, 232);

        const textComplete = new Text("¡Completado!", {
            fontSize:50, 
            fill: 0xEEEEEE, 
            fontFamily:"Cavolini",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowAlpha: 0.7,
            dropShadowColor: 0x777777,
            dropShadowDistance: 4.5,
        });
        textComplete.position.set(137, 310);

        const textScore = new Text("Puntaje:", {
            fontSize:30, 
            fill: 0xEEEEEE, 
            fontFamily:"Cavolini",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowAlpha: 0.7,
            dropShadowColor: 0x999999,
            dropShadowDistance: 2,
        });
        textScore.position.set(150, 388);

        const textRecord = new Text("Record:", {
            fontSize:30, 
            fill: 0xEEEEEE, 
            fontFamily:"Cavolini",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowAlpha: 0.7,
            dropShadowColor: 0x999999,
            dropShadowDistance: 2,
        });
        textRecord.position.set(150, 442);

        const myRectangleScore = new Graphics();
        myRectangleScore.lineStyle({
            color: 0xDDDDDD, 
            width: 2,
        });
        myRectangleScore.drawRoundedRect(0,0,270,40,10);
        myRectangleScore.position.set(140,387);

        const myRectangleRecord = new Graphics();
        myRectangleRecord.lineStyle({
            color: 0xEFB810, 
            width: 2,
        });
        myRectangleRecord.drawRoundedRect(0,0,270,40,10);
        myRectangleRecord.position.set(140,440);

        const textRetryOrContinue = new Text("Presione: \"R\" para Reintentar \n \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \"C\" para Continuar", {
            fontSize:18, 
            fill: 0xffffff,
            fontFamily:"Bahnschrift",
        });
        textRetryOrContinue.position.set(155, 495);

        Keyboard.down.on("KeyC", this.onKeyC, this);
        Keyboard.down.on("KeyR", this.onKeyR, this);

        this.morteroAnimated.animationSpeed = 0.17;
        this.morteroAnimated.scale.set(0.025, 0.025);
        this.morteroAnimated.position.set(390,105);

        this.addChild(myPanel);
        this.addChild(myStarCentral);
        this.addChild(myStarLeft);
        this.addChild(myStarRight);
        this.addChild(cinta);
        this.addChild(textLevel);
        this.addChild(textComplete);
        this.addChild(textScore);
        this.addChild(textRecord);
        this.addChild(myRectangleScore);
        this.addChild(myRectangleRecord);
        this.addChild(textRetryOrContinue);

    }

    update(_deltaTime: number, _deltaFrame: number): void {
        this.morteroAnimated.update(4);
    }
    
    private onKeyC():void{
        console.log("Key \"C\" pressed!");
        this.morteroAnimated.play();
        this.addChild(this.morteroAnimated);
    }
    private onKeyR():void{
        console.log("Key \"R\" pressed!");
        this.morteroAnimated.stop();
        this.removeChild(this.morteroAnimated);
    }

}