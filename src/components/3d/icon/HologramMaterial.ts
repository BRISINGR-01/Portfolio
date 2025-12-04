import { Color, DoubleSide, ShaderMaterial, type Clock } from "three";
import { HOLOGRAM_ANIMATION_LENGTH } from "../../../constants";
import { bluify } from "../../../utils";
import HologramShader from "./HologramShader";

export default class HologramMaterial extends ShaderMaterial {
	constructor(color: Color, scale?: number) {
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
				animStart: { value: 0 },
				baseColor: { value: bluify(color) },
				linesFreq: { value: scale ?? 20 },
				speed: { value: 4 },
				duration: { value: HOLOGRAM_ANIMATION_LENGTH },
			},
		});
	}

	update(clock: Clock) {
		this.uniforms.time.value = clock.elapsedTime;
	}

	start(clock: Clock) {
		this.uniforms.animStart.value = clock.elapsedTime;
	}
}
