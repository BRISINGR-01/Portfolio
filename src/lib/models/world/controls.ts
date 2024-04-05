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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Camera from "./camera";

export default class Controls extends OrbitControls {
	constructor(camera: Camera, el: HTMLElement) {
		super(camera, el);
	}

	on(event: "lock" | "unlock", listener: () => void) {
		this.addEventListener(event, listener);
	}

	lock() {}
}
