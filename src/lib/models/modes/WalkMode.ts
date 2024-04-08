import type { ModeStrategy } from "$lib/utils/types";
import { wait } from "../../utils/helpers";
import Character from "../character";
import World from "../world/world";

export default class WalkMode implements ModeStrategy {
	restart() {}
	start(character: Character) {
		return wait(true);
	}
	stop(character: Character) {
		return wait(true);
	}
	render(world: World, character: Character) {}
}
