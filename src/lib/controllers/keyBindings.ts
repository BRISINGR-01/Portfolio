import Character from "$lib/models/character";
import EventHandler from "$lib/models/events/eventHandler";
import { KEYS } from "$lib/models/world/constants";

export function setKeyBindings(eventHandler: EventHandler) {}

export function setCharacterKeyBindings(character: Character, eventHandler: EventHandler) {
	for (const key of KEYS.W) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.context.controls.w = true))
			.onRelease(() => (character.context.controls.w = false));
	}

	for (const key of KEYS.S) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.context.controls.s = true))
			.onRelease(() => (character.context.controls.s = false));
	}

	for (const key of KEYS.A) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.context.controls.a = true))
			.onRelease(() => (character.context.controls.a = false));
	}

	for (const key of KEYS.D) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.context.controls.d = true))
			.onRelease(() => (character.context.controls.d = false));
	}
	eventHandler
		.bindKey("r")
		.onPress(() => (character.context.controls.r = true))
		.onRelease(() => (character.context.controls.r = false));
	eventHandler
		.bindKey("Shift")
		.onPress(() => (character.context.controls.shift = true))
		.onRelease(() => (character.context.controls.shift = false));
}
