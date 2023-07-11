import { Text, AnimatedSprite, Container, Graphics, Texture} from "pixi.js";
import { MilitarDisparando } from "../Game/MilitarDisparando";
import { UserInterfaceButton } from "./UserInterfaceButton";
import { UserInterfaceKeyboard } from "./UserInterfaceKeyboard";

export class Scene extends Container{


    constructor(){
        super();

        const militarDisparando: MilitarDisparando = new MilitarDisparando();

        militarDisparando.scale.set(0.3,0.3);
        militarDisparando.position.set(-50, 575);
        militarDisparando.angle = -5;

        this.addChild(militarDisparando);

        const morteroAnimated: AnimatedSprite = new AnimatedSprite(
            [
                Texture.from("morteroPosicion1"),
                Texture.from("morteroPosicion2"),
                Texture.from("morteroPosicion3"),
                Texture.from("morteroPosicion4"),
                Texture.from("morteroPosicion5"),
                Texture.from("morteroPosicion6"),
                Texture.from("morteroPosicion7"),
                Texture.from("morteroPosicion8"),
            ], true
        );

        morteroAnimated.play();
        morteroAnimated.animationSpeed = 0.17;
        morteroAnimated.scale.set(0.075, 0.075);
        morteroAnimated.position.set(1175,610);
        this.addChild(morteroAnimated);

        const myCircle = new Graphics();
        myCircle.lineStyle({color: 0xDD0000, width: 5, alpha:1});
        myCircle.drawCircle(0,0,50);
        myCircle.position.set(1210, 650);
        this.addChild(myCircle);

        const myCruz = new Graphics();
        myCruz.lineStyle({color: 0xDD0000, width: 5, alpha:0.25});
        myCruz.moveTo(0,0)
        myCruz.lineTo(100,0);
        myCruz.moveTo(50,50)
        myCruz.lineTo(50,-50);
        myCruz.position.set(1160, 650);
        this.addChild(myCruz);

        const myText = new Text("Cargando...", {fontSize:40, fill: 0xEEEEEE, fontFamily:"Arial"});
        myText.position.set(925, 650);
        this.addChild(myText);

        const userInterfaceButton = new UserInterfaceButton();
        userInterfaceButton.position.set(100,10);
        this.addChild(userInterfaceButton);

        const userInterfaceKeyboard = new UserInterfaceKeyboard();
        userInterfaceKeyboard.position.set(600, 10);
        this.addChild(userInterfaceKeyboard);

    }
}