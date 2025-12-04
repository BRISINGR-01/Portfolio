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
  private renderCallbacks: ((world: World) => void)[] = [];
  // gui: GUI = new GUI();

  // public controls: PointerLockControls;
  public scene: Scene;
  public camera: Camera;

  public eventHandler;

  constructor() {
    this.scene = new Scene();
    this.sceneHTML = new Scene();
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.rendererHTML = new CSS3DRenderer();
    // this.rendererHTML.domElement.style.position = "absolute";
    // this.rendererHTML.domElement.style.top = "0px";

    this.camera = new Camera();
    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.update();
    // this.onRender(() => controls.update());

    this.eventHandler = new EventHandler();
    this.eventHandler.onClick(() => {
      document.documentElement.requestFullscreen();
      document.body.requestPointerLock();
    });
    this.eventHandler.bindKey("Escape").onPress(() => {
      document.exitFullscreen();
      document.exitPointerLock();
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

  onRender(cb: fn) {
    this.renderCallbacks.push(cb);
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    // this.rendererHTML.render(this.sceneHTML, this.camera);
    for (const cb of this.renderCallbacks) {
      cb(this);
    }
    requestAnimationFrame(this.render.bind(this));
  }
}
