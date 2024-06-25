import { Body, Box, World as CannonWorld, Plane, Vec3 } from "cannon";
import {
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
  const physicsWorld = new CannonWorld();
  const cannonDebugRenderer = new CannonDebugRenderer(
    world.scene,
    physicsWorld
  );
  physicsWorld.gravity.set(0, -9.82, 0);

  const clock = new Clock();

  makeGround(world, physicsWorld);
  await loadPiedestalls(world, physicsWorld);
  await character.loadPhysics(physicsWorld);
  world.eventHandler.bindKey("i").onPress(() => {
    const distances = svgData.map((data) =>
      data.center.distanceTo(character.visual.object.position)
    );
    const val = distances.reduce((a, b) => Math.min(a, b));
    console.log(
      new DataWrapper().sections.find(
        (section) => section.name === svgData[distances.indexOf(val)].name
      )
    );
  });

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

  const material = new MeshPhongMaterial({ color: "green" });
  // const material = new MeshStandardMaterial({ map: backgroundTexture });
  // material.uniforms.tBackground.value = backgroundTexture;

  const planeGeometry = new PlaneGeometry(250, 250);
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
    logoPosition: new Vector3(-0.5, 0.75, 0),
    center: new Vector3(4, 0, -2.8),
    rotation: 0,
    posAndRot: [
      {
        pos: new Vector3(-0.2, 0.14, 0.44),
        rot: new Euler(-0.2, 0, 0.2),
      },
      {
        pos: new Vector3(0.2, -0.3, 0.5),
        rot: new Euler(-0.13, 0.15, 0.13),
      },
      {
        pos: new Vector3(-0.5, -0.3, 0.5),
        rot: new Euler(0, 0, 0),
      },
      {
        pos: new Vector3(-0.8, -0.2, 0.4),
        rot: new Euler(-0.43, -1, 0.3),
      },
    ],
  },
  {
    name: "SDG Challenge",
    path: "SDG",
    center: new Vector3(6, 0, -2.5),
    rotation: 0,
    logoPosition: new Vector3(-0.9, 1.04, 0),
    posAndRot: [
      {
        pos: new Vector3(-0.215, 0.41, 0.27),
        rot: new Euler(0, 0, -0.54),
      },
      {
        pos: new Vector3(0.65, -0.17, 0.64),
        rot: new Euler(-0.35, 0.85, 0.28),
      },
      {
        pos: new Vector3(-0.1, -0.18, 0.58),
        rot: new Euler(-0.45, -0.15, 0),
      },
      {
        pos: new Vector3(-0.61, -0.12, 0.71),
        rot: new Euler(-1.2, -0.31, -0.69),
      },
      {
        pos: new Vector3(-0.65, -0.26, 0.48),
        rot: new Euler(-0.2, 0.19, 0.57),
      },
      {
        pos: new Vector3(-1.31, -0.37, 0.25),
        rot: new Euler(-1.03, -1, -0.93),
      },
    ],
  },
  {
    name: "Latin is simple",
    path: "latin-is-simple",
    center: new Vector3(8, 0, -2.7),
    rotation: 0,
    logoPosition: new Vector3(-0.6, 0.8, 0),
    posAndRot: [
      {
        pos: new Vector3(-0.95, 0.67, 0.34),
        rot: new Euler(-0.15, 0, -0.74),
      },
      {
        pos: new Vector3(-0.93, -0.22, 0.06),
        rot: new Euler(-0.27, -0.93, -0.18),
      },
      {
        pos: new Vector3(-0.43, -0.19, 0.75),
        rot: new Euler(-0.45, 0.3, 0.11),
      },
      {
        pos: new Vector3(0.17, -0.27, 0.62),
        rot: new Euler(-0.38, 0.17, 0.38),
      },
    ],
  },
  {
    name: "Information club “Digital Studio”",
    path: "2aeg",
    center: new Vector3(10, 0, -2.3),
    rotation: 0,
    logoPosition: new Vector3(-0.6, 1.1, 0),
    posAndRot: [
      { pos: new Vector3(-0.83, 1.07, 0.34), rot: new Euler(-0.15, 0, -1.12) },
      {
        pos: new Vector3(-1.05, -0.06, 0.06),
        rot: new Euler(-0.27, -0.93, -0.18),
      },
      { pos: new Vector3(-0.5, -0.05, 0.85), rot: new Euler(-0.45, 0.3, 0.11) },
      { pos: new Vector3(0.23, 0.25, 0.36), rot: new Euler(0.05, 0.17, 0.38) },
      {
        pos: new Vector3(0.17, -0.05, 0.62),
        rot: new Euler(-0.38, 0.17, 0.38),
      },
    ],
  },
  {
    name: "Low-level systems",
    path: "low-level",
    center: new Vector3(10, 0, 3.3),
    rotation: Math.PI,
    logoPosition: new Vector3(-0.6, 0.68, 0),
    posAndRot: [
      {
        pos: new Vector3(-0.8, 0.11, 0.21),
        rot: new Euler(0, -0.17, -0.48),
      },
      {
        pos: new Vector3(-0.32, 0.14, 0.37),
        rot: new Euler(-0.3, -0.11, -0.53),
      },
      {
        pos: new Vector3(0.61, -0.23, 0.39),
        rot: new Euler(-0.14, 1.2, 0.48),
      },
      { pos: new Vector3(0.36, 0.17, 0.39), rot: new Euler(-0.13, 0, 0.55) },
      { pos: new Vector3(-0.83, -0.21, 0.29), rot: new Euler(-1.06, -1.23, 0) },
      { pos: new Vector3(-0.7, 1.14, 0.12), rot: new Euler(-0.13, 0, 0) },
      {
        pos: new Vector3(-1.18, -0.47, -0.02),
        rot: new Euler(-0.46, -0.92, -0.5),
      },
    ],
  },
  {
    name: "Cross-platform",
    path: "cross-platform",
    center: new Vector3(8, 0, 3),
    rotation: Math.PI,
    logoPosition: new Vector3(-0.6, 0.68, 0),
    posAndRot: [
      { pos: new Vector3(-0.32, -0.11, 1.01), rot: new Euler(-1.09, -0.3, 0) },
      { pos: new Vector3(-0.29, -0.06, 0.51), rot: new Euler(-0.21, 0, 0) },
      { pos: new Vector3(-0.56, 0.5, 0.35), rot: new Euler(-0.13, 0, -0.28) },
      {
        pos: new Vector3(0.62, -0.28, 0.49),
        rot: new Euler(-0.29, 0.93, 0.35),
      },
      {
        pos: new Vector3(-0.45, -0.19, 0.58),
        rot: new Euler(-0.28, -0.23, 0.69),
      },
      {
        pos: new Vector3(-0.84, -0.32, 0.39),
        rot: new Euler(-0.62, -1.19, 0.21),
      },
    ],
  },
];

async function loadPiedestalls(world: World, physicsWorld: CannonWorld) {
  for (const svgSectionData of svgData) {
    const section = new Object3D();
    section.rotateOnAxis(new Vector3(0, 1, 0), svgSectionData.rotation);
    section.position.copy(svgSectionData.center);
    world.add(section);

    const data = new DataWrapper().sections.find(
      (section) => section.name === svgSectionData.name
    )!;

    const logo = (await new SVGEntity().load({ path: svgSectionData.path }))
      .visual;
    logo.scale.multiplyScalar(1.5);
    logo.position.copy(svgSectionData.logoPosition);
    section.add(logo);

    const pedestalSize = new Vector3(1.25, 2.5, 0.5);
    const pedestal = new Mesh(
      new BoxGeometry(...pedestalSize.toArray()),
      new MeshPhongMaterial()
    );
    pedestal.rotateOnAxis(new Vector3(0, 1, 0), svgSectionData.rotation);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    section.add(pedestal);

    // window.a = [];

    for (let i = 0; i < data.connections.length; i++) {
      const tech = data.connections[i];

      const svg = (await new SVGEntity().load({ path: tech.image! })).visual;
      svg.scale.multiplyScalar(0.75);
      svg.position.copy(svgSectionData.posAndRot[i].pos);
      svg.rotation.copy(svgSectionData.posAndRot[i].rot);
      section.add(svg);
      // const folder = world.gui.addFolder(data.connections[i].value);
      // const pos = folder.addFolder("pos");
      // pos.add(svg.position, "x", -2, 2, 0.01);
      // pos.add(svg.position, "y", -2, 2, 0.01);
      // pos.add(svg.position, "z", -2, 2, 0.01);
      // const rot = folder.addFolder("rot");
      // rot.add(svg.rotation, "x", -2, 2, 0.01);
      // rot.add(svg.rotation, "y", -2, 2, 0.01);
      // rot.add(svg.rotation, "z", -2, 2, 0.01);
      // window.a.push({ p: svg.position, r: svg.rotation });
    }

    const body = new Body({
      mass: 0,
      position: convert(section.position.clone().add(pedestal.position)),
      shape: new Box(convert(pedestalSize.multiplyScalar(0.5))),
    });

    body.quaternion.set(
      ...(pedestal.quaternion.toArray() as [number, number, number, number])
    );

    physicsWorld.addBody(body);

    world.camera.position.copy(pedestal.position);
    world.camera.position.z += 4;
    world.camera.position.y += 1.3;
    world.camera.lookAt(pedestal.position);
  }
}
