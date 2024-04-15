import { wait } from "$lib/utils/helpers";
import type { ModeStrategy } from "$lib/utils/types";
import { Vector3 } from "three";
import type Character from "../character";
import Entity from "../world/entity";
import type World from "../world/world";

let isTurbo = false,
	thirdPerson = false;
const neck = new Entity();

export default class BirdMode implements ModeStrategy {
	start(character: Character): Promise<boolean> {
		return wait(true);
	}

	stop(character: Character): Promise<boolean> {
		return wait(true);
	}

	updateCamera(world: World, character: Character) {
		const calcIdealOffset = () => {
			const idealOffset = thirdPerson ? new Vector3(0, camY, camZ) : new Vector3(0, 3, 7);
			idealOffset.applyQuaternion(character.quaternion);
			idealOffset.add(character.position);
			return idealOffset;
		};

		const calcIdealLookat = () => {
			const idealLookat = thirdPerson ? new Vector3(0, -1.2, lookAtPosZ) : new Vector3(0, 0.5, lookAtPosZ + 5);
			idealLookat.applyQuaternion(character.quaternion);
			idealLookat.add(character.position);
			return idealLookat;
		};

		if (!activeKeysPressed.length) {
			if (character.position.y > 60 && lookAtPosZ > 5) lookAtPosZ -= 0.2;
			if (character.position.y <= 60 && lookAtPosZ < 15) lookAtPosZ += 0.2;
		}

		const idealOffset = calcIdealOffset();
		const idealLookat = calcIdealLookat();

		currentPos.copy(idealOffset);
		currentLookAt.copy(idealLookat);

		world.camera.position.lerp(currentPos, 0.14);
		world.camera.lookAt(currentLookAt);

		if (camY > 7) camY -= 0.5;
		if (camZ < -10) camZ += 0.5;
	}

	render(world: World, character: Character) {
		this.updateCamera(world, character);
		character.translateZ(isTurbo ? 1 : 0.4);

		if (character.controls.up) {
			if (character.position.y < 90) {
				character.position.y += charPosYIncrement;
				if (charPosYIncrement < 0.3) charPosYIncrement += 0.02;
				if (neck.rotation.x > -0.6) neck.rotation.x -= 0.06;
				if (charBody.rotation.x > -0.4) charBody.rotation.x -= 0.04;
			} else {
				if (neck.rotation.x < 0 || charBody.rotation.x < 0) {
					character.position.y += charPosYIncrement;
					neck.rotation.x += 0.06;
					charBody.rotation.x += 0.04;
				}
			}
		}
		if (character.controls.down) {
			if (character.position.y > 27) {
				character.position.y -= charPosYIncrement;
				if (charPosYIncrement < 0.3) charPosYIncrement += 0.02;
				if (neck.rotation.x < 0.6) neck.rotation.x += 0.06;
				if (charBody.rotation.x < 0.4) charBody.rotation.x += 0.04;
			} else {
				if (neck.rotation.x > 0 || charBody.rotation.x > 0) {
					character.position.y -= charPosYIncrement;
					neck.rotation.x -= 0.06;
					charBody.rotation.x -= 0.04;
				}
			}
		}

		if (character.controls.left) {
			character.rotateY(charRotateYIncrement);
			if (charRotateYIncrement < charRotateYMax) charRotateYIncrement += 0.0005;
			if (neck.rotation.y > -0.7) neck.rotation.y -= 0.07;
			if (charBody.rotation.y < 0.4) charBody.rotation.y += 0.04;
		}
		if (character.controls.right) {
			character.rotateY(-charRotateYIncrement);
			if (charRotateYIncrement < charRotateYMax) charRotateYIncrement += 0.0005;
			if (neck.rotation.y < 0.7) neck.rotation.y += 0.07;
			if (charBody.rotation.y > -0.4) charBody.rotation.y -= 0.04;
		}

		// Revert

		// if ((!activeKeysPressed.includes(38) && !activeKeysPressed.includes(40)) || (activeKeysPressed.includes(38) && activeKeysPressed.includes(40))) {
		// 	if (charPosYIncrement > 0) charPosYIncrement -= 0.02;
		// 	if (neck.rotation.x < 0 || charBody.rotation.x < 0) {
		// 		// reverting from going up
		// 		character.position.y += charPosYIncrement;
		// 		neck.rotation.x += 0.06;
		// 		charBody.rotation.x += 0.04;
		// 	}
		// 	if (neck.rotation.x > 0 || charBody.rotation.x > 0) {
		// 		// reverting from going down
		// 		character.position.y -= charPosYIncrement;
		// 		neck.rotation.x -= 0.06;
		// 		charBody.rotation.x -= 0.04;
		// 	}
		// }

		// if ((!activeKeysPressed.includes(37) && !activeKeysPressed.includes(39)) || (activeKeysPressed.includes(37) && activeKeysPressed.includes(39))) {
		// 	if (charRotateYIncrement > 0) charRotateYIncrement -= 0.0005;
		// 	if (neck.rotation.y < 0 || charBody.rotation.y > 0) {
		// 		// reverting from going left
		// 		character.rotateY(charRotateYIncrement);
		// 		neck.rotation.y += 0.07;
		// 		charBody.rotation.y -= 0.04;
		// 	}
		// 	if (neck.rotation.y > 0 || charBody.rotation.y < 0) {
		// 		// reverting from going right
		// 		character.rotateY(-charRotateYIncrement);
		// 		neck.rotation.y -= 0.07;
		// 		charBody.rotation.y += 0.04;
		// 	}
		// }
	}
}
