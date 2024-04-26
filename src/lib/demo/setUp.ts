import { AmbientLight, Color, DirectionalLight, Vector3 } from "three";
import DataWrapper from "../models/data/DataWrapper";
import World from "../models/world/world";
import { Wall } from "./Wall";

const data = new DataWrapper();
const loaders: Promise<any>[] = [];

const world = new World();
world.scene.background = new Color("skyblue");

world.add(new AmbientLight(0xffffff, 1));

const light = new DirectionalLight(0xffffff, 3);
light.position.set(50, 200, 100);
light.position.multiplyScalar(1.3);
light.castShadow = true;
world.add(light);

window.addEventListener("resize", () => world.resize());
world.camera.lookAt(new Vector3(0, 1.8, -2));

const wall = new Wall(data.sections[0]);
wall.position.x = 0;
wall.position.z = -5;
wall.position.y = 2;
loaders.push(wall.load());
world.add(wall);

export const createWorld = async (el: HTMLElement) => {
  await Promise.allSettled(loaders);
  world.create(el);
  return world;
};
