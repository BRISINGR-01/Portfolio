import Character from "$lib/models/character";
import EventHandler from "$lib/models/events/eventHandler";
import { KEYS, ROTATION_FORCE } from "$lib/models/world/constants";

export function setKeyBindings(eventHandler: EventHandler) {}

export function setCharacterKeyBindings(character: Character, eventHandler: EventHandler) {
	const spedUpRotationForce = ROTATION_FORCE * 2;
	for (const key of [KEYS.W, KEYS.UP]) {
		eventHandler
			.bindKey(key)
			.onPress(() => character.rotaionDirection.setForward())
			.onHold(() => {
				character.rotateForward(spedUpRotationForce);
			})
			.onRelease(() => {
				character.rotaionDirection.clearZ();
			});
	}

	for (const key of [KEYS.S, KEYS.DOWN]) {
		eventHandler
			.bindKey(key)
			.onPress(() => character.rotaionDirection.setBackward())
			.onHold(() => {
				character.rotateBackward(spedUpRotationForce);
			})
			.onRelease(() => character.rotaionDirection.clearZ());
	}

	for (const key of [KEYS.A, KEYS.LEFT]) {
		eventHandler
			.bindKey(key)
			.onPress(() => character.rotaionDirection.setLeft())
			.onHold(() => {
				character.rotateLeft(spedUpRotationForce);
			})
			.onRelease(() => character.rotaionDirection.clearX());
	}

	for (const key of [KEYS.D, KEYS.RIGHT]) {
		eventHandler
			.bindKey(key)
			.onPress(() => character.rotaionDirection.setRight())
			.onHold(() => {
				character.rotateRight(spedUpRotationForce);
			})
			.onRelease(() => character.rotaionDirection.clearX());
	}
}
