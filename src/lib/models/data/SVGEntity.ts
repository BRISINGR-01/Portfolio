import { Color, DoubleSide, ExtrudeGeometry, Mesh, MeshBasicMaterial } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import Entity from "../world/entity";

export default class SVGEntity extends Entity {
  async load(path: string) {
    const svg = await fetch(`/icons/${path}.svg`).then(res => res.text());

    const loader = new SVGLoader();
    const data = loader.parse(svg)
    
    this.scale.multiplyScalar( 0.25 );
    this.position.x = - 70;
    this.position.y = 70;
    this.rotation.x = -Math.PI / 2
    this.scale.y *= - 1;

    let renderOrder = 1110;

    for (const path of data.paths) {
      const fillColor = path.userData!.style.fill;
      const material = new MeshBasicMaterial( {
        color: new Color().setStyle( fillColor ),
        opacity: 1,
        transparent: true,
        side: DoubleSide,
        depthWrite: false,
      });

      const shapes = SVGLoader.createShapes(path);

      for (const shape of shapes) {
        const meshGeometry = new ExtrudeGeometry(shape, {
          depth: 4,
          bevelEnabled: true
        });
        const mesh = new Mesh(meshGeometry, material);

        mesh.renderOrder = renderOrder++

        this.add( mesh );
      }

      const strokeColor = path.userData!.style.stroke;
      if (strokeColor && strokeColor !== 'none') {
        const material = new MeshBasicMaterial( {
          color: new Color().setStyle( strokeColor ),
          opacity: path.userData!.style.strokeOpacity,
          transparent: true,
          side: DoubleSide,
          depthWrite: false,
        });


        for (const subPath of path.subPaths) {
          const geometry = SVGLoader.pointsToStroke( subPath.getPoints(), path.userData!.style );
          if (geometry) {
            const mesh = new Mesh( geometry, material );
            mesh.renderOrder = renderOrder--

            this.add( mesh );
          }
        }
      }
    }

    return this;
  }
}