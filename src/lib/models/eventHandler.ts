export default class EventHandler {
	private el: HTMLElement;

	constructor(el: HTMLElement) {
		this.el = el;
	}

	onPress(key: string, cb: (isCtrl: boolean) => void, mustBeCtrl: boolean = false) {
		if (mustBeCtrl) {
			this.el.addEventListener("keydown", (e) => {
				if (e.key === key && e.ctrlKey) cb(true);
			});

			return;
		}

		this.el.addEventListener("keydown", (e) => {
			if (e.key === key) cb(e.ctrlKey);
		});
	}

	onClick(cb: (data: { x: number; y: number; isCtrl: boolean }) => void) {
		this.el.addEventListener("click", (e) => cb({ x: e.x, y: e.y, isCtrl: e.ctrlKey }));
	}
}
