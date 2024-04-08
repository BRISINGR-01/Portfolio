import type { ModeStrategy } from "$lib/utils/types";
import { ModeType } from "../utils/enums";
import Context from "./context";
import Controls from "./Controls";
import ModeDecorator from "./modes/ModeDecorator";
import PlaneMode from "./modes/PlaneMode";
import WalkMode from "./modes/WalkMode";
import Entity from "./world/entity";
import World from "./world/world";

export default class Character extends Entity {
	context: Context = new Context();

	private mode: ModeStrategy = new WalkMode();
	controls = new Controls();
	object: Entity = new Entity();

	async switchMode(modeType: ModeType) {
		if (this.mode instanceof ModeDecorator) return false;

		this.mode = new ModeDecorator(this.mode);

		this.controls.lock();
		await this.mode.stop(this);

		let mode: ModeStrategy;
		switch (modeType) {
			case ModeType.Flying:
				mode = new PlaneMode();
				break;
			case ModeType.Walking:
				mode = new WalkMode();
				break;
		}

		this.context.ModeState = modeType;

		this.mode = new ModeDecorator(mode);

		await this.mode.start(this);
		this.controls.unlock();

		this.mode = mode;

		return true;
	}

	async load() {
		this.add(this.object);
		const wings = await this.object.load("wings");
		const outfit = await this.object.load("outfit");
		outfit.rotateY(Math.PI);
		outfit.position.setY(-1);
		wings.position.set(0.2, 0.3, 0.2);
		wings.rotateY(-Math.PI / 2);
		wings.rotateZ(-Math.PI / 2);

		return this;
	}

	render(world: World) {
		this.mode.render(world, this);
	}
}
