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
		if (this.rotaionDirection.isNoneX && this.rotation.x) {
			if (this.rotation.x > 0) {
				if (this.rotation.x < ROTATION_FORCE) {
					this.rotation.x = 0;
				} else {
					this.rotateRight();
				}
			} else if (this.rotation.x < 0) {
				if (this.rotation.x > -ROTATION_FORCE) {
					this.rotation.x = 0;
				} else {
					this.rotateLeft();
				}
			}
		}

		if (this.rotaionDirection.isNoneZ && this.rotation.z) {
			if (this.rotation.z > 0) {
				if (this.rotation.z < ROTATION_FORCE) {
					this.rotation.z = 0;
				} else {
					this.rotateBackward();
				}
			} else if (this.rotation.z < 0) {
				if (this.rotation.z > -ROTATION_FORCE) {
					this.rotation.z = 0;
				} else {
					this.rotateForward();
				}
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
