import { Mesh, MeshPhongMaterial } from "three";
import font from "three/examples/fonts/helvetiker_regular.typeface.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Entity from "../world/entity";

export default class Text extends Entity {
  private text: string;
  private color: number;
  private depth: number = 0.1;

  constructor(text: string, color: number = 0xb78102) {
    super();
    this.text = text;
    this.color = color;
  }

  async load() {
    const loader = new FontLoader();

    const geometry = new TextGeometry(this.text, {
      font: loader.parse(font),
      size: 1,
      height: 0.2,
      depth: this.depth,
      curveSegments: 5,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.1,
      bevelSegments: 5,
    });
    geometry.computeBoundingBox();

    const textMaterial = new MeshPhongMaterial({
      color: this.color,
      specular: 0x56bf84,
    });
    const mesh = new Mesh(geometry, textMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.add(mesh);

    return this;
  }
}
