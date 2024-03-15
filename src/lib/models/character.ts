import MovementState from "./rotaionDirection";
import { ROTATION_FORCE } from "./world/constants";
import Entity from "./world/entity";

export default class Character extends Entity {
	movementState: "walking" | "idle" | "flying" = "flying";
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
			const xAbs = Math.abs(this.rotation.x);

			if (xAbs < ROTATION_FORCE || Math.PI - xAbs < ROTATION_FORCE) {
				this.rotation.x = 0;
			} else {
				if (this.rotation.x > 0) {
					this.rotateRight();
				} else {
					this.rotateLeft();
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
