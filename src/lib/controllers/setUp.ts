import Character from "$lib/models/character";
import Controls from "$lib/models/world/controls";
import Entity from "$lib/models/world/entity";
import World from "$lib/models/world/world";
import { AmbientLight, Color, DirectionalLight } from "three";
import { setCharacterKeyBindings, setKeyBindings } from "./keyBindings";

const world = new World();
world.scene.background = new Color("skyblue");

const controls = new Controls(world.camera, document.body);
world.eventHandler.onClick(() => controls.lock());

const ambientLight = new AmbientLight("white", 10);
ambientLight.position.set(0, 100, 10);
world.add(ambientLight);

const light = new DirectionalLight("white", 10);
light.position.set(10, 10, 10);
world.add(light);

const character = new Character();
character.load();
world.add(character);
world.onTick(() => character.render(world));

setKeyBindings(world.eventHandler);
setCharacterKeyBindings(character, world.eventHandler);

const buildings = new Entity();
buildings.load("futuristic_building");
buildings.position.set(-15, -15, -15);
buildings.scale.addScalar(30);
world.add(buildings);

window.addEventListener("resize", () => world.resize());

export const createWorld = (el: HTMLElement) => {
	world.create(el);
	return world;
};
