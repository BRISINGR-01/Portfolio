import {
  Body,
  Box,
  World as CannonWorld,
  Material,
  Plane,
  RigidVehicle,
  Sphere,
  Vec3,
} from "cannon";
import {
  Clock,
  Euler,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  SphereGeometry,
  Vector3,
} from "three";
import type Character from "../models/Character";
import DataWrapper from "../models/data/DataWrapper";
import SVGEntity from "../models/data/SVGEntity";
import Text from "../models/data/Text";
import type World from "../models/world/world";
import { convert } from "../utils/helpers";
import { Wall } from "./Wall";

function createBike() {
  const body = new Body({
    mass: 5,
    position: new Vec3(0, 1, 0),
    shape: new Box(new Vec3(1.15, 0.9, 0.3)),
  });
  const wheel = new Body({
    mass: 1,
    material: new Material("wheel"),
    shape: new Sphere(1),
    angularDamping: 0.4,
  });

  const bike = new RigidVehicle({ chassisBody: body });
  // bike.addWheel({
  //   body: wheel,
  //   position: new Vec3(0.5, 0, 0),
  //   axis: new Vec3(1, 0, 0),
  //   direction: new Vec3(0, -1, 0),
  // });

  return bike;
}

export default async (world: World, character: Character) => {
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

  const normalMaterial = new MeshPhongMaterial();

  const physicsWorld = new CannonWorld();
  physicsWorld.gravity.set(0, -9.82, 0);
  const sphereGeometry = new SphereGeometry();
  const sphereMesh = new Mesh(
    sphereGeometry,
    new MeshPhongMaterial({ color: "#f4d3ab" })
  );
  sphereMesh.position.x = -1;
  sphereMesh.position.y = 10;
  sphereMesh.castShadow = true;
  world.add(sphereMesh);
  const sphereShape = new Sphere(1);
  const sphereBody = new Body({ mass: 1 });
  sphereBody.addShape(sphereShape);
  sphereBody.position.copy(convert(sphereMesh.position));
  physicsWorld.addBody(sphereBody);

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

  character.position.x = -1;
  character.position.y = 3;
  character.castShadow = true;
  const characterHitBox = createBike();
  characterHitBox.addToWorld(physicsWorld);
  characterHitBox.chassisBody.position.copy(convert(character.position));
  character.hitbox = characterHitBox;

  const clock = new Clock();

  world.onRender(() => {
    physicsWorld.step(Math.min(clock.getDelta(), 0.1));

    for (const pair of [
      [sphereMesh, sphereBody],
      [character, characterHitBox.chassisBody],
    ]) {
      pair[0].position.set(
        pair[1].position.x,
        pair[1].position.y,
        pair[1].position.z
      );
      pair[0].quaternion.set(
        pair[1].quaternion.x,
        pair[1].quaternion.y,
        pair[1].quaternion.z,
        pair[1].quaternion.w
      );
    }
  });
};
