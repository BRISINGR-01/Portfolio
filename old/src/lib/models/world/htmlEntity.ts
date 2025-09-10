import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

export default class HTMLEntity extends CSS3DObject {
  onTickUpdate: (() => void) | null = null;
}
