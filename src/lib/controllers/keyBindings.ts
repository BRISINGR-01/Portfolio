import type Controls from "../models/Controls";
import EventHandler from "../models/events/eventHandler";
import { KEYS } from "../models/world/constants";
import { EventType } from "../utils/enums";

export function setKeyBindings(eventHandler: EventHandler, controls: Controls) {
  setCharacterKeyBindings(eventHandler, controls);
}

export function setCharacterKeyBindings(
  eventHandler: EventHandler,
  controls: Controls
) {
  for (const key of KEYS.W) {
    eventHandler
      .bindKey(key)
      .onPress(() => (controls.up = true))
      .onRelease(() => (controls.up = false));
  }

  for (const key of KEYS.S) {
    eventHandler
      .bindKey(key)
      .onPress(() => (controls.down = true))
      .onRelease(() => (controls.down = false));
  }

  for (const key of KEYS.A) {
    eventHandler
      .bindKey(key)
      .onPress(() => (controls.left = true))
      .onRelease(() => (controls.left = false));
  }

  for (const key of KEYS.D) {
    eventHandler
      .bindKey(key)
      .onPress(() => (controls.right = true))
      .onRelease(() => (controls.right = false));
  }
  for (const key of KEYS.T) {
    eventHandler
      .bindKey("t")
      .onPress(() => (controls.turbo = true))
      .onRelease(() => (controls.turbo = false));
  }
  eventHandler
    .bindKey(" ")
    .onPress(() => (controls.space = true))
    .onRelease(() => (controls.space = false));
  eventHandler
    .bindKey("Shift")
    .onPress(() => (controls.shift = true))
    .onRelease(() => (controls.shift = false));
  eventHandler
    .bindKey("m")
    .onPress(() => eventHandler.fire(EventType.SwitchMode, {}));
  eventHandler
    .bindKey("i")
    .onPress(() => eventHandler.fire(EventType.OpenMenu, null));
}
