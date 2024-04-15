import Character from "$lib/models/character";
import DataWrapper from "$lib/models/data/DataWrapper";
import SVGEntity from "$lib/models/data/SVGEntity";
import Text from "$lib/models/data/Text";
import Entity from "$lib/models/world/entity";
import World from "$lib/models/world/world";
import { AmbientLight, Cache, Color, DirectionalLight, Euler, Vector3 } from "three";
import { EventType, ModeType } from "../utils/enums";
import { setCharacterKeyBindings, setKeyBindings } from "./keyBindings";

const loaders: Promise<any>[] = [];

Cache.enabled = true;

const world = new World();
world.scene.background = new Color("skyblue");

const ambientLight = new AmbientLight("white", 10);
ambientLight.position.set(0, 100, 10);
world.add(ambientLight);

const light = new DirectionalLight("white", 1);
light.position.set(10, 10, 10);
world.add(light);


const directionalLight = new DirectionalLight(0xffffff, 1)
directionalLight.position.z = 3
world.add(directionalLight)

const character = new Character();
loaders.push(character.load());
character.switchMode(ModeType.Flying);
character.position.setZ(2);
world.add(character);

world.eventHandler.on(EventType.SwitchMode, (data: ModeType) => character.switchMode(data));
world.onTick(() => character.render(world));

setKeyBindings(world.eventHandler);
setCharacterKeyBindings(character, world.eventHandler);

const buildings = new Entity();
loaders.push(buildings.load("futuristic_building"));
buildings.position.set(-45, -15, -15);
buildings.scale.addScalar(30);
world.add(buildings);

window.addEventListener("resize", () => world.resize());

const data = new DataWrapper();
const langCoordinates = [
	{
		position: new Vector3(0, 1, 0),
		rotation: new Euler(Math.PI, 0, 0)
	},
	{
		position: new Vector3(1.5, 1, 0),
		rotation: new Euler(Math.PI, 0, 0)
	},
	{
		position: new Vector3(3, 1, 0),
		rotation: new Euler(Math.PI, 0, 0)
	},
	{
		position: new Vector3(0, 2, 0),
		rotation: new Euler(Math.PI, 0, 0)
	},
	{
		position: new Vector3(1.5, 2, 0),
		rotation: new Euler(Math.PI, 0, 0)
	},
	{
		position: new Vector3(3, 2, 0),
		rotation: new Euler(Math.PI, 0, 0)
	},
	{
		position: new Vector3(4.5, 2, 0),
		rotation: new Euler(Math.PI, 0, 0)
	},
]

for (let i = 0; i < data.languages.length; i++) {
	const svg = new SVGEntity();
	loaders.push(svg.load(data.languages[i].image!).then(() => {
		svg.scale.multiplyScalar(0.1);
		svg.rotation.copy(langCoordinates[i].rotation);
		svg.position.copy(langCoordinates[i].position);
		svg.scale.y *= - 1;
	}));
	world.add(svg);
}

const text = new Text()
loaders.push(text.load("Languages"))
text.position.set(2, 2.5, 0)
text.scale.multiplyScalar(0.3);
world.add(text);

const languages = data.data.entities.filter(el => el.type === "language")
for (let i = 0; i < languages.length; i++) {
	const svg = new SVGEntity();
	loaders.push(svg.load(languages[i].image!).then(() => {
		svg.scale.multiplyScalar(0.1);
		svg.rotateX(Math.PI / 2);
		svg.position.set(3 * i, 0, 0);
	}));
	world.add(svg);
}

loaders.push(new Promise((res) => {
	setTimeout(res, 1300);
}))

export const createWorld = (el: HTMLElement) => {
	return Promise.allSettled(loaders).then(() => {
		world.create(el);
		return world;
	})
};
