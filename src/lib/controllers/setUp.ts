import { AmbientLight, Cache, Color, DirectionalLight } from "three";
import Controls from "../models/Controls";
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
  setKeyBindings(world.eventHandler, controls);

  const { character } = await loadEntities(world).then();

  window.addEventListener("resize", () => world.resize());

  world.create(el);
  return world;
}
