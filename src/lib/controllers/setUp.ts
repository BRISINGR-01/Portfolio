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

  const light = new DirectionalLight(0xffffff, 1);
  light.position.set(4, 10, 4);
  light.castShadow = true;
  world.add(light);

  light.shadow.mapSize.width = 5120;
  light.shadow.mapSize.height = 5120;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;

  light.shadow.camera.right = light.shadow.camera.top = 16;
  light.shadow.camera.left = light.shadow.camera.bottom =
    -light.shadow.camera.top;

  const controls = new Controls();

  const character = new Character(world, await load("cyclist", "glb"));
  world.add(character.visual.object);

  await loadEntities(world, character);
  setKeyBindings(world.eventHandler, character, controls);

  world.onRender(() => character.update(world, controls));
  window.addEventListener("resize", () => world.resize());

  world.create(el);
  return world;
}
