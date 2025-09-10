import { Object3D } from "three";
import { load } from "./utils";

export default class Entity extends Object3D {
  async load(objectName: string) {
    this.add((await load(objectName)).scene);
    return this;
  }
}
