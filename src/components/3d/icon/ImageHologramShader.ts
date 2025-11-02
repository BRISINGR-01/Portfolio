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
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,
	fragmentShader: `
    varying vec3 vPos;
    uniform float time;
    uniform sampler2D tDiffuse;
    uniform float speed;
    uniform float linesFreq;

    void main() {
        float y = vPos.y;

        vec3 texColor = texture2D(tDiffuse, vPos.xz).rgb;

        float lines = fract(y * linesFreq - time * speed);
        float stripe = step(0.5, lines);

        float finalStripe = step(0.0, fract(vPos.x)) * stripe;

        vec3 finalColor = texColor - finalStripe * 0.2;

        gl_FragColor = vec4(finalColor, 0.4);
    }
`,
};

export default HologramShader;
