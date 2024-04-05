// import { ModeStrategy } from "../../../utils/types";
import * as types from "../../../utils/types";
import Character from "../character";
import World from "../world/world";

export default class Idle implements types.ModeStrategy {
	start(character: Character) {}
	update(world: World, character: Character) {}
	render(world: World, character: Character) {}
	stop(character: Character) {}
}
