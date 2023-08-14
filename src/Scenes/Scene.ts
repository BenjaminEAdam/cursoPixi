import { Container} from "pixi.js";
import { IActualizable } from "../Utils/IActualizable";
import { LogoDeCarga } from "./LogoDeCarga";
import { index } from "..";
import { Player } from "../Game/Player";
import { Plataform } from "../Game/Plataform";
import { checkCollision } from "../Game/IHitbox";

export class Scene extends Container implements IActualizable{

    private physicsLogo: LogoDeCarga;
    private playerSolider: Player;
    private plataforms: Plataform[];

    constructor(){
        super();

        this.plataforms = [];

        const plataforma1 = new Plataform("plataforma");
        plataforma1.position.set(350, 500);
        plataforma1.scale.set(0.1, 0.1);
        this.addChild(plataforma1);
        this.plataforms.push(plataforma1);

        const plataforma2 = new Plataform("plataforma");
        plataforma2.position.set(850, 400);
        plataforma2.scale.set(0.1, 0.1);
        this.addChild(plataforma2);
        this.plataforms.push(plataforma2);

        const piso = new Plataform("piso");
        piso.position.set(0, 705);
        piso.scale.set(0.43, 0.43);
        this.addChild(piso);
        this.plataforms.push(piso);

        this.playerSolider = new Player();
        this.playerSolider.position.set(100, 580);
        this.playerSolider.pivot.set(Math.trunc(this.playerSolider.width)/3, 0);
        this.addChild(this.playerSolider);

        this.physicsLogo = new LogoDeCarga();
        this.physicsLogo.position.set(1200, 650);
        this.physicsLogo.scale.set(0.5, 0.5);
        this.addChild(this.physicsLogo);

    }

    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.playerSolider.update(deltaTime/2);
        this.physicsLogo.update(deltaTime/2);
        
        /*
        console.log("Personaje y Piso1", checkCollision(this.playerSolider, this.plataforms[0]));
        console.log("Personaje y Piso2", checkCollision(this.playerSolider, this.plataforms[1]));
        console.log("Logo y Piso1", checkCollision(this.physicsLogo, this.plataforms[0]));
        console.log("Logo y Piso2", checkCollision(this.physicsLogo, this.plataforms[1]));
        console.log("Personaje y Logo", checkCollision(this.physicsLogo, this.playerSolider));
        */

        let countExitPlat = 0;
        for (let plataform of this.plataforms){
            const overlap = checkCollision(this.playerSolider, plataform);
            if( overlap != null){
                this.playerSolider.separate(overlap, plataform.position);
            }else{
                countExitPlat++;
            }
        }
        // Si está fuera de TODAS las plataformas entonces está fuera de plataforma.
        if(countExitPlat==this.plataforms.length){
            this.playerSolider.inPlataform = false;
        }

        // Player
        
        if(this.playerSolider.x >= (index.screenWidth - 2*(this.playerSolider.width/3))){
            this.playerSolider.x = index.screenWidth - 2*(this.playerSolider.width/3);
        }
        if(this.playerSolider.x <= 0 - 2*(this.playerSolider.width/3)){
            this.playerSolider.x = 0 - 2*(this.playerSolider.width/3);
        }
        if(this.playerSolider.y <= 0){
            this.playerSolider.y = 0;
        }

        //Logo
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

        this.playerSolider.update(deltaTime/2);
        this.physicsLogo.update(deltaTime/2);

    }
}