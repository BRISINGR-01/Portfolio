import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, type ShaderMaterial } from "three";
import { ROOM } from "../../../constants";
import { WallFace } from "../../../types";

const shader = {
	fragment: `
			uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;
      
      const float WIDTH = ${ROOM.WIDTH}.0;
      const float HEIGHT = ${ROOM.HEIGHT}.0;
      
      float hexDist(vec2 p) {
        p = abs(p);
        float c = dot(p, normalize(vec2(1.0, 1.732)));
        c = max(c, p.x);
        return c;
      }
      
      vec4 hexGrid(vec2 uv) {
        vec2 r = vec2(1.0, 1.732);
        vec2 h = r * 0.5;
        
        vec2 a = mod(uv, r) - h;
        vec2 b = mod(uv - h, r) - h;
        
        vec2 gv = length(a) < length(b) ? a : b;
        
        float d = hexDist(gv);
        float hexSize = 0.5;
        float lineWidth = 0.03;
        
        // Create outline only
        float outline = smoothstep(hexSize - lineWidth, hexSize - lineWidth + 0.01, d) - 
                       smoothstep(hexSize, hexSize + 0.01, d);
        
        // Animated color based on position and time
        vec2 id = uv - gv;
        
        vec3 outlineColor = vec3(0.051, 0.184, 0.341);
        // Transparent background with colored outlines
        vec3 finalColor = outlineColor * outline;
        float alpha = outline * 0.8;
        
        return vec4(finalColor, alpha);
      }
      
      void main() {
        vec2 uv = vUv * vec2(WIDTH, HEIGHT);
        uv -= vec2(WIDTH, HEIGHT) * 0.5;				
        
        // Scale for better hex visibility
        uv *= 1.6;
        uv.y += 0.258;

        gl_FragColor = hexGrid(uv);
      }`,
	vertex: `varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
};

function calcPos(dir: WallFace) {
	let pos: [number, number, number];

	switch (dir) {
		case WallFace.North:
			pos = [0, 0, -ROOM.WIDTH / 2];
			break;
		case WallFace.West:
			pos = [-ROOM.WIDTH / 2, 0, 0];
			break;
		case WallFace.South:
			pos = [0, 0, ROOM.WIDTH / 2];
			break;
		case WallFace.East:
			pos = [ROOM.WIDTH / 2, 0, 0];
			break;
	}

	pos[1] += 2;

	return pos;
}

function calcRot(dir: WallFace) {
	switch (dir) {
		case WallFace.North:
			return 0;
		case WallFace.West:
			return Math.PI / 2;
		case WallFace.South:
			return Math.PI;
		case WallFace.East:
			return -Math.PI / 2;
	}
}

export default function Wall({ wallFace }: { wallFace: WallFace }) {
	const mat = useRef<ShaderMaterial>(null);

	useFrame((_, delta) => {
		if (!mat.current) return;

		mat.current.uniforms.uProgress.value = Math.min(mat.current.uniforms.uProgress.value + delta, 1);
	});
	return (
		<mesh position={calcPos(wallFace)} rotation={[0, calcRot(wallFace), 0]}>
			<planeGeometry args={[ROOM.WIDTH, ROOM.HEIGHT]} />
			<shaderMaterial
				transparent
				side={DoubleSide}
				depthWrite={false}
				uniforms={{ uProgress: { value: 0 } }}
				vertexShader={shader.vertex}
				fragmentShader={shader.fragment}
			/>
		</mesh>
	);
}
