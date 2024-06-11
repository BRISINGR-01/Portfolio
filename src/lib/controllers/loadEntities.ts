import { Body, Box, World as CannonWorld, Plane, Vec3 } from "cannon";
import {
  Box3,
  BoxGeometry,
  Clock,
  Color,
  DataTexture,
  Euler,
  LinearFilter,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  PlaneGeometry,
  RGBAFormat,
  Vector3,
} from "three";
import type Character from "../models/Character";
import DataWrapper from "../models/data/DataWrapper";
import SVGEntity from "../models/data/SVGEntity";
import type World from "../models/world/world";
import CannonDebugRenderer from "../utils/cannon";
import { convert } from "../utils/helpers";

export default async (world: World, character: Character) => {
  // loadSVGs(world);

  const physicsWorld = new CannonWorld();
  const cannonDebugRenderer = new CannonDebugRenderer(
    world.scene,
    physicsWorld
  );
  physicsWorld.gravity.set(0, -9.82, 0);

  character.loadPhysics(physicsWorld);

  const clock = new Clock();

  makeGround(world, physicsWorld);
  loadPiedestalls(world, physicsWorld);

  world.onRender(() => {
    physicsWorld.step(Math.min(clock.getDelta(), 0.1));
    cannonDebugRenderer.update();
  });
};

function makeGround(world: World, physicsWorld: CannonWorld) {
  const topLeft = new Color(0x00ffff);
  const topRight = new Color(0xffffff);
  const bottomRight = new Color(0x1f00ff);
  const bottomLeft = new Color(0x000aff);

  const data = new Uint8Array([
    Math.round(bottomLeft.r * 255),
    Math.round(bottomLeft.g * 255),
    Math.round(bottomLeft.b * 255),
    1,
    Math.round(bottomRight.r * 255),
    Math.round(bottomRight.g * 255),
    Math.round(bottomRight.b * 255),
    1,
    Math.round(topLeft.r * 255),
    Math.round(topLeft.g * 255),
    Math.round(topLeft.b * 255),
    1,
    Math.round(topRight.r * 255),
    Math.round(topRight.g * 255),
    Math.round(topRight.b * 255),
    1,
  ]);

  const backgroundTexture = new DataTexture(data, 25, 25, RGBAFormat);
  backgroundTexture.magFilter = LinearFilter;
  backgroundTexture.needsUpdate = true;

  const material = new MeshPhongMaterial({ color: "white" });
  // const material = new MeshStandardMaterial({ map: backgroundTexture });
  // material.uniforms.tBackground.value = backgroundTexture;

  const planeGeometry = new PlaneGeometry(25, 25);
  const planeMesh = new Mesh(planeGeometry, material);
  planeMesh.rotateX(-Math.PI / 2);
  planeMesh.receiveShadow = true;
  world.add(planeMesh);
  const planeShape = new Plane();
  const planeBody = new Body({ mass: 0 });
  planeBody.addShape(planeShape);
  planeBody.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), -Math.PI / 2);
  physicsWorld.addBody(planeBody);
}

const svgData = [
  {
    name: "A1 Internship",
    path: "A1",
    posAndRot: [
      {
        pos: new Vector3(0.3, 0.14, 0.44),
        rot: new Euler(-0.2, 0, 0.2),
      },
      {
        pos: new Vector3(0.7, -0.3, 0.5),
        rot: new Euler(-0.13, 0.15, 0.13),
      },
      {
        pos: new Vector3(0, -0.3, 0.5),
        rot: new Euler(0, 0, 0),
      },
      {
        pos: new Vector3(-0.3, -0.2, 0.4),
        rot: new Euler(-0.43, -1, 0.3),
      },
    ],
  },
];

async function loadPiedestalls(world: World, physicsWorld: CannonWorld) {
  for (const svgSectionData of svgData) {
    const section = new Object3D();

    const data = new DataWrapper().sections.find(
      (section) => section.name === svgSectionData.name
    )!;

    const center = new Vector3(1, 0, -2);
    const logo = (await new SVGEntity().load({ path: svgSectionData.path }))
      .visual;
    logo.scale.multiplyScalar(1.5);
    logo.position.copy(center);
    logo.position.y += 0.75;

    const piedestal = new Mesh(
      new BoxGeometry(1.25, 2.5, 0.5),
      new MeshPhongMaterial()
    );
    piedestal.position.copy(center);
    piedestal.position.x += 0.5;
    piedestal.castShadow = true;
    piedestal.receiveShadow = true;
    section.add(piedestal);

    for (let i = 0; i < data.connections.length; i++) {
      const tech = data.connections[i];
      const svg = (await new SVGEntity().load({ path: tech.image! })).visual;
      svg.scale.multiplyScalar(0.75);
      svg.position.copy(center).add(svgSectionData.posAndRot[i].pos);
      svg.rotation.copy(svgSectionData.posAndRot[i].rot);
      section.add(svg);
    }

    section.add(logo);
    world.add(section);

    const box = new Box3().setFromObject(section);
    const size = box.getSize(new Vector3());
    const body = new Body({
      mass: 0,
      position: convert(center),
      shape: new Box(new Vec3(size.x, size.y, size.z)),
    });
  }
}
