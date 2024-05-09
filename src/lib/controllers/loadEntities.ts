import { AnimationMixer, Clock, Euler, Vector3 } from "three";
import DataWrapper from "../models/data/DataWrapper";
import SVGEntity from "../models/data/SVGEntity";
import Text from "../models/data/Text";
import { load } from "../models/world/utils";
import type World from "../models/world/world";
import { Wall } from "./Wall";

export default async (world: World) => {
  const clock = new Clock();
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
    await svg.load(data.languages[i].image!);
    // must load first and then edit !!!

    svg.scale.multiplyScalar(0.1);
    svg.rotation.copy(langCoordinates[i].rotation);
    svg.position.copy(langCoordinates[i].position);
    world.add(svg);
  }

  const text = new Text("Languages");
  await text.load();
  text.position.set(2, 2.5, 0);
  text.scale.multiplyScalar(0.3);
  world.add(text);

  for (let i = 0; i < data.sections.length; i++) {
    const wall = new Wall(data.sections[i]);
    wall.position.x += i * 12;
    await wall.load();
    world.add(wall);
  }

  const cyclistGltf = await load("cyclist", "glb");
  const character = cyclistGltf.scene;

  character.traverse(function (node) {
    if (node.isObject3D) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  character.position.set(1, 1, 1);

  const mixer = new AnimationMixer(character);
  const cyclistAnimation = mixer.clipAction(cyclistGltf.animations[0]);
  cyclistAnimation.play();
  world.onRender(() => mixer.update(clock.getDelta()));
  // world.add(character, cyclistGltf.animations[0]);

  return { character };
};
