import {
  Body,
  Box,
  World as CannonWorld,
  Cylinder,
  HingeConstraint,
  Material,
  Plane,
  Sphere,
  Vec3,
} from "cannon";
import {
  Clock,
  Euler,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
  SphereGeometry,
  Vector3,
} from "three";
import type Character from "../models/Character";
import type Controls from "../models/Controls";
import DataWrapper from "../models/data/DataWrapper";
import SVGEntity from "../models/data/SVGEntity";
import Text from "../models/data/Text";
import type World from "../models/world/world";
import CannonDebugRenderer from "../utils/cannon";
import { convert } from "../utils/helpers";
import { Wall } from "./Wall";

function createBike(world: CannonWorld, tireMesh: Object3D[]) {
  const bikeSize = new Vec3(1, 0.5, 0.3);
  const wheelSize = 0.45;

  const body = new Body({
    mass: 5,
    position: new Vec3(0, 2, 0),
    shape: new Box(bikeSize),
  });
  world.addBody(body);

  const frontWheelBody = new Body({
    mass: 1,
    material: new Material("wheel"),
    shape: new Cylinder(wheelSize, wheelSize, bikeSize.z / 2, 400),
    angularDamping: 0.4,
  });

  const rearWheelBody = new Body({
    mass: 1,
    material: new Material("wheel"),
    shape: new Cylinder(wheelSize, wheelSize, bikeSize.z / 2, 400),
    angularDamping: 0.4,
  });

  rearWheelBody.position.set(-bikeSize.x * 2, wheelSize * 2, 0);
  frontWheelBody.position.set(bikeSize.x * 2, wheelSize * 2, 0);
  world.addBody(frontWheelBody);
  world.addBody(rearWheelBody);

  const frontHingeConstraint = new HingeConstraint(body, frontWheelBody, {
    pivotA: new Vec3(
      (bikeSize.x + wheelSize) / 2,
      -bikeSize.y - wheelSize - 0.1,
      0
    ), // Pivot point on chassis
    axisA: new Vec3(0, 0, 1), // Rotation axis on chassis
    pivotB: new Vec3(0, 0, 0), // Pivot point on wheel
    axisB: new Vec3(0, 0, 1), // Rotation axis on wheel
  });
  world.addConstraint(frontHingeConstraint);

  const rearHingeConstraint = new HingeConstraint(body, rearWheelBody, {
    pivotA: new Vec3(
      -(bikeSize.x + wheelSize) / 2,
      -bikeSize.y - wheelSize - 0.1,
      0
    ), // Pivot point on chassis
    axisA: new Vec3(0, 0, 1), // Rotation axis on chassis
    pivotB: new Vec3(0, 0, 0), // Pivot point on wheel
    axisB: new Vec3(0, 0, 1), // Rotation axis on wheel
  });
  world.addConstraint(rearHingeConstraint);

  return {
    steer: (goesLeft: boolean | null) => {
      if (goesLeft === null) {
        frontHingeConstraint.axisA.set(0, 0, 1);
        return;
      }
      const prev = frontHingeConstraint.axisA.x;

      if (goesLeft ? prev >= 0.6 : prev <= -0.6) return;

      let x = prev + (goesLeft ? 0.025 : -0.025);

      frontHingeConstraint.axisA.set(x, 0, 1);
      tireMesh.forEach((tire) =>
        tire.rotateOnAxis(
          new Vector3(window.x || 0, window.y || 0, window.z || 0),
          x / 10
        )
      );
    },
    move: (val: number) =>
      body.applyLocalForce(new Vec3(val * -3, 0, 0), new Vec3(0, 0, 0)),
    body,
  };
}
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
  physicsWorld.gravity.set(0, -9.82, 0);

  const planeGeometry = new PlaneGeometry(25, 25);
  const planeMesh = new Mesh(planeGeometry, normalMaterial);
  planeMesh.rotateX(-Math.PI / 2);
  planeMesh.receiveShadow = true;
  world.add(planeMesh);
  const planeShape = new Plane();
  const planeBody = new Body({ mass: 0 });
  planeBody.addShape(planeShape);
  planeBody.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), -Math.PI / 2);
  // planeBody.quaternion.setFromAxisAngle(new Vec3(0, 0, 1), 0);
  physicsWorld.addBody(planeBody);

  const sphereMesh = new Mesh(
    new SphereGeometry(0.25),
    new MeshPhongMaterial({ color: "#f4d3ab" })
  );
  sphereMesh.position.x = -1;
  sphereMesh.position.y = 20;
  sphereMesh.castShadow = true;
  world.add(sphereMesh);
  const sphereShape = new Sphere(0.15);
  const sphereBody = new Body({ mass: 1 });
  sphereBody.addShape(sphereShape);
  sphereBody.position.copy(convert(sphereMesh.position));
  physicsWorld.addBody(sphereBody);

  const tireMesh = [];
  tireMesh.push(character.getObjectByName("DEFFrontWheel")!);
  tireMesh.push(character.getObjectByName("Bike_frontHub")!);
  tireMesh.push(character.getObjectByName("Bike_Fork")!);
  character.castShadow = true;
  const {
    body: characterHitBox,
    move,
    steer,
  } = createBike(physicsWorld, tireMesh);
  character.hitbox = characterHitBox;

  const clock = new Clock();

  world.onRender(() => {
    physicsWorld.step(Math.min(clock.getDelta(), 0.1));

    cannonDebugRenderer.update();
    for (const pair of [
      // [sphereMesh, character.hitbox.wheelBodies[0]],
      [character, characterHitBox],
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

    characterHitBox.angularVelocity.x *= 0.3;

    if (characterHitBox.position.y < 1.5) {
      const euler = new Vec3();
      characterHitBox.quaternion.toEuler(euler);
      if (Math.abs(euler.x) > 1.2) return;
      // console.log(euler.x);

      characterHitBox.applyLocalForce(
        new Vec3(0, 0, euler.x * -60),
        new Vec3(0, 0, 0)
      );
    }

    // world.camera.position.set(
    //   character.position.x,
    //   character.position.y + 0.5,
    //   character.position.z + 1
    // );
    // world.camera.lookAt(character.position);

    if (controls.down) {
      move(10);
    } else if (controls.up) {
      move(-10);
    }

    if (controls.left) {
      steer(true);
    } else if (controls.right) {
      steer(false);
    } else {
      steer(null);
    }
  });
};
