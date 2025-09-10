import {
  Box3,
  Color,
  DoubleSide,
  ExtrudeGeometry,
  Mesh,
  MeshPhongMaterial,
  Object3D,
  Vector3,
} from "three";

import { Body, Box, Vec3 } from "cannon";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import Text from "./Text";

export default class SVGEntity {
  visual: Object3D = new Object3D();
  physics?: CANNON.Body;

  async load({
    path,
    label,
    physicsWorld,
  }: {
    path: string;
    label?: string;
    physicsWorld?: CANNON.World;
  }) {
    const svgObject = new Object3D();
    const svg = await fetch(`/icons/${path}.svg`).then((res) => res.text());

    const loader = new SVGLoader();
    const data = loader.parse(svg);

    svgObject.scale.multiplyScalar(0.25);
    svgObject.rotation.x = Math.PI / 2;

    let renderOrder = 0;

    for (const path of data.paths) {
      const fillColor = path.userData!.style.fill;

      const material = new MeshPhongMaterial({
        color: new Color().setStyle(fillColor),
        side: DoubleSide,
        depthWrite: true,
      });
      material.polygonOffset = true;
      material.polygonOffsetFactor = -0.1;

      const shapes = SVGLoader.createShapes(path);
      for (const shape of shapes) {
        const meshGeometry = new ExtrudeGeometry(shape, {
          depth: 4,
          bevelEnabled: true,
        });
        const mesh = new Mesh(meshGeometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.renderOrder = renderOrder++;

        svgObject.add(mesh);
      }

      const strokeColor = path.userData!.style.stroke;
      if (strokeColor && strokeColor !== "none") {
        const material = new MeshPhongMaterial({
          color: new Color().setStyle(strokeColor),
          opacity: path.userData!.style.strokeOpacity,
          transparent: true,
          side: DoubleSide,
          depthWrite: false,
        });
        material.polygonOffset = true;
        material.polygonOffsetFactor = -0.1;

        for (const subPath of path.subPaths) {
          const geometry = SVGLoader.pointsToStroke(
            subPath.getPoints(),
            path.userData!.style
          );
          if (geometry) {
            const mesh = new Mesh(geometry, material);
            mesh.renderOrder = renderOrder++;

            svgObject.add(mesh);
          }
        }
      }
    }

    const svgBox = new Box3().setFromObject(svgObject);
    const size = svgBox.getSize(new Vector3());

    svgObject.scale.setScalar(0.2 / size.x);

    for (let i = 0; i < svgObject.children.length; i++) {
      svgObject.children[i].position.addScalar(
        (svgObject.children.length - i) / 10
      );
    }

    svgObject.rotateX(Math.PI / 2);
    svgObject.position.y += size.y;
    this.visual.add(svgObject);

    if (label) {
      this.visual.name = label;
      const labelObject = await new Text(label, 0x33c1de).load();
      labelObject.scale.multiplyScalar(0.2);
      this.visual.position.y += 1;
      this.visual.add(labelObject);
    }

    if (physicsWorld) {
      const svgBox = new Box3().setFromObject(this.visual);
      const size = svgBox.getSize(new Vector3());
      this.physics = new Body({
        mass: 2,
        shape: new Box(new Vec3(...size.toArray())),
        position: new Vec3(0, 20 * Math.random() + 1, 0),
      });
      physicsWorld.addBody(this.physics);
    }

    return this;
  }
}
