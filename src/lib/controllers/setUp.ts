import Character from "$lib/models/character";
import Entity from "$lib/models/world/entity";
import World from "$lib/models/world/world";
import { setCharacterKeyBindings, setKeyBindings } from "./keyBindings";

const world = new World();

const character = new Character();
character.load();
world.add(character);

setKeyBindings(world.eventHandler);
setCharacterKeyBindings(character, world.eventHandler);

const buildings = new Entity();
buildings.position.setY(-2);
buildings.load("futuristic_building");
world.add(buildings);

window.addEventListener("resize", () => world.resize());

export const createScene = (el: HTMLElement) => {
	world.create(el);
};
