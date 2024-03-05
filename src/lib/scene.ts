import { BoxGeometry, Color, DirectionalLight, HemisphereLight, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new Scene();

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 2;
camera.position.z = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0);

const controls = new PointerLockControls(camera, document.body);
document.addEventListener("click", () => {
	controls.lock();
});

controls.addEventListener("lock", function () {});
controls.addEventListener("unlock", function () {});

const geometry = new BoxGeometry(0.1, 0.1, 0.1);

scene.background = new Color("gray");

const material = new MeshStandardMaterial({
	color: 0x00fff0,
	metalness: 0.13
});

const cube = new Mesh(geometry, material);
cube.position.y = 1;
scene.add(cube);

const directionalLight = new DirectionalLight(0x0090aa);
directionalLight.position.set(-10, 10, -10).normalize();
scene.add(directionalLight);

const hemisphereLight = new HemisphereLight(0xffffff, 0x444444);
hemisphereLight.position.set(1, 1, 1);
scene.add(hemisphereLight);

let renderer: WebGLRenderer;

const animate = () => {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
};

const resize = () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
};

export const createScene = (el: HTMLCanvasElement) => {
	renderer = new WebGLRenderer({ antialias: true, canvas: el });
	resize();
	animate();
};

window.addEventListener("resize", resize);

const loader = new GLTFLoader();

loader.load(
	"3d-objects/wings/scene.gltf",
	(gltf) => {
		scene.add(gltf.scene);
	},
	undefined,
	console.log
);
