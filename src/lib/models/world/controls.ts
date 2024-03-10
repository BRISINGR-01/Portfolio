// import { Camera } from "three";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

// export default class Controls extends PointerLockControls {
// 	constructor(camera: Camera, el: HTMLElement) {
// 		super(camera, el);
// 	}

// 	on(event: "lock" | "unlock", listener: () => void) {
// 		this.addEventListener(event, listener);
// 	}
// }
import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Controls extends OrbitControls {
	constructor(camera: Camera, el: HTMLElement) {
		super(camera, el);
	}

	on(event: "lock" | "unlock", listener: () => void) {
		this.addEventListener(event, listener);
	}
}
