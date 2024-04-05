import Character from "$lib/models/character";
import World from "$lib/models/world/world";

export type Func = () => void;

export interface ModeStrategy {
	start: (character: Character) => void;
	update: (world: World, character: Character) => void;
	render: (world: World, character: Character) => void;
	stop: (character: Character) => void;
}
