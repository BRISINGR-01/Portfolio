import Character from "$lib/models/character";
import EventHandler from "$lib/models/events/eventHandler";
import { KEYS } from "$lib/models/world/constants";
import { EventType, ModeType } from "../utils/enums";

export function setKeyBindings(eventHandler: EventHandler) {}

export function setCharacterKeyBindings(character: Character, eventHandler: EventHandler) {
	for (const key of KEYS.W) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.controls.w = true))
			.onRelease(() => (character.controls.w = false));
	}

	for (const key of KEYS.S) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.controls.s = true))
			.onRelease(() => (character.controls.s = false));
	}

	for (const key of KEYS.A) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.controls.a = true))
			.onRelease(() => (character.controls.a = false));
	}

	for (const key of KEYS.D) {
		eventHandler
			.bindKey(key)
			.onPress(() => (character.controls.d = true))
			.onRelease(() => (character.controls.d = false));
	}
	eventHandler
		.bindKey("Shift")
		.onPress(() => (character.controls.shift = true))
		.onRelease(() => (character.controls.shift = false));
	eventHandler.bindKey("m").onPress(() => eventHandler.fire(EventType.SwitchMode, character.context.ModeState === ModeType.Flying ? ModeType.Walking : ModeType.Flying));
	eventHandler.bindKey("i").onPress(() => eventHandler.fire(EventType.OpenMenu, null));
}
