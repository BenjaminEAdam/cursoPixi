import { Container, NineSlicePlane, Sprite, Texture } from "pixi.js";

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

        /*
        const cinta = Sprite.from("cinta");
        cinta.height = 70;
        cinta.width = 220;
        cinta.position.set(160,230);
        */

        const botonContinuar = Sprite.from("botonContinuar");
        botonContinuar.height=45;
        botonContinuar.width=130;
        botonContinuar.position.set(282,497);

        const botonReintentar = Sprite.from("botonReintentar");
        botonReintentar.height=45;
        botonReintentar.width=130;
        botonReintentar.position.set(138,497);

        this.addChild(myPanel);
        this.addChild(myStarCentral);
        this.addChild(myStarLeft);
        this.addChild(myStarRight);
        //this.addChild(cinta);
        this.addChild(botonContinuar);
        this.addChild(botonReintentar);
    }

}