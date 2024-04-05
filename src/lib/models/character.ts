import { ModeType } from "../../utils/enums";
import * as types from "../../utils/types";
import Context from "./context";
import Idle from "./modes/IdleMode";
import PlaneMode from "./modes/PlaneMode";
import WalkMode from "./modes/WalkMode";
import Entity from "./world/entity";
import World from "./world/world";

export default class Character extends Entity {
	context: Context = new Context();
	mode: types.ModeStrategy = new Idle();
	object: Entity = new Entity();

	switchMode(ModeState: ModeType) {
		this.mode.stop(this);
		switch (ModeState) {
			case ModeType.Flying:
				this.mode = new PlaneMode();
				break;
			case ModeType.Walking:
				this.mode = new WalkMode();
				break;

			case ModeType.Idle:
				this.mode = new Idle();
				break;
		}

		this.mode.start(this);
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
