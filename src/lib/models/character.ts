import MovementState from "./rotaionDirection";
import { ROTATION_FORCE } from "./world/constants";
import Entity from "./world/entity";

export default class Character extends Entity {
	movementState: "walking" | "idle" | "flying" = "idle";
	rotaionDirection: MovementState = new MovementState();

	constructor() {
		super();
		this.onTickUpdate = this.adjustRotation.bind(this);
	}

	async load() {
		return super.load("wings");
	}

	adjustRotation() {
		if (this.rotaionDirection.isNoneX) {
			if (this.rotation.x > 0) {
				this.rotateRight();
				if (this.rotation.x < ROTATION_FORCE) this.rotation.x = 0;
			} else if (this.rotation.x < 0) {
				this.rotateLeft();
				if (this.rotation.x > -ROTATION_FORCE) this.rotation.x = 0;
			}
		}

		if (this.rotaionDirection.isNoneZ) {
			if (this.rotation.z > 0) {
				this.rotateBackward();
				if (this.rotation.z < ROTATION_FORCE) this.rotation.z = 0;
			} else if (this.rotation.z < 0) {
				this.rotateForward();
				if (this.rotation.z > -ROTATION_FORCE) this.rotation.z = 0;
			}
		}
	}

	rotateForward(f = ROTATION_FORCE) {
		this.rotateZ(f);
	}

	rotateBackward(f = ROTATION_FORCE) {
		this.rotateZ(-f);
	}

	rotateLeft(f = ROTATION_FORCE) {
		this.rotateX(f);
	}

	rotateRight(f = ROTATION_FORCE) {
		this.rotateX(-f);
	}
}
