import { DoubleSide, ShaderMaterial, type Texture } from "three";
import ImageHologramShader from "./HologramShader";

export default class ImageHologram extends ShaderMaterial {
	constructor(texture: Texture) {
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
				texture: { value: texture },
			},
		});
	}
}
