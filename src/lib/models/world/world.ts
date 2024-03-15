import { AmbientLight, Color, DirectionalLight, Object3D, Scene, WebGLRenderer } from "three";
import Context from "../context";
import EventHandler from "../events/eventHandler";
import Camera from "./camera";
import { TICKS_COOLDOWN } from "./constants";
import Controls from "./controls";
import Entity from "./entity";

export default class World {
	private scene: Scene;
	private renderer: WebGLRenderer;
	private camera: Camera;
	private tickCount = 0;
	private tickCallbacks: Func[] = [];

	public context = new Context();
	public eventHandler = new EventHandler();

	constructor() {
		this.scene = new Scene();
		this.scene.background = new Color("skyblue");

		this.camera = new Camera();
		this.camera.position.set(2, 2, 2);
		this.renderer = new WebGLRenderer({ antialias: true });

		const controls = new Controls(this.camera, document.body);
		// new EventHandler(document.body).onClick(() => controls.lock());

		const ambientLight = new AmbientLight("white", 10);
		ambientLight.position.set(0, 100, 10);
		this.add(ambientLight);

		const light = new DirectionalLight("white", 10);
		light.position.set(10, 10, 10);
		this.add(light);
	}

	create(el: HTMLElement) {
		el.appendChild(this.renderer.domElement);
		this.resize();
		this.render();
	}

	add(object: Object3D | Entity) {
		this.scene.add(object);
	}

	resize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	onTick(cb: Func) {
		this.tickCallbacks.push(cb);
	}

	private render() {
		if (++this.tickCount > TICKS_COOLDOWN) {
			this.tickCount = 0;
			this.cycleUpdate();
		}

		this.renderer!.render(this.scene, this.camera);
		requestAnimationFrame(this.render.bind(this));
	}

	private cycleUpdate() {
		this.eventHandler.executeHolding();

		for (const cb of this.tickCallbacks) {
			cb();
		}

		for (const child of this.scene.children) {
			if (child instanceof Entity && child.onTickUpdate !== null) child.onTickUpdate();
		}
	}
}
