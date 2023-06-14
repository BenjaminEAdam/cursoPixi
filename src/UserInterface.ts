import { Container, NineSlicePlane, Sprite, Texture, Text, Graphics} from "pixi.js";

export class UserInterface extends Container{

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

        const botonContinuar = Sprite.from("botonContinuar");
        botonContinuar.height=45;
        botonContinuar.width=130;
        botonContinuar.position.set(282,497);

        const botonReintentar = Sprite.from("botonReintentar");
        botonReintentar.height=45;
        botonReintentar.width=130;
        botonReintentar.position.set(138,497);

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

        const textNext = new Text("Continuar", {
            fontSize:25, 
            fill: 0x111111,
            fontFamily:"Bahnschrift",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 1,
        });
        textNext.position.set(292, 504);

        const textRetry = new Text("Reintentar", {
            fontSize:25, 
            fill: 0x111111,
            fontFamily:"Bahnschrift",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 1,
        });
        textRetry.position.set(146, 504);

        this.addChild(myPanel);
        this.addChild(myStarCentral);
        this.addChild(myStarLeft);
        this.addChild(myStarRight);
        this.addChild(cinta);
        this.addChild(botonContinuar);
        this.addChild(botonReintentar);
        this.addChild(textLevel);
        this.addChild(textComplete);
        this.addChild(textScore);
        this.addChild(textRecord);
        this.addChild(myRectangleScore);
        this.addChild(myRectangleRecord);
        this.addChild(textNext);
        this.addChild(textRetry);
    }

}