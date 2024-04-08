export function easeOutQuad(x: number) {
	return 1 - (1 - x) * (1 - x);
}

export function wait<T>(val: T) {
	return new Promise<T>((resolve) => resolve(val));
}
