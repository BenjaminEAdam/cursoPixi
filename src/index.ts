import { Application, Assets } from 'pixi.js'
import { Scene } from './Scene';
//import { assets } from './assets';

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

//Assets.add(assets[0][0], assets[0][1]);
//Assets.add(assets[1][0], assets[1][1]);

Assets.load(["militar", "mortero"]).then(() => {
	const myScene = new Scene;
	app.stage.addChild(myScene);
});