import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, type ShaderMaterial } from "three";
import { ROOM } from "../../../constants";
import { WallFace } from "../../../types";

const shader = {
	fragment: `
			uniform float uReveal;   // 0 → 1
			uniform bool uInvert;    // flip diagonal per wall
      varying vec2 vUv;
      
      const float WIDTH = ${ROOM.WIDTH}.0;
      const float HEIGHT = ${ROOM.HEIGHT}.0;

      float diagonalMask(vec2 uv01) {
				float d;

				// top-left → bottom-right
				if (!uInvert) {
						d = uv01.x + (1.0 - uv01.y);
				} else {
						// top-right → bottom-left
						d = (1.0 - uv01.x) + (1.0 - uv01.y);
				}

				// normalize so both diagonals go 0 → 1
				d = clamp(d * 0.5, 0.0, 1.0);

				// apply reveal
				float mask = smoothstep(uReveal, uReveal, d);

				// ensure fully visible behind reveal
				mask = clamp(mask, 0.0, 1.0);

				return 1.0 - mask;
		}


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
        
        vec3 outlineColor = vec3(0.000, 0.173, 0.357);
        // Transparent background with colored outlines
        vec3 finalColor = outlineColor * outline;
        float alpha = outline;
        
        return vec4(finalColor, alpha);
      }
      
      void main() {
				// wall space (centered)
				vec2 uv = vUv * vec2(WIDTH, HEIGHT);
				uv -= vec2(WIDTH, HEIGHT) * 0.5;
				
				// hex scaling
				uv *= 1.6;
				uv.y += 0.258;
				
				vec4 hex = hexGrid(uv);
				
				// normalized UV (0-1)
				vec2 uv01 = vUv;
				// diagonal fade
				float fade = diagonalMask(uv01);

				gl_FragColor = vec4(hex.rgb, hex.a * fade);
			}
`,
	vertex: `
varying vec2 vUv;

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

	pos[1] += 1.99;

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
	const uniforms = useMemo(
		() => ({
			uReveal: { value: 0 },
			uInvert: { value: wallFace === WallFace.North || wallFace === WallFace.South },
		}),
		[wallFace],
	);

	useFrame((_, delta) => {
		if (mat.current && mat.current.uniforms.uReveal.value <= 1) {
			mat.current.uniforms.uReveal.value += delta;
		}
	}, 0);

	return (
		<mesh position={calcPos(wallFace)} rotation={[0, calcRot(wallFace), 0]}>
			<planeGeometry args={[ROOM.WIDTH, ROOM.HEIGHT]} />
			<shaderMaterial
				transparent
				ref={mat}
				side={DoubleSide}
				depthWrite={false}
				uniforms={uniforms}
				vertexShader={shader.vertex}
				fragmentShader={shader.fragment}
			/>
		</mesh>
	);
}
