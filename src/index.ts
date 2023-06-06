import { Application, Assets, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

window.addEventListener("resize", ()=>{
	console.log("resize done");
	
	const scaleWidth = Math.round(window.innerWidth / app.screen.width);
	const scaleHeight = Math.round(window.innerHeight/app.screen.height);
	const scaleScreen = Math.min(scaleWidth, scaleHeight);

	const gameWhidth = Math.round(app.screen.width * scaleScreen);
	const gameHeight = Math.round(app.screen.height * scaleScreen);

	//const marginVertical = Math.floor((window.innerWidth - gameWhidth)/2);
	//const marginHorizontal = Math.floor((window.innerHeight - gameHeight)/2);

	if(app.view.style){
		app.view.style.width = gameWhidth + "px";
		app.view.style.height = gameHeight + "px";
	}

	


});
window.dispatchEvent(new Event("resize"));


Assets.add("clampy", "./clampy.png");
Assets.add("pixi", "./pixi.png");
Assets.add("militar", "./militar.png");
Assets.add("mortero", "./mortero.png");

Assets.load(["clampy", "pixi", "militar", "mortero"]).then(() => {
	
	const mortero: Sprite = Sprite.from("mortero");
	const militar: Sprite = Sprite.from("militar");
	//const pixi: Sprite = Sprite.from("pixi");
	//const clampy: Sprite = Sprite.from("clampy.png");
	
	console.log("Hola mundo!", militar.width, militar.height);
	console.log("Hola mundo!", mortero.width, mortero.height);
	
	militar.x = 120;
	militar.y = 140;

	mortero.x = 425;
	mortero.y = 165;
	mortero.angle = 38;

	mortero.scale.set(0.1, 0.1);

	app.stage.addChild(militar);
	app.stage.addChild(mortero);
});