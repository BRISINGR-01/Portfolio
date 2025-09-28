import * as THREE from "three";
import {
	EffectComposer,
	HorizontalBlurShader,
	RenderPass,
	ShaderPass,
	UnrealBloomPass,
	VerticalBlurShader,
} from "three/examples/jsm/Addons.js";
import BadTVShader from "../../../public/dependencies/BadTVShader";
import FilmShader from "../../../public/dependencies/FilmShader";

const AdditiveBlendingShader = {
	uniforms: {
		tDiffuse: { value: null },
		tAdd: { value: null },
	},

	vertexShader: [
		"varying vec2 vUv;",
		"void main() {",
		"vUv = uv;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}",
	].join("\n"),

	fragmentShader: [
		"uniform sampler2D tDiffuse;",
		"uniform sampler2D tAdd;",
		"varying vec2 vUv;",
		"void main() {",
		"vec4 color = texture2D(tDiffuse, vUv);",
		"vec4 add = texture2D(tAdd, vUv);",
		"gl_FragColor = color + add;",
		"}",
	].join("\n"),
};

const getImageTexture = (image: HTMLImageElement, density = 1) => {
	const canvas = document.createElement("canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d")!;
	const { width, height } = image;

	canvas.setAttribute("width", (width * density).toString());
	canvas.setAttribute("height", (height * density).toString());
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;

	ctx.drawImage(image, 0, 0, width * density, height * density);

	return canvas;
};

const width = window.innerWidth;
const height = window.innerHeight;
const lightColor = 0x0099ff;
const DEFAULT_LAYER = 0;
const OCCLUSION_LAYER = 1;
const clock = new THREE.Clock();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 4.5;

const renderer = new THREE.WebGLRenderer({
	antialias: false,
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const { composer, filmPass, badTVPass, occlusionComposer } = setupPostprocessing(renderer, scene, camera);

function setupScene() {
	const itemGeo = new THREE.PlaneGeometry(3, 2.1);
	const itemMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.7 });

	const img = new Image();
	// img.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/13307/blaster.png";
	img.src = "/icons/other/latin-is-simple.svg";
	img.crossOrigin = "Anonymous";

	img.onload = function () {
		const itemTexture = new THREE.Texture(
			getImageTexture(img),
			undefined,
			THREE.ClampToEdgeWrapping,
			THREE.ClampToEdgeWrapping,
			undefined,
			THREE.LinearFilter
		);

		itemTexture.needsUpdate = true;
		itemMaterial.map = itemTexture;

		const itemMesh = new THREE.Mesh(itemGeo, itemMaterial);
		scene.add(itemMesh);

		const occItemMaterial = new THREE.MeshBasicMaterial({ color: lightColor });
		occItemMaterial.map = itemTexture;
		const occMesh = new THREE.Mesh(itemGeo, occItemMaterial);
		occMesh.layers.set(OCCLUSION_LAYER);
		scene.add(occMesh);
	};
}

function setupPostprocessing(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
	const bluriness = 7;
	const renderScale = 0.25;

	const occRenderTarget = new THREE.WebGLRenderTarget(width * renderScale, height * renderScale);
	const occlusionComposer = new EffectComposer(renderer, occRenderTarget);
	occlusionComposer.addPass(new RenderPass(scene, camera));

	// Volumetric Light Pass
	const hBlur = new ShaderPass(HorizontalBlurShader);
	hBlur.uniforms.h.value = bluriness / width;
	const vBlur = new ShaderPass(VerticalBlurShader);
	vBlur.uniforms.v.value = bluriness / height;

	occlusionComposer.addPass(hBlur);
	occlusionComposer.addPass(vBlur);
	occlusionComposer.addPass(hBlur);
	occlusionComposer.addPass(vBlur);
	occlusionComposer.addPass(hBlur);

	// Main Composer
	const composer = new EffectComposer(renderer);
	composer.addPass(new RenderPass(scene, camera));

	const badTVPass = new ShaderPass(BadTVShader);
	badTVPass.uniforms.distortion.value = 1;
	badTVPass.uniforms.distortion2.value = 1;
	badTVPass.uniforms.speed.value = 0.1;
	badTVPass.uniforms.rollSpeed.value = 0;
	occlusionComposer.addPass(badTVPass);
	composer.addPass(badTVPass); // distortion

	const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.2, 0.8, 0.3);
	composer.addPass(bloomPass); // glow

	// Film pass
	const filmPass = new ShaderPass(FilmShader);
	filmPass.uniforms.sCount.value = 1200;
	filmPass.uniforms.grayscale.value = false;
	filmPass.uniforms.sIntensity.value = 1.5;
	filmPass.uniforms.nIntensity.value = 0.2;
	composer.addPass(filmPass); // lines

	// Blend occRenderTarget into main render target
	const blendPass = new ShaderPass(AdditiveBlendingShader);
	blendPass.uniforms.tAdd.value = occRenderTarget.texture;
	blendPass.renderToScreen = true;
	composer.addPass(blendPass); // blue tint

	return {
		badTVPass,
		occlusionComposer,
		filmPass,
		composer,
	};
}

function onFrame() {
	filmPass.uniforms.time.value += clock.getDelta();
	badTVPass.uniforms.time.value += 0.01;
	// order matters

	camera.layers.set(OCCLUSION_LAYER);
	// renderer.setClearColor(0x000000);
	occlusionComposer.render();

	// renderer.setClearColor(0x000000);
	camera.layers.set(DEFAULT_LAYER);
	composer.render();
	requestAnimationFrame(onFrame);
}

setupScene();
onFrame();
