import { Mesh, MeshPhongMaterial } from "three";
import font from "three/examples/fonts/helvetiker_bold.typeface.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Entity from "../world/entity";

export default class Text extends Entity {
  async load(text: string) {
    const loader = new FontLoader();

    const geometry = new TextGeometry(text, {
      font: loader.parse(font),
      size: 1,
      height: 0.2,
      depth: 0.1,
      curveSegments: 5,
      bevelEnabled: true,
      bevelSize: 0.1,
      bevelThickness: 0.1,
      bevelSegments: 5
    });
    geometry.computeBoundingBox();
    
    const textMaterial = new MeshPhongMaterial( { color: 0xb78102, specular: 0x56bf84 } );
    const mesh = new Mesh( geometry, textMaterial );
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.add(mesh);

    return this
  }
}