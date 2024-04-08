export default class Controls {
	private data = { a: false, s: false, w: false, d: false, shift: false };
	private isLocked = false;
	lock() {
		this.isLocked = true;
	}
	unlock() {
		this.isLocked = false;
	}

	public get a() {
		return this.data.a;
	}
	public set a(value) {
		this.data.a = value;
	}
	public get d() {
		return this.data.d;
	}
	public set d(value) {
		this.data.d = value;
	}
	public get w() {
		return this.data.w;
	}
	public set w(value) {
		this.data.w = value;
	}
	public get s() {
		return this.data.s;
	}
	public set s(value) {
		this.data.s = value;
	}
	public get shift() {
		return this.data.shift;
	}
	public set shift(value) {
		this.data.shift = value;
	}
}
