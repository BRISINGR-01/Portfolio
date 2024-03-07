import { load } from "$lib/models/world/utils";
import World from "$lib/models/world/world";

const world = new World();
load("wings").then((obj) => {
	if (obj.ok) world.add(obj.val);
});

window.addEventListener("resize", world.resize);

export const createScene = (el: HTMLCanvasElement) => {
	world.create(el);
};
