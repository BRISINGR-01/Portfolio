import Character from "$lib/models/character";
import DataWrapper from "$lib/models/data/DataWrapper";
import SVGEntity from "$lib/models/data/SVGEntity";
import Text from "$lib/models/data/Text";
import World from "$lib/models/world/world";
import {
  AmbientLight,
  Cache,
  Color,
  DirectionalLight,
  Euler,
  Vector3,
} from "three";
import { EventType, ModeType } from "../utils/enums";
import { Wall } from "./Wall";
import { setCharacterKeyBindings, setKeyBindings } from "./keyBindings";

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

// const light = new DirectionalLight("white", 1);
// light.position.set(10, 10, 10);
// world.add(light);

// const directionalLight = new DirectionalLight(0xffffff, 1);
// directionalLight.position.z = 3;
// world.add(directionalLight);

const character = new Character();
loaders.push(character.load());
character.switchMode(ModeType.Flying);
character.position.setZ(2);
world.add(character);

world.eventHandler.on(EventType.SwitchMode, (data: ModeType) =>
  character.switchMode(data)
);
world.onTick(() => character.render(world));

setKeyBindings(world.eventHandler);
setCharacterKeyBindings(character, world.eventHandler);

// const buildings = new Entity();
// loaders.push(buildings.load("futuristic_building"));
// buildings.position.set(-45, -15, -15);
// buildings.scale.addScalar(30);
// world.add(buildings);

window.addEventListener("resize", () => world.resize());

const data = new DataWrapper();
const langCoordinates = [
  {
    position: new Vector3(0, 1, 0),
    rotation: new Euler(Math.PI, 0, 0),
  },
  {
    position: new Vector3(1.5, 1, 0),
    rotation: new Euler(Math.PI, 0, 0),
  },
  {
    position: new Vector3(3, 1, 0),
    rotation: new Euler(Math.PI, 0, 0),
  },
  {
    position: new Vector3(0, 2, 0),
    rotation: new Euler(Math.PI, 0, 0),
  },
  {
    position: new Vector3(1.5, 2, 0),
    rotation: new Euler(Math.PI, 0, 0),
  },
  {
    position: new Vector3(3, 2, 0),
    rotation: new Euler(Math.PI, 0, 0),
  },
  {
    position: new Vector3(4.5, 2, 0),
    rotation: new Euler(Math.PI, 0, 0),
  },
];

for (let i = 0; i < data.languages.length; i++) {
  const svg = new SVGEntity();
  loaders.push(
    svg.load(data.languages[i].image!).then(() => {
      svg.scale.multiplyScalar(0.1);
      svg.rotation.copy(langCoordinates[i].rotation);
      svg.position.copy(langCoordinates[i].position);
    })
  );
  // world.add(svg);
}

const text = new Text("Languages");
loaders.push(text.load());
text.position.set(2, 2.5, 0);
text.scale.multiplyScalar(0.3);
// world.add(text);

for (let i = 0; i < data.sections.length; i++) {
  const wall = new Wall(data.sections[i]);
  wall.position.x += i * 12;
  loaders.push(wall.load());
  world.add(wall);
}

export const createWorld = async (el: HTMLElement) => {
  await Promise.allSettled(loaders);
  world.create(el);
  return world;
};
