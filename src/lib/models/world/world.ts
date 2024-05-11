import { Object3D, Scene, WebGLRenderer, type AnimationClip } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import EventHandler from "../events/eventHandler";
import Camera from "./camera";
import Entity from "./entity";
import HTMLEntity from "./htmlEntity";

export default class World {
  private sceneHTML: Scene;
  private renderer: WebGLRenderer;
  private rendererHTML: CSS3DRenderer;
  private renderCallbacks: ((wworld: World) => void)[] = [];

  // public controls: PointerLockControls;
  public scene: Scene;
  public camera: Camera;

  public eventHandler;

  constructor() {
    this.scene = new Scene();
    this.sceneHTML = new Scene();
    this.renderer = new WebGLRenderer({ antialias: true });
    this.rendererHTML = new CSS3DRenderer();
    this.rendererHTML.domElement.style.position = "absolute";
    this.rendererHTML.domElement.style.top = "0px";

    this.camera = new Camera();
    // this.controls = new PointerLockControls(this.camera, document.body);
    // this.controls.pointerSpeed = 0.5;
    // this.add(this.controls.getObject());

    this.eventHandler = new EventHandler();
    this.eventHandler.onClick(() => {
      // this.controls.lock();
    });
    this.onRender(() => this.eventHandler.executeHolding());

    this.render();
  }

  create(el: HTMLElement) {
    el.appendChild(this.renderer.domElement);
    el.appendChild(this.rendererHTML.domElement);
    this.resize();
  }

  add(object: Object3D | Entity | HTMLEntity, animation?: AnimationClip) {
    if (object instanceof HTMLEntity) {
      this.sceneHTML.add(object);
    } else {
      this.scene.add(object);
    }
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererHTML.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  onRender(cb: () => void) {
    this.renderCallbacks.push(cb);
  }

  private render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.rendererHTML.render(this.sceneHTML, this.camera);
    for (const cb of this.renderCallbacks) {
      cb(this);
    }
  }
}
