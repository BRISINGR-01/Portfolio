import { Color, DataTexture, DoubleSide, RGBAFormat, ShaderMaterial, SRGBColorSpace, UnsignedByteType } from "three";
import HologramShader from "./HologramShader";

function bluify(color: Color) {
	// extract current lightness
	const hsl = { h: 0, s: 0, l: 0 };
	color.getHSL(hsl);

	// get target hue/saturation from your blue reference color
	const target = new Color("#72cbfc");
	const targetHSL = { h: 0, s: 0, l: 0 };
	target.getHSL(targetHSL);

	// lift very dark tones so they aren't pure black
	const minL = 0.2;
	const adjustedL = Math.max(hsl.l, minL);

	// keep brightness (l) from original, but use blue hue and saturation
	return new Color().setHSL(targetHSL.h, targetHSL.s, adjustedL);
}

export default class HologramMaterial extends ShaderMaterial {
	constructor(color: Color, scale: number) {
		const data = new Uint8Array([color.r * 255, color.g * 255, color.b * 255, 255]);
		const texture = new DataTexture(data, 1, 1, RGBAFormat, UnsignedByteType);
		texture.needsUpdate = true;
		texture.colorSpace = SRGBColorSpace;

		super({
			transparent: true,
			opacity: 1,
			side: DoubleSide,
			depthWrite: true,
			depthTest: true,
			vertexShader: HologramShader.vertexShader,
			fragmentShader: HologramShader.fragmentShader,
			uniforms: {
				...HologramShader.uniforms,
				time: { value: 0 },
				baseColor: { value: bluify(color) },
				tDiffuse: { value: texture },
				distortion: { value: 65 },
				duration: { value: 6 },
				linesFreq: { value: scale },
				speed: { value: 4 },
				rollSpeed: { value: 0 },
			},
		});
	}
}

export function HologramMaterialComponent() {
	return (
		<shaderMaterial
			attach="material-2"
			vertexShader={HologramShader.vertexShader}
			fragmentShader={HologramShader.fragmentShader}
			uniforms={{
				time: { value: 0 },
				baseColor: { value: new THREE.Color(COLOR_PALETTE.PRIMARY) },
			}}
			transparent={true}
			depthWrite={false}
			side={THREE.DoubleSide}
		/>
	);
}
