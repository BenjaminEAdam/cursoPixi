import { Application, Assets, Container, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
});

window.addEventListener("resize", ()=>{
	console.log("resize done");
	
	const scaleWidth = window.innerWidth / app.screen.width;
	const scaleHeight = window.innerHeight/app.screen.height;
	const scaleScreen = Math.min(scaleWidth, scaleHeight);

	const gameWhidth = Math.round(app.screen.width * scaleScreen);
	const gameHeight = Math.round(app.screen.height * scaleScreen);

	const marginVertical = Math.floor((window.innerWidth - gameWhidth)/2);
	const marginHorizontal = Math.floor((window.innerHeight - gameHeight)/2);

	const canvas = app.view as HTMLCanvasElement;

	canvas.style.width = gameWhidth + "px";
	canvas.style.height = gameHeight + "px";

	canvas.style.marginLeft = marginVertical + "px";
	canvas.style.marginRight = marginVertical + "px";

	canvas.style.marginTop = marginHorizontal + "px";
	canvas.style.marginBottom = marginHorizontal + "px";
});
window.dispatchEvent(new Event("resize"));

Assets.add("militar", "./militar.png");
Assets.add("mortero", "./mortero.png");

Assets.load(["militar", "mortero"]).then(() => {
	
	const militar: Sprite = Sprite.from("militar");
	militar.position.set(120,140);
	militar.scale.set(1.3, 1.3);
	
	const mortero: Sprite = Sprite.from("mortero");
	mortero.position.set(505,192);
	mortero.scale.set(0.1, 0.1);
	mortero.angle = 40;

	const militarDisparando: Container = new Container();
	militarDisparando.addChild(militar);
	militarDisparando.addChild(mortero);
	militarDisparando.scale.set(0.8,0.8);
	militarDisparando.position.set(-150, 75);
	militarDisparando.angle = -5;

	app.stage.addChild(militarDisparando);
});