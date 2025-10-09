// Refurbished from https://codepen.io/peterhry/pen/egzjGR

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
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
import { COLOR_PALETTE, DEFAULT_LAYER, OCCLUSION_LAYER } from "../../constants";

function getImageTexture(image: HTMLImageElement, density = 1) {
	const canvas = document.createElement("canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d")!;
	const { width, height } = image;

	canvas.setAttribute("width", (width * density).toString());
	canvas.setAttribute("height", (height * density).toString());
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;

	ctx.drawImage(image, 0, 0, width * density, height * density);

	return canvas;
}

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

function setupPostprocessing(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
	const bluriness = 7;
	const renderScale = 0.25;

	const width = window.innerWidth;
	const height = window.innerHeight;

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

	const hologramRenderTarget = new THREE.WebGLRenderTarget(width, height);
	const hologramComposer = new EffectComposer(renderer, hologramRenderTarget);
	hologramComposer.addPass(new RenderPass(scene, camera));

	const badTVPass = new ShaderPass(BadTVShader);
	badTVPass.uniforms.distortion.value = 1;
	badTVPass.uniforms.distortion2.value = 1;
	badTVPass.uniforms.speed.value = 0.2;
	badTVPass.uniforms.rollSpeed.value = 0;
	occlusionComposer.addPass(badTVPass);
	hologramComposer.addPass(badTVPass); // distortion

	const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.2, 0.8, 0.3);
	bloomPass.strength = 0;
	hologramComposer.addPass(bloomPass); // glow

	// Film pass
	const filmPass = new ShaderPass(FilmShader);
	filmPass.uniforms.sCount.value = 1200;
	filmPass.uniforms.grayscale.value = false;
	filmPass.uniforms.sIntensity.value = 2.5;
	filmPass.uniforms.nIntensity.value = 0.2;
	hologramComposer.addPass(filmPass); // lines

	// Blend occRenderTarget into main render target
	const blendPass = new ShaderPass(AdditiveBlendingShader);
	blendPass.uniforms.tAdd.value = occRenderTarget.texture;
	// hologramComposer.addPass(blendPass); // blue tint

	return {
		badTVPass,
		occlusionComposer,
		filmPass,
		composer: hologramComposer,
		hologramRenderTarget,
	};
}

export default function HologramEffect(props: {
	children: React.JSX.Element | React.JSX.Element[];
	composer: EffectComposer;
}) {
	const { scene, camera, clock, gl } = useThree();
	const filmPass = useRef<ShaderPass>(null);
	const badTVPass = useRef<ShaderPass>(null);
	const occlusionComposer = useRef<EffectComposer>(null);
	const hologramComposer = useRef<EffectComposer>(null);
	const composer = useRef<EffectComposer>(null);

	useFrame(() => {
		// if (1 - 1 === 0) return;
		if (filmPass.current) filmPass.current.uniforms.time.value += clock.getDelta();
		if (badTVPass.current) badTVPass.current.uniforms.time.value += 0.01;

		// order matters

		if (occlusionComposer.current) {
			// camera.layers.set(OCCLUSION_LAYER);
			// occlusionComposer.current.render();
		}

		if (composer.current) {
			camera.layers.set(0);
			gl.autoClear = false;
		}

		if (hologramComposer.current) {
			camera.layers.set(1);
			gl.autoClear = false;
			hologramComposer.current.render();
		}

		// camera.layers.enable(DEFAULT_LAYER); // normal
		camera.layers.enable(OCCLUSION_LAYER); // hologram

		// Render the single composer
		hologramComposer.current.render();
		// composer.current.render();
	});

	useEffect(() => {
		camera.layers.enable(0);
		camera.layers.enable(OCCLUSION_LAYER);

		composer.current = new EffectComposer(gl);
		composer.current.addPass(new RenderPass(scene, camera));

		camera.layers.set(OCCLUSION_LAYER);
		const postprocessors = setupPostprocessing(gl, scene, camera);

		filmPass.current = postprocessors.filmPass;
		badTVPass.current = postprocessors.badTVPass;
		occlusionComposer.current = postprocessors.occlusionComposer;
		hologramComposer.current = postprocessors.composer;

		camera.layers.set(DEFAULT_LAYER);

		gl.autoClear = false; // keep normal scene
		const blendPass = new ShaderPass(AdditiveBlendingShader);
		blendPass.uniforms.tAdd.value = postprocessors.hologramRenderTarget.texture;
		blendPass.renderToScreen = true;
		hologramComposer.current.addPass(blendPass);
		hologramComposer.current.render();
		gl.autoClear = true;

		const itemGeo = new THREE.PlaneGeometry(3, 2.1);
		const itemMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.8 });

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
			// scene.add(itemMesh);

			const occItemMaterial = new THREE.MeshBasicMaterial({ color: COLOR_PALETTE.PRIMARY });
			occItemMaterial.map = itemTexture;
			const occMesh = new THREE.Mesh(itemGeo, occItemMaterial);
			occMesh.layers.enable(OCCLUSION_LAYER);
			// scene.add(occMesh);
		};
	});

	return (
		<>
			{props.children[0]}
			<ambientLight layers={OCCLUSION_LAYER} intensity={1.7} />
			<directionalLight intensity={1} position={[200, 100, 300]} castShadow={true} />

			{/* <mesh layers={OCCLUSION_LAYER}>
				<sphereGeometry args={[0.5, 2, 1]} />
				<meshBasicMaterial color="white" />
			</mesh> */}
		</>
	);
}
