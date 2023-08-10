import { Text, Container, Ticker} from "pixi.js";
import { UserInterfaceButton } from "./UserInterfaceButton";
import { UserInterfaceKeyboard } from "./UserInterfaceKeyboard";
import { IActualizable } from "../Utils/IActualizable";
import { LogoDeCarga } from "./LogoDeCarga";
import { index } from "..";
import { PhysicsContainer } from "../Game/PhysicsContainer";
import { Player } from "../Game/Player";

export class Scene extends Container implements IActualizable{

    private physicsLogo: PhysicsContainer;
    private playerSolider: Player;

    constructor(){
        super();

        const myText = new Text("Cargando...", {fontSize:40, fill: 0xEEEEEE, fontFamily:"Arial"});
        myText.position.set(925, 650);
        this.addChild(myText);

        const userInterfaceButton = new UserInterfaceButton();
        userInterfaceButton.position.set(100,10);
        this.addChild(userInterfaceButton);
        Ticker.shared.add(function(deltaFrame){
            userInterfaceButton.update(Ticker.shared.deltaMS, deltaFrame);
        })

        const userInterfaceKeyboard = new UserInterfaceKeyboard();
        userInterfaceKeyboard.position.set(600, 10);
        this.addChild(userInterfaceKeyboard);
        Ticker.shared.add(function(deltaFrame){
            userInterfaceKeyboard.update(Ticker.shared.deltaMS, deltaFrame);
        })

        /*const player = new Player();
        Ticker.shared.add(function(deltaFrame){
            player.update(Ticker.shared.deltaMS, deltaFrame);
        })*/

        this.playerSolider = new Player();
        this.playerSolider.position.set(100, 580);
        this.playerSolider.pivot.set(Math.trunc(this.playerSolider.width)/3, 0);
        this.addChild(this.playerSolider);

        const logoDeCarga = new LogoDeCarga();
        logoDeCarga.scale.set(0.5, 0.5);
        Ticker.shared.add(function(deltaFrame){
            logoDeCarga.update(Ticker.shared.deltaMS, deltaFrame);
        })

        this.physicsLogo = new PhysicsContainer();
        this.physicsLogo.position.set(1200, 650);
        this.physicsLogo.speed.x = 100;
        this.physicsLogo.speed.y = -280;
        this.physicsLogo.acceleration.x = 0;
        this.physicsLogo.acceleration.y = 60;
        this.addChild(this.physicsLogo);
        this.physicsLogo.addChild(logoDeCarga);

    }

    public update(deltaTime: number, _deltaFrame: number): void {

        this.playerSolider.update(deltaTime);
        
        console.log("Pos x:", Math.trunc(this.physicsLogo.x));
        console.log("Tam x:", Math.trunc(index.screenWidth - this.physicsLogo.width));

        console.log("Pos y:", Math.trunc(this.physicsLogo.y));
        console.log("Tam y:", Math.trunc(index.screenHeight - this.physicsLogo.height));

        // Si speed en Y negativa (-) y X positiva (+) logo va hacia arriba y hacia la derecha.
        // Si speed en Y negativa (-) y X negativa (-) logo va hacia arriba y hacia la izquierda.
        // Si speed en Y positiva (+) y X negativa (-) logo va hacia abajo y hacia la izquierda.
        // Si speed en Y positiva (+) y X positiva (+) logo va hacia abajo y hacia la derecha.

        if(this.physicsLogo.x >= (index.screenWidth - this.physicsLogo.width)){
            this.physicsLogo.speed.x = this.physicsLogo.speed.x * (-1); 
        }
        if(this.physicsLogo.x <= 0){
            this.physicsLogo.speed.x = this.physicsLogo.speed.x * (-1); 
        }
        if(this.physicsLogo.y >= (index.screenHeight - this.physicsLogo.height)){
            this.physicsLogo.speed.y = this.physicsLogo.speed.y * (-1);
        }
        if(this.physicsLogo.y <= 0){
            this.physicsLogo.speed.y = this.physicsLogo.speed.y * (-1);
        }

        // Player
        
        if(this.playerSolider.x >= (index.screenWidth - 2*(this.playerSolider.width/3))){
            this.playerSolider.x = index.screenWidth - 2*(this.playerSolider.width/3);
        }
        if(this.playerSolider.x <= 0 - 2*(this.playerSolider.width/3)){
            this.playerSolider.x = 0 - 2*(this.playerSolider.width/3);
        }
        if(this.playerSolider.y >= (index.screenHeight - this.playerSolider.height)){
            this.playerSolider.y = index.screenHeight - this.playerSolider.height;
            this.playerSolider.canJump = true;
        }
        if(this.playerSolider.y <= 0){
            this.playerSolider.y = 0;
        }

        const deltaTimeSeconds = deltaTime / 1000;
        this.physicsLogo.update(deltaTimeSeconds);
        this.playerSolider.update(deltaTimeSeconds);

    }

}