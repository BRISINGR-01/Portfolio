import { Color, DirectionalLight, HemisphereLight, Object3D, Scene, WebGLRenderer } from "three";
import EventHandler from "../eventHandler";
import Camera from "./camera";
import Controls from "./controls";

export default class World {
	private scene: Scene;
	private renderer: WebGLRenderer | null = null;
	private camera: Camera;

	get isInitiated() {
		return this.renderer !== null;
	}

	constructor() {
		this.scene = new Scene();
		this.scene.background = new Color("gray");

		this.camera = new Camera();

		const controls = new Controls(this.camera, document.body);
		new EventHandler(document.body).onClick(controls.lock);

		const directionalLight = new DirectionalLight(0x0090aa);
		directionalLight.position.set(-10, 10, -10).normalize();
		this.scene.add(directionalLight);

		const hemisphereLight = new HemisphereLight(0xffffff, 0x444444);
		hemisphereLight.position.set(1, 1, 1);
		this.scene.add(hemisphereLight);
	}

	create(canvas: HTMLCanvasElement) {
		this.renderer = new WebGLRenderer({ antialias: true, canvas });
		this.resize();
		this.animate();
	}

	add(object: Object3D) {
		this.scene.add(object);
	}

	resize() {
		if (!this.isInitiated) throw new Error("Not initiated");

		this.renderer!.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	private animate() {
		if (!this.isInitiated) throw new Error("Not initiated");

		requestAnimationFrame(this.animate);
		this.renderer!.render(this.scene, this.camera);
	}
}
