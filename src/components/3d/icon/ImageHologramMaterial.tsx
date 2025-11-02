import { DoubleSide, ShaderMaterial, type Texture } from "three";
import HologramShader from "./HologramShader";

export default class ImageHologram extends ShaderMaterial {
	constructor(texture: Texture) {
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
				texture: { value: texture },
			},
		});
	}
}
