import Character from "$lib/models/character";
import World from "$lib/models/world/world";

export type Func = () => void;

export interface ModeStrategy {
	start(character: Character): Promise<boolean>;
	stop(character: Character): Promise<boolean>;
	render(world: World, character: Character): void;
}
