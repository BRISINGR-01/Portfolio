import { Camera, Event, EventListener } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export default class Controls extends PointerLockControls {
	constructor(camera: Camera, el: HTMLElement) {
		super(camera, el);
	}

	on(event: "lock" | "unlock", listener: EventListener<Event, "lock" | "unlock", this>) {
		this.addEventListener(event, listener);
	}
}
