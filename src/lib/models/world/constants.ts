// camera
export const fov = 75;
export const aspect = window.innerWidth / window.innerHeight;
export const near = 0.1;
export const far = 1000;
export const ROTATION_FORCE = Math.PI / 100;
export const TICKS_COOLDOWN = 2;
export const VELOCITY = 0.02;
export const INTERPOLATION_FACTOR = 0.175;
export const MAX_VELOCITY = 0.01;

export const KEYS = {
	A: ["a", "A", "ArrowLeft"],
	W: ["w", "W", "ArrowUp"],
	S: ["s", "S", "ArrowDown"],
	D: ["d", "D", "ArrowRight"],
	T: ["t", "T"]
};
