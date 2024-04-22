import DataWrapper from "$lib/models/data/DataWrapper";
import SVGEntity from "$lib/models/data/SVGEntity";
import Text from "$lib/models/data/Text";
import Entity from "$lib/models/world/entity";
import { load } from "$lib/models/world/utils";
import type World from "$lib/models/world/world";
import { Euler, Vector3 } from "three";
import { Wall } from "./Wall";

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

export default (world: World, loaders: Promise<any>[]) => {
  const character = new Entity();
  loaders.push(
    load("wings").then((wings) => {
      wings.position.set(0.2, 0.3, 0.2);
      wings.rotateY(-Math.PI / 2);
      wings.rotateZ(-Math.PI / 2);
      character.add(wings);
    })
  );
  loaders.push(
    load("outfit").then((outfit) => {
      outfit.rotateY(Math.PI);
      outfit.position.setY(-1);
      character.add(outfit);
    })
  );
  world.add(character);

  for (let i = 0; i < data.languages.length; i++) {
    const svg = new SVGEntity();
    loaders.push(
      svg.load(data.languages[i].image!).then(() => {
        svg.scale.multiplyScalar(0.1);
        svg.rotation.copy(langCoordinates[i].rotation);
        svg.position.copy(langCoordinates[i].position);
      })
    );
    world.add(svg);
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

  // const buildings = new Entity();
  // loaders.push(buildings.load("futuristic_building"));
  // buildings.position.set(-45, -15, -15);
  // buildings.scale.addScalar(30);
  // world.add(buildings);

  return { character };
};
