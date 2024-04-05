import { Matrix4, Quaternion, Vector3 } from "three";
import { easeOutQuad } from "../../utils/helpers";
import Camera from "./world/camera";
import { fov } from "./world/constants";
import Entity from "./world/entity";
import World from "./world/world";

const pos = new Vector3(0, 3, 7);
const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
let jawVelocity = 0;
let turbo = 0;
let pitchVelocity = 0;
let speed = 0.06;
const VELOCITY = 0.02;
const interpolationFactor = 0.175;
const maxVeolcity = 0.02;
const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export default class Character extends Entity {
	controls = { a: false, s: false, w: false, d: false, r: false, shift: false };
	movementState: "walking" | "idle" | "flying" = "flying";

	constructor() {
		super();
	}

	async load() {
		await super.load("wings");
		this.children[0].rotateY(-Math.PI / 2);
	}

	updateAxis(camera: Camera) {
		jawVelocity *= 0.95;
		pitchVelocity *= 0.95;

		if (Math.abs(jawVelocity) > maxVeolcity) {
			jawVelocity = Math.sign(jawVelocity) * maxVeolcity;
		}
		if (Math.abs(pitchVelocity) > maxVeolcity) {
			pitchVelocity = Math.sign(pitchVelocity) * maxVeolcity;
		}

		if (this.controls.a) {
			jawVelocity += VELOCITY;
		} else if (this.controls.d) {
			jawVelocity -= VELOCITY;
		}
		if (this.controls.s) {
			pitchVelocity += VELOCITY;
		} else if (this.controls.w) {
			pitchVelocity -= VELOCITY;
		}

		if (this.controls.r) {
			jawVelocity = 0;
			pitchVelocity = 0;
			turbo = 0;
			x.set(1, 0, 0);
			y.set(0, 1, 0);
			z.set(0, 0, 1);
			pos.set(0, 3, 7);
		}

		x.applyAxisAngle(z, jawVelocity);
		y.applyAxisAngle(z, jawVelocity);
		z.applyAxisAngle(x, pitchVelocity);
		y.applyAxisAngle(x, pitchVelocity);

		x.normalize();
		y.normalize();
		z.normalize();

		if (this.controls.shift) {
			turbo += 0.025;
		} else {
			turbo *= 0.9;
		}
		turbo = Math.min(Math.max(turbo, 0), 1);
		// console.log(turbo);

		let turboSpeed = easeOutQuad(turbo) * 0.04;
		camera.fov = fov + turboSpeed * 900;
		camera.updateProjectionMatrix();

		pos.add(z.clone().multiplyScalar(-speed - turboSpeed));
	}

	render(world: World) {
		const rotMatrix = new Matrix4().makeBasis(x, y, z);

		const matrix = new Matrix4().multiply(new Matrix4().makeTranslation(pos)).multiply(rotMatrix);
		this.matrixAutoUpdate = false;
		this.matrix.copy(matrix);
		this.matrixWorldNeedsUpdate = true;

		const quaternionA = new Quaternion().copy(delayedQuaternion);
		const quaternionB = new Quaternion();
		quaternionB.setFromRotationMatrix(rotMatrix);

		const interpolationQuaternion = new Quaternion().copy(quaternionA);
		interpolationQuaternion.slerp(quaternionB, interpolationFactor);
		delayedQuaternion.copy(interpolationQuaternion);

		delayedRotMatrix.identity();
		delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

		const cameraMatrix = new Matrix4()
			.multiply(new Matrix4().makeTranslation(pos))
			.multiply(delayedRotMatrix)
			.multiply(new Matrix4().makeRotationX(-0.2))
			.multiply(new Matrix4().makeTranslation(0, 0.5, 3));

		world.camera.matrixAutoUpdate = false;
		world.camera.matrix.copy(cameraMatrix);
		world.camera.matrixWorldNeedsUpdate = true;

		this.updateAxis(world.camera);
	}
}
