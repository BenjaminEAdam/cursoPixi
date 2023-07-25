import { Text, Container, Ticker} from "pixi.js";
import { MilitarDisparando } from "../Game/MilitarDisparando";
import { UserInterfaceButton } from "./UserInterfaceButton";
import { UserInterfaceKeyboard } from "./UserInterfaceKeyboard";
import { IActualizable } from "../Utils/IActualizable";
import { LogoDeCarga } from "./LogoDeCarga";
import { index } from "..";

export class Scene extends Container implements IActualizable{

    private logo: LogoDeCarga;
    private direccion = 0;

    constructor(){
        super();

        const militarDisparando: MilitarDisparando = new MilitarDisparando();

        militarDisparando.scale.set(0.3,0.3);
        militarDisparando.position.set(-50, 575);
        militarDisparando.angle = -5;

        this.addChild(militarDisparando);

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

        const logoDeCarga = new LogoDeCarga();
        logoDeCarga.scale.set(0.5, 0.5);
        logoDeCarga.position.set(1200, 650);
        this.addChild(logoDeCarga);
        Ticker.shared.add(function(deltaFrame){
            logoDeCarga.update(Ticker.shared.deltaMS, deltaFrame);
        })

        this.logo=logoDeCarga;

    }
    
    public update(_deltaTime: number, _deltaFrame: number): void {
        
        /*

        Direccion 0: Diagonal hacia arriba y hacia la derecha
        Direccion 1: Diagonal hacia arriba y hacia la izquierda
        Direccion 2: Diagonal hacia abajo y hacia la izquierda
        Direccion 3: Diagonal hacia abajo y hacia la derecha

        */


        if(this.logo.x == Math.trunc(index.screenWidth - this.logo.width) || this.logo.x == 0 ||
            this.logo.y == Math.trunc(index.screenHeight - this.logo.height) || this.logo.y == 0){
            if(this.logo.x == Math.trunc(index.screenWidth - this.logo.width) && this.direccion == 0){
                this.direccion = 1;
            }else if(this.logo.x == Math.trunc(index.screenWidth - this.logo.width) && this.direccion == 3){
                this.direccion = 2;
            }else if (this.logo.x == 0 && this.direccion == 1){
                this.direccion = 0;
            }else if (this.logo.x == 0 && this.direccion == 2){
                this.direccion = 3;
            }else if(this.logo.y == Math.trunc(index.screenHeight - this.logo.height) && this.direccion == 2){
                this.direccion = 1;
            }else if(this.logo.y == Math.trunc(index.screenHeight - this.logo.height) && this.direccion == 3){
                this.direccion = 0;
            }else if(this.logo.y == 0 && this.direccion == 0){
                this.direccion = 3;
            }else if(this.logo.y == 0 && this.direccion == 1){
                this.direccion = 2;
            }
        }

        this.moverContainer(this.logo, this.direccion);

        //Maquina de lag
        /*for(let index = 0; index < 150000000; index++){
            1+1;
        }*/

    }

    private moverContainer(container : Container, direccion: Number): void{
        switch (direccion){
            case 0:
                container.x++;
                container.y--;
                break;
            case 1:
                container.x--;
                container.y--;
                break;
            case 2:
                this.logo.x--;
                this.logo.y++;
                break;
            case 3:
                this.logo.x++;
                this.logo.y++;
                break;
        }

    }
}