const HologramShader = {
	uniforms: {
		time: { type: "f", value: 0 },
		speed: { type: "f", value: 0.02 },
		animStart: { type: "f", value: 0 },
		linesFreq: { type: "f", value: 20 },
		duration: { type: "f", value: 1 },
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
  uniform float animStart;
  uniform float duration;

  float snoise(float x) {
    return sin(x * 10.0) * 0.5 + 0.5;
  }

  void main() {
    #include <clipping_planes_fragment>
    
    float y = vUv.y;
    float centeredY = y * 2.0 - 1.0;
    float dist = abs(centeredY);

    float progress = time - animStart;
    progress /= duration;

    float lines = fract(y * linesFreq - time * speed);
    float stripe = step(0.5, lines);
    
    float finalStripe = step(0.0, fract(vUv.x)) * stripe;
    
    vec3 color = baseColor - finalStripe * 0.2; // subtle lighter lines
    
    float fade = 0.0;
    if (progress > dist) fade = 1.0;
    
    fade *= 0.4;
    
    gl_FragColor = vec4(color, fade);
  
  }
`,
};

export default HologramShader;
