import { Color, DoubleSide, ShaderMaterial } from "three";
import ImageHologramShader from "./HologramShader";

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
		super({
			transparent: true,
			opacity: 1,
			side: DoubleSide,
			depthWrite: true,
			depthTest: true,
			vertexShader: ImageHologramShader.vertexShader,
			fragmentShader: ImageHologramShader.fragmentShader,
			uniforms: {
				...ImageHologramShader.uniforms,
				time: { value: 0 },
				baseColor: { value: bluify(color) },
				duration: { value: 6 },
				linesFreq: { value: scale },
				speed: { value: 4 },
			},
		});
	}
}
