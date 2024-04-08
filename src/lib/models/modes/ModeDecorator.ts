import type { ModeStrategy } from "$lib/utils/types";
import { wait } from "../../utils/helpers";
import Character from "../character";
import World from "../world/world";

export default class ModeDecorator implements ModeStrategy {
	child: ModeStrategy;
	finish: (val: boolean) => void;
	private isReady: () => Promise<boolean>;

	constructor(child: ModeStrategy) {
		this.child = child;
		this.finish = () => false;
		this.isReady = () => wait(false);
	}

	start(character: Character) {
		this.isReady = () => this.child.start(character);

		return new Promise<boolean>((resolve) => {
			this.finish = resolve;
		});
	}

	stop(character: Character) {
		this.isReady = () => this.child.stop(character);

		return new Promise<boolean>((resolve) => {
			this.finish = resolve;
		});
	}

	render(world: World, character: Character) {
		this.isReady().then((isReady) => {
			if (isReady) {
				this.finish(true);
			} else {
				this.child.render(world, character);
			}
		});
	}
}
