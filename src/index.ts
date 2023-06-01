import { Application, Assets, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1960,
	height: 1080
});

Assets.add("clampy", "./clampy.png");
Assets.add("pixi", "./pixi.png");

Assets.load(["clampy", "pixi"]).then(() => {
	
	const pixi: Sprite = Sprite.from("pixi");
	//const clampy: Sprite = Sprite.from("clampy.png");
	
	console.log("Hola mundo!", pixi.width, pixi.height);

	pixi.anchor.set(0.5);
	
	pixi.x = app.screen.width / 2;
	pixi.y = app.screen.height / 2;

	app.stage.addChild(pixi);
});