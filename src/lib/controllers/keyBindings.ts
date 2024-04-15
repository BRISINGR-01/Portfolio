import Character from "$lib/models/character";
import EventHandler from "$lib/models/events/eventHandler";
import { KEYS } from "$lib/models/world/constants";
import { EventType, ModeType } from "../utils/enums";

export function setKeyBindings(eventHandler: EventHandler) {}

export function setCharacterKeyBindings(character: Character, eventHandler: EventHandler) {
	for (const key of KEYS.W) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.controls.up = true))
			.onRelease(() => (character.controls.up = false));
	}

	for (const key of KEYS.S) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.controls.down = true))
			.onRelease(() => (character.controls.down = false));
	}

	for (const key of KEYS.A) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.controls.left = true))
			.onRelease(() => (character.controls.left = false));
	}

	for (const key of KEYS.D) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.controls.right = true))
			.onRelease(() => (character.controls.right = false));
	}
	for (const key of KEYS.T) {
		eventHandler
			.bindKey("t")
			.onPress(() => (character.controls.turbo = true))
			.onRelease(() => (character.controls.turbo = false));
	}
	eventHandler
		.bindKey("Space")
		.onPress(() => (character.controls.space = true))
		.onRelease(() => (character.controls.space = false));
	eventHandler
		.bindKey("Shift")
		.onPress(() => (character.controls.shift = true))
		.onRelease(() => (character.controls.shift = false));
	eventHandler.bindKey("m").onPress(() => eventHandler.fire(EventType.SwitchMode, character.context.ModeState === ModeType.Flying ? ModeType.Walking : ModeType.Flying));
	eventHandler.bindKey("i").onPress(() => eventHandler.fire(EventType.OpenMenu, null));
}
