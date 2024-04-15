import type { Func } from "$lib/utils/types";
import { Object3D, Scene, WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import Context from "../context";
import EventHandler from "../events/eventHandler";
import Camera from "./camera";
import { TICKS_COOLDOWN } from "./constants";
import Entity from "./entity";
import HTMLEntity from "./htmlEntity";

export default class World {
	public scene: Scene;
	private sceneHTML: Scene;
	private renderer: WebGLRenderer;
	private rendererHTML: CSS3DRenderer;
	private tickCount = 0;
	private tickCallbacks: Func[] = [];

	public camera: Camera;
	public context = new Context();
	public eventHandler;

	constructor() {
		this.scene = new Scene();
		this.sceneHTML = new Scene();

		this.camera = new Camera();
		this.renderer = new WebGLRenderer({ antialias: true });
		this.rendererHTML = new CSS3DRenderer();
		this.rendererHTML.domElement.style.position = "absolute";
		this.rendererHTML.domElement.style.top = "0px";

		this.eventHandler = new EventHandler();

		this.render();
	}

	create(el: HTMLElement) {
		el.appendChild(this.renderer.domElement);
		el.appendChild(this.rendererHTML.domElement);
		this.resize();
	}

	add(object: Object3D | Entity | HTMLEntity) {
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

	onTick(cb: Func) {
		this.tickCallbacks.push(cb);
	}

	private render() {
		if (++this.tickCount > TICKS_COOLDOWN) {
			this.tickCount = 0;
		}
		this.cycleUpdate();

		this.renderer.render(this.scene, this.camera);
		this.rendererHTML.render(this.sceneHTML, this.camera);
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
