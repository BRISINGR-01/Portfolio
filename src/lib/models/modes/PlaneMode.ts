import type { ModeStrategy } from "$lib/utils/types";
import { Matrix4, Quaternion, Vector3 } from "three";
import { easeOutQuad, wait } from "../../utils/helpers";
import Character from "../character";
import { fov, INTERPOLATION_FACTOR, MAX_VELOCITY, VELOCITY } from "../world/constants";
import World from "../world/world";

const originalValues = {
	x: new Vector3(1, 0, 0),
	y: new Vector3(0, 1, 0),
	z: new Vector3(0, 0, 1)
};

const x = originalValues.x.clone();
const y = originalValues.y.clone();
const z = originalValues.z.clone();
let jawVelocity = 0;
let turbo = 0;
let pitchVelocity = 0;
let speed = 0.05;
const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export default class PlaneMode implements ModeStrategy {
	private isRestarted() {
		let isReady = true;
		for (const [v, o] of [
			[x, originalValues.x],
			[y, originalValues.y],
			[z, originalValues.z]
		]) {
			if (v.distanceTo(o) < 0.1) continue;

			const dif = o.clone().sub(v).multiplyScalar(0.1);

			v.add(dif);
			v.normalize();

			isReady = false;
		}

		return isReady;
	}

	start(character: Character) {
		const isReady = true || this.isRestarted();
		character.object.rotateX(-VELOCITY * 3);

		if (character.object.rotation.x <= -Math.PI / 2) {
			character.object.rotation.x = -Math.PI / 2;
			return wait(isReady);
		}

		return wait(false);
	}

	stop(character: Character) {
		// jawVelocity = 0;
		// pitchVelocity = 0;
		let isReady = true || this.isRestarted();

		if (Math.abs(z.z) < 0.99) {
			// 	x.applyAxisAngle(z, jawVelocity);
			// y.applyAxisAngle(z, jawVelocity);
			z.applyAxisAngle(x, z.z > 0 ? 0.3 : -0.004);
			y.applyAxisAngle(x, z.z > 0 ? 0.3 : -0.004);
			isReady = false;
		}
		character.object.rotateX(VELOCITY * 3);

		if (character.object.rotation.x >= 0) {
			character.object.rotation.x = 0;
			return wait(isReady);
		}

		return wait(false);
	}

	update(world: World, character: Character) {
		// console.log("x", x.x, x.y, x.z);
		// console.log("y", y.x, y.y, y.z);
		// console.log("z", z.x, z.y, z.z);
		console.log("z", z.z);
		jawVelocity *= 0.95;
		pitchVelocity *= 0.95;

		if (Math.abs(jawVelocity) > MAX_VELOCITY) {
			jawVelocity = Math.sign(jawVelocity) * MAX_VELOCITY;
		}
		if (Math.abs(pitchVelocity) > MAX_VELOCITY) {
			pitchVelocity = Math.sign(pitchVelocity) * MAX_VELOCITY;
		}

		if (character.controls.a) {
			jawVelocity += VELOCITY;
		} else if (character.controls.d) {
			jawVelocity -= VELOCITY;
		}
		if (character.controls.s) {
			pitchVelocity += VELOCITY;
		} else if (character.controls.w) {
			pitchVelocity -= VELOCITY;
		}

		x.applyAxisAngle(z, jawVelocity);
		y.applyAxisAngle(z, jawVelocity);
		z.applyAxisAngle(x, pitchVelocity);
		y.applyAxisAngle(x, pitchVelocity);

		x.normalize();
		y.normalize();
		z.normalize();

		if (character.controls.shift) {
			turbo += VELOCITY;
		} else {
			turbo *= 0.9;
		}
		turbo = Math.min(Math.max(turbo, 0), 1);

		let turboSpeed = easeOutQuad(turbo) * 0.04;
		world.camera.fov = fov + turboSpeed * 900;
		world.camera.updateProjectionMatrix();

		character.position.add(z.clone().multiplyScalar(-speed - turboSpeed * 4));
	}

	render(world: World, character: Character) {
		this.update(world, character);

		const rotMatrix = new Matrix4().makeBasis(x, y, z);

		const matrix = new Matrix4().multiply(new Matrix4().makeTranslation(character.position)).multiply(rotMatrix);
		character.matrixAutoUpdate = false;
		character.matrix.copy(matrix);
		character.matrixWorldNeedsUpdate = true;

		const quaternionA = new Quaternion().copy(delayedQuaternion);
		const quaternionB = new Quaternion();
		quaternionB.setFromRotationMatrix(rotMatrix);

		const interpolationQuaternion = new Quaternion().copy(quaternionA);
		interpolationQuaternion.slerp(quaternionB, INTERPOLATION_FACTOR);
		delayedQuaternion.copy(interpolationQuaternion);

		delayedRotMatrix.identity();
		delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

		const cameraMatrix = new Matrix4()
			.multiply(new Matrix4().makeTranslation(character.position))
			.multiply(delayedRotMatrix)
			.multiply(new Matrix4().makeRotationX(-0.2))
			.multiply(new Matrix4().makeTranslation(0, 1, 2.5));

		world.camera.matrixAutoUpdate = false;
		world.camera.matrix.copy(cameraMatrix);
		world.camera.matrixWorldNeedsUpdate = true;
	}
}