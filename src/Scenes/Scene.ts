import { Container, Texture, TilingSprite} from "pixi.js";
import { IActualizable } from "../Utils/IActualizable";
import { Player } from "../Game/Player";
import { Plataform } from "../Game/Plataform";
import { checkCollision } from "../Game/IHitbox";
import { BoxArmed } from "../Game/BoxArmed";

export class Scene extends Container implements IActualizable{

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

        let piso = new Plataform("piso_piedra");
        piso.position.set(0, 637);
        this.world.addChild(piso);
        this.plataforms.push(piso);

        piso = new Plataform("piso_piedra");
        piso.position.set(787, 637);
        this.world.addChild(piso);
        this.plataforms.push(piso);

        this.playerSoldier = new Player();
        this.playerSoldier.position.set(400, 500);
        this.playerSoldier.pivot.set(Math.trunc(this.playerSoldier.width)/3, 0);
        this.world.addChild(this.playerSoldier);

        this.addChild(this.world);

        const caja_armada1 = new BoxArmed(1);
        caja_armada1.position.set(600,555);
        this.addChild(caja_armada1);

        const caja_armada2 = new BoxArmed(2);
        caja_armada2.position.set(800,555);
        this.addChild(caja_armada2);

    }

    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.playerSoldier.update(deltaTime/2);
        
        this.timePased += deltaTime;
        if(this.timePased>(10000*(50/this.gameSpeed))){
            this.timePased = 0;
            
            //Ir agregando obstáculos


        }

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

        const plataformsFloors = this.plataforms.filter((elem) => elem.isFloor);
        if(plataformsFloors.length == 2){
            const piso = new Plataform("piso_piedra");
            piso.position.set(1570, 637);
            this.world.addChild(piso);
            this.plataforms.push(piso);
        }

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

        this.playerSoldier.update(deltaTime/2);

    }
}