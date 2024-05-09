import { AmbientLight, Cache, Color, DirectionalLight, Vector3 } from "three";
import Controls from "../models/Controls";
import World from "../models/world/world";
import { setKeyBindings } from "./keyBindings";
import loadEntities from "./loadEntities";

let prevTime = performance.now();
const velocity = new Vector3();
const direction = new Vector3();

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
  world.onRender(() => {
    if (!world.controls.isLocked) return;

    velocity.multiplyScalar(0.95);

    direction.x = Number(controls.right) - Number(controls.left);
    direction.y = Number(controls.space) - Number(controls.shift);
    direction.z = Number(controls.up) - Number(controls.down);
    direction.normalize(); // this ensures consistent movements in all directions

    velocity.x += direction.x / 200;
    velocity.y += direction.y / 200;
    velocity.z += direction.z / 200;

    world.controls.moveRight(velocity.x);
    world.controls.moveForward(velocity.z);
    world.controls.getObject().position.y += velocity.y;

    character.position
      .copy(world.controls.getObject().position)
      .add(new Vector3(0, -1, -1));
  });

  window.addEventListener("resize", () => world.resize());

  world.create(el);
  return world;
}
