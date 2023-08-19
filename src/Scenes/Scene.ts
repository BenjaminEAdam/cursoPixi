import { Container, Texture, TilingSprite} from "pixi.js";
import { IActualizable } from "../Utils/IActualizable";
import { LogoDeCarga } from "./LogoDeCarga";
import { index } from "..";
import { Player } from "../Game/Player";
import { Plataform } from "../Game/Plataform";
import { checkCollision } from "../Game/IHitbox";

export class Scene extends Container implements IActualizable{

    private physicsLogo: LogoDeCarga;
    private playerSoldier: Player;
    private plataforms: Plataform[];
    private world: Container;
    private background: TilingSprite;
    private gameSpeed: number = 200;
    private timePased: number = 0;

    constructor(){
        super();

        this.world = new Container();
        this.background = new TilingSprite(Texture.from("fondoCiudad"), 1920, 696);
        this.addChild(this.background);

        this.plataforms = [];

        let plataforma = new Plataform("plataforma_piedra");
        plataforma.position.set(700, 450);
        plataforma.scale.set(0.1, 0.1);
        this.world.addChild(plataforma);
        this.plataforms.push(plataforma);

        plataforma = new Plataform("plataforma_piedra");
        plataforma.position.set(1200, 300);
        plataforma.scale.set(0.1, 0.1);
        this.world.addChild(plataforma);
        this.plataforms.push(plataforma);

        let piso = new Plataform("piso_piedra");
        piso.position.set(-23, 630);
        this.world.addChild(piso);
        this.plataforms.push(piso);

        this.playerSoldier = new Player();
        this.playerSoldier.position.set(400, 500);
        this.playerSoldier.pivot.set(Math.trunc(this.playerSoldier.width)/3, 0);
        this.world.addChild(this.playerSoldier);

        this.physicsLogo = new LogoDeCarga();
        this.physicsLogo.position.set(1200, 650);
        this.physicsLogo.scale.set(0.5, 0.5);
        this.world.addChild(this.physicsLogo);

        this.addChild(this.world);

    }

    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.playerSoldier.update(deltaTime/2);
        this.physicsLogo.update(deltaTime/2);
        
        this.timePased += deltaTime;
        if(this.timePased>(10000*(50/this.gameSpeed))){
            if(this.gameSpeed<1000){
                this.gameSpeed += 25;
                this.playerSoldier.playerAnimated.animationSpeed +=0.005
            }
            this.timePased = 0;
            const plataforma = new Plataform("plataforma_piedra");
            plataforma.position.set(index.screenWidth, 300 + Math.random()*150);
            plataforma.scale.set(0.1, 0.1);
            this.world.addChild(plataforma);
            this.plataforms.push(plataforma);
        }

        const plataformsFloors = this.plataforms.filter((elem) => elem.isFloor);
        if(plataformsFloors.length == 1){
            const piso = new Plataform("piso_piedra");
            piso.position.set(1880, 630);
            this.world.addChild(piso);
            this.plataforms.push(piso);
        }

        /*
        console.log("Personaje y Piso1", checkCollision(this.playerSolider, this.plataforms[0]));
        console.log("Personaje y Piso2", checkCollision(this.playerSolider, this.plataforms[1]));
        console.log("Logo y Piso1", checkCollision(this.physicsLogo, this.plataforms[0]));
        console.log("Logo y Piso2", checkCollision(this.physicsLogo, this.plataforms[1]));
        console.log("Personaje y Logo", checkCollision(this.physicsLogo, this.playerSolider));
        */

        let countExitPlat = 0;
        for (let plataform of this.plataforms){
            plataform.speed.x = -this.gameSpeed;
            plataform.update(deltaTime/1000);
            const overlap = checkCollision(this.playerSoldier, plataform);
            if( overlap != null){
                this.playerSoldier.separate(overlap, plataform.position);
            }else{
                countExitPlat++;
            }
            // Si la plataforma sale de pantalla entonces destruirla
            if(plataform.getHitbox().right < 0){
                plataform.destroy();
            }
        }
        // Si está fuera de TODAS las plataformas entonces está fuera de plataforma.
        if(countExitPlat==this.plataforms.length){
            this.playerSoldier.inPlataform = false;
        }
        // Si la plataforma fué destruida sacarla de la lista de plataformas
        this.plataforms = this.plataforms.filter((elem) => !elem.destroyed);

        // Player
        
        /*if(this.playerSoldier.x >= (index.screenWidth - 2*(this.playerSoldier.width/3))){
            this.playerSoldier.x = index.screenWidth - 2*(this.playerSoldier.width/3);
        }
        if(this.playerSoldier.x <= 0 - 2*(this.playerSoldier.width/3)){
            this.playerSoldier.x = 0 - 2*(this.playerSoldier.width/3);
        }*/
        if(this.playerSoldier.y <= -25){
            this.playerSoldier.y = -25;
            this.playerSoldier.speed.y=0;
        }

        //Efecto parallax
        //this.world.x = -this.playerSoldier.x * this.worldTransform.a + index.screenWidth/4;
        //this.background.tilePosition.x = this.world.x * 0.5;
        this.background.tilePosition.x -= this.gameSpeed * deltaTime/3000;
        this.background.y = -this.playerSoldier.y * 0.1;

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

        this.playerSoldier.update(deltaTime/2);
        this.physicsLogo.update(deltaTime/2);

    }
}