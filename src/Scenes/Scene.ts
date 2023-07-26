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
    private physicsPlayer: PhysicsContainer;

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

        const player = new Player();
        Ticker.shared.add(function(deltaFrame){
            player.update(Ticker.shared.deltaMS, deltaFrame);
        })

        this.physicsPlayer = new PhysicsContainer();
        this.physicsPlayer.position.set(1, 580);
        this.physicsPlayer.speed.x = 200;
        this.physicsPlayer.speed.y = 0;
        this.physicsPlayer.acceleration.x = 0;
        this.physicsPlayer.acceleration.y = 0;
        this.addChild(this.physicsPlayer);
        this.physicsPlayer.addChild(player);

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
        let widthPlayer = Math.trunc(this.physicsPlayer.width);
        
        if(this.physicsPlayer.x >= (index.screenWidth - this.physicsPlayer.width)){
            this.physicsPlayer.speed.x = this.physicsPlayer.speed.x * (-1);
            this.physicsPlayer.scale.set(-1, 1);
            this.physicsPlayer.pivot.set(widthPlayer, 0);
        }
        if(this.physicsPlayer.x <= 0){
            this.physicsPlayer.speed.x = this.physicsPlayer.speed.x * (-1);
            this.physicsPlayer.scale.set(1, 1);
            this.physicsPlayer.pivot.set(0, 0);
        }
        // Lo siguiente está comentado, ya que no tiene movimiento en y
        // Si mas adelante se desea agregar movimiento en y se lo descomenta.
        /*if(this.physicsPlayer.y >= (index.screenHeight - this.physicsPlayer.height)){
            this.physicsPlayer.speed.y = this.physicsPlayer.speed.y * (-1); 
        }
        if(this.physicsPlayer.y <= 0){
            this.physicsPlayer.speed.y = this.physicsPlayer.speed.y * (-1); 
        }*/

        const deltaTimeSeconds = deltaTime / 1000;
        this.physicsLogo.update(deltaTimeSeconds);
        this.physicsPlayer.update(deltaTimeSeconds);

    }

}