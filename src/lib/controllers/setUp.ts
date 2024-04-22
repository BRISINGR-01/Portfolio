import Controls from "$lib/models/Controls";
import FlyMode from "$lib/models/modes/FlyMode";
import ModeDecorator from "$lib/models/modes/ModeDecorator";
import PlaneMode from "$lib/models/modes/PlaneMode";
import WalkMode from "$lib/models/modes/WalkMode";
import World from "$lib/models/world/world";
import { AmbientLight, Cache, Color, DirectionalLight } from "three";
import { EventType } from "../utils/enums";
import { setKeyBindings } from "./keyBindings";
import loadEntities from "./loadEntities";

const loaders: Promise<any>[] = [];

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

const { character } = loadEntities(world, loaders);

let mode = new WalkMode(character, controls);

world.eventHandler.on(EventType.SwitchMode, async () => {
  if (mode instanceof ModeDecorator) return;

  const nextMode = new (
    mode instanceof FlyMode
      ? PlaneMode
      : mode instanceof PlaneMode
      ? WalkMode
      : FlyMode
  )(character, controls);

  mode = new ModeDecorator(mode);

  controls.lock();
  await mode.stop();

  mode = new ModeDecorator(nextMode);

  await mode.start();
  controls.unlock();

  mode = nextMode;
});

world.onRender(() => mode.render(world));

window.addEventListener("resize", () => world.resize());

export const createWorld = async (el: HTMLElement) => {
  await Promise.allSettled(loaders);
  world.create(el);
  return world;
};
