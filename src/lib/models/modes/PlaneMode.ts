import { Matrix4, Quaternion, Vector3 } from "three";
import { easeOutQuad } from "../../../utils/helpers";
import * as types from "../../../utils/types";
import Character from "../character";
import { fov, INTERPOLATION_FACTOR, MAX_VELOCITY, VELOCITY } from "../world/constants";
import World from "../world/world";

const pos = new Vector3(0, 3, 7);
const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
let jawVelocity = 0;
let turbo = 0;
let pitchVelocity = 0;
let speed = 0.06;
const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export default class PlaneMode implements types.ModeStrategy {
	start(character: Character) {
		character.object.rotateX(-Math.PI / 2);
	}

	stop(character: Character) {
		character.object.rotateX(Math.PI / 2);
	}

	update(world: World, character: Character) {
		jawVelocity *= 0.95;
		pitchVelocity *= 0.95;

		if (Math.abs(jawVelocity) > MAX_VELOCITY) {
			jawVelocity = Math.sign(jawVelocity) * MAX_VELOCITY;
		}
		if (Math.abs(pitchVelocity) > MAX_VELOCITY) {
			pitchVelocity = Math.sign(pitchVelocity) * MAX_VELOCITY;
		}

		if (character.context.controls.a) {
			jawVelocity += VELOCITY;
		} else if (character.context.controls.d) {
			jawVelocity -= VELOCITY;
		}
		if (character.context.controls.s) {
			pitchVelocity += VELOCITY;
		} else if (character.context.controls.w) {
			pitchVelocity -= VELOCITY;
		}

		if (character.context.controls.r) {
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

		if (character.context.controls.shift) {
			turbo += VELOCITY;
		} else {
			turbo *= 0.9;
		}
		turbo = Math.min(Math.max(turbo, 0), 1);

		let turboSpeed = easeOutQuad(turbo) * 0.04;
		world.camera.fov = fov + turboSpeed * 900;
		world.camera.updateProjectionMatrix();

		pos.add(z.clone().multiplyScalar(-speed - turboSpeed * 4));
	}

	render(world: World, character: Character) {
		const rotMatrix = new Matrix4().makeBasis(x, y, z);

		const matrix = new Matrix4().multiply(new Matrix4().makeTranslation(pos)).multiply(rotMatrix);
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
			.multiply(new Matrix4().makeTranslation(pos))
			.multiply(delayedRotMatrix)
			.multiply(new Matrix4().makeRotationX(-0.2))
			.multiply(new Matrix4().makeTranslation(0, 1, 2.5));

		world.camera.matrixAutoUpdate = false;
		world.camera.matrix.copy(cameraMatrix);
		world.camera.matrixWorldNeedsUpdate = true;

		this.update(world, character);
	}
}
