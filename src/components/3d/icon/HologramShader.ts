const HologramShader = {
	uniforms: {
		tDiffuse: { type: "t", value: null },
		time: { type: "f", value: 0 },
		distortion: { type: "f", value: 0.2 },
		distortion2: { type: "f", value: 1 },
		speed: { type: "f", value: 0.02 },
		rollSpeed: { type: "f", value: 0.1 },
	},
	vertexShader: `
		varying vec2 vUv;

    #include <clipping_planes_pars_vertex>

		void main() {
      #include <begin_vertex>

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      #include <project_vertex>
      #include <clipping_planes_vertex>
		}`,
	fragmentShader: `
  #include <clipping_planes_pars_fragment>

  varying vec2 vUv;
  uniform float time;
  uniform vec3 baseColor;
  uniform float speed;
  uniform float linesFreq;

  float snoise(float x) {
    return sin(x * 10.0) * 0.5 + 0.5;
  }


  void main() {
      #include <clipping_planes_fragment>

      float y = vUv.y;

      float lines = fract(y * linesFreq - time * speed);
      float stripe = step(0.5, lines);

      float finalStripe = step(0.0, fract(vUv.x)) * stripe;

      vec3 color = baseColor - finalStripe * 0.2; // subtle lighter lines


      gl_FragColor = vec4(color, 0.4);
  }


`,
};

export default HologramShader;
