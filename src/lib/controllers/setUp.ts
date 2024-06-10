import { AmbientLight, Cache, Color, DirectionalLight } from "three";
import Character from "../models/Character";
import Controls from "../models/Controls";
import { load } from "../models/world/utils";
import World from "../models/world/world";
import { setKeyBindings } from "./keyBindings";
import loadEntities from "./loadEntities";

export async function createWorld(el: HTMLElement) {
  Cache.enabled = true;

  const world = new World();
  world.scene.background = new Color("skyblue");

  world.add(new AmbientLight(0xffffff, 1));

  const light = new DirectionalLight(0xffffff, 3);
  light.position.set(50, 200, 100);
  light.position.multiplyScalar(1.3);
  light.castShadow = true;
  world.add(light);

  const controls = new Controls();

  const character = new Character(world, await load("cyclist", "glb"));
  world.add(character.visual.object);

  await loadEntities(world, character, controls);
  setKeyBindings(world.eventHandler, character, controls);

  world.onRender(() => character.update(world, controls));
  window.addEventListener("resize", () => world.resize());

  world.create(el);
  return world;
}
