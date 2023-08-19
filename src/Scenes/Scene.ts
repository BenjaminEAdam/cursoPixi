import { Container, Texture, TilingSprite} from "pixi.js";
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
    private world: Container;
    private background: TilingSprite;

    constructor(){
        super();

        this.world = new Container();
        this.background = new TilingSprite(Texture.from("fondoCiudad"), 1920, 696);
        this.addChild(this.background);

        this.plataforms = [];

        let plataforma = new Plataform("plataforma_piedra");
        plataforma.position.set(400, 450);
        plataforma.scale.set(0.1, 0.1);
        this.world.addChild(plataforma);
        this.plataforms.push(plataforma);

        plataforma = new Plataform("plataforma_piedra");
        plataforma.position.set(900, 350);
        plataforma.scale.set(0.1, 0.1);
        this.world.addChild(plataforma);
        this.plataforms.push(plataforma);

        plataforma = new Plataform("plataforma_piedra");
        plataforma.position.set(1200, 300);
        plataforma.scale.set(0.1, 0.1);
        this.world.addChild(plataforma);
        this.plataforms.push(plataforma);

        let piso = new Plataform("piso_piedra");
        piso.position.set(0, 630);
        this.world.addChild(piso);
        this.plataforms.push(piso);

        piso = new Plataform("piso_piedra");
        piso.position.set(1908, 630);
        this.world.addChild(piso);
        this.plataforms.push(piso);

        piso = new Plataform("piso_piedra");
        piso.position.set(-1908, 630);
        this.world.addChild(piso);
        this.plataforms.push(piso);

        this.playerSolider = new Player();
        this.playerSolider.position.set(100, 500);
        this.playerSolider.pivot.set(Math.trunc(this.playerSolider.width)/3, 0);
        this.world.addChild(this.playerSolider);

        this.physicsLogo = new LogoDeCarga();
        this.physicsLogo.position.set(1200, 650);
        this.physicsLogo.scale.set(0.5, 0.5);
        this.world.addChild(this.physicsLogo);

        this.addChild(this.world);

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
            //plataform.speed.x = -100;
            //plataform.update(deltaTime/1000);
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
        
        /*if(this.playerSolider.x >= (index.screenWidth - 2*(this.playerSolider.width/3))){
            this.playerSolider.x = index.screenWidth - 2*(this.playerSolider.width/3);
        }
        if(this.playerSolider.x <= 0 - 2*(this.playerSolider.width/3)){
            this.playerSolider.x = 0 - 2*(this.playerSolider.width/3);
        }*/
        if(this.playerSolider.y <= -25){
            this.playerSolider.y = -25;
            this.playerSolider.speed.y=0;
        }

        //Efecto parallax
        this.world.x = -this.playerSolider.x * this.worldTransform.a + index.screenWidth/4;
        this.background.tilePosition.x = this.world.x * 0.5;
        this.background.y = -this.playerSolider.y * 0.1;

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