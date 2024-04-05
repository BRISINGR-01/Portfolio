export default class ModeState {
	private x: number = 0;
	private z: number = 0;

	get isNone() {
		return this.isNoneX && this.isNoneZ;
	}

	get isNoneX() {
		return this.x === 0;
	}

	get isNoneZ() {
		return this.z === 0;
	}

	clearX() {
		this.x = 0;
	}

	clearZ() {
		this.z = 0;
	}

	get isRight() {
		return this.x > 0;
	}

	setRight() {
		this.x = 1;
	}

	get isLeft() {
		return !this.isRight;
	}

	setLeft() {
		this.x = -1;
	}

	get isForward() {
		return this.z > 0;
	}

	setForward() {
		this.z = 1;
	}

	get isBackward() {
		return !this.isForward;
	}

	setBackward() {
		this.z = -1;
	}
}
