import { AmbientLight, Color, DirectionalLight, Mesh, MeshBasicMaterial, Object3D, Scene, WebGLRenderer } from "three";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
import Camera from "./camera";
import Controls from "./controls";

export default class World {
	private scene: Scene;
	private renderer: WebGLRenderer;
	private camera: Camera;

	constructor() {
		this.scene = new Scene();
		this.scene.background = new Color("gray");

		this.camera = new Camera();
		this.renderer = new WebGLRenderer({ antialias: true });

		const geometry = new BoxGeometry(2, 1, 1);

		// create a default (white) Basic material
		const material = new MeshBasicMaterial({ color: new Color("green") });

		// create a Mesh containing the geometry and material
		const cube = new Mesh(geometry, material);

		this.add(cube);

		const controls = new Controls(this.camera, document.body);
		// new EventHandler(document.body).onClick(() => controls.lock());

		const ambientLight = new AmbientLight("white", 1000);
		ambientLight.position.set(0, 100, 10);
		// this.add(ambientLight);

		const light = new DirectionalLight("white", 100);
		light.position.set(0, 100, 0);
		this.add(light);
	}

	create(el: HTMLElement) {
		el.appendChild(this.renderer.domElement);
		this.resize();
		this.animate();
	}

	add(object: Object3D) {
		this.scene.add(object);
	}

	resize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	private animate() {
		this.renderer!.render(this.scene, this.camera);
		requestAnimationFrame(this.animate.bind(this));
	}
}
