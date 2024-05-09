import {
  Box3,
  Color,
  DoubleSide,
  ExtrudeGeometry,
  Mesh,
  MeshPhongMaterial,
  Vector3,
} from "three";

import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import Entity from "../world/entity";

export default class SVGEntity extends Entity {
  async load(path: string) {
    const svg = await fetch(`/icons/${path}.svg`).then((res) => res.text());

    const loader = new SVGLoader();
    const data = loader.parse(svg);

    this.scale.multiplyScalar(0.25);
    this.rotation.x = Math.PI / 2;

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

        mesh.renderOrder = renderOrder++;

        this.add(mesh);
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

            this.add(mesh);
          }
        }
      }
    }

    var box = new Box3().setFromObject(this);
    const size = box.getSize(new Vector3());

    this.scale.setScalar(2 / size.x);

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].position.addScalar((this.children.length - i) / 10);
    }

    return this;
  }
}
