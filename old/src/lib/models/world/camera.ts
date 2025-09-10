import { PerspectiveCamera } from "three";
import { aspect, far, fov, near } from "./constants";

export default class Camera extends PerspectiveCamera {
	constructor() {
		super(fov, aspect, near, far);
		this.position.y = 2;
		this.position.z = 0;
		this.position.x = 0;
		this.lookAt(0, 0, 0);
	}
}
