import { Body, World as CannonWorld, Plane, Vec3 } from "cannon";
import {
  Clock,
  Euler,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  Vector3,
} from "three";
import type Character from "../models/Character";
import type Controls from "../models/Controls";
import DataWrapper from "../models/data/DataWrapper";
import SVGEntity from "../models/data/SVGEntity";
import Text from "../models/data/Text";
import type World from "../models/world/world";
import CannonDebugRenderer from "../utils/cannon";
import { Wall } from "./Wall";

async function loadSVGs(world: World) {
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
    wall.position.z += 2;
    await wall.load();
    world.add(wall);
  }
}

export default async (
  world: World,
  character: Character,
  controls: Controls
) => {
  // loadSVGs(world);

  const normalMaterial = new MeshPhongMaterial();

  const physicsWorld = new CannonWorld();
  const cannonDebugRenderer = new CannonDebugRenderer(
    world.scene,
    physicsWorld
  );
  physicsWorld.gravity.set(-0.15, -9.82, 0);

  const planeGeometry = new PlaneGeometry(25, 25);
  const planeMesh = new Mesh(planeGeometry, normalMaterial);
  planeMesh.rotateX(-Math.PI / 2);
  planeMesh.receiveShadow = true;
  world.add(planeMesh);
  const planeShape = new Plane();
  const planeBody = new Body({ mass: 0 });
  planeBody.addShape(planeShape);
  planeBody.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), -Math.PI / 2);
  physicsWorld.addBody(planeBody);

  character.loadPhysics(physicsWorld);

  const clock = new Clock();

  world.onRender(() => {
    physicsWorld.step(Math.min(clock.getDelta(), 0.1));

    // cannonDebugRenderer.update();
  });
};
