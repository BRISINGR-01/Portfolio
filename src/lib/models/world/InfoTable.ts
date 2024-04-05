import HTMLEntity from "./htmlEntity";

export default class InfoTable extends HTMLEntity {
	constructor(el: HTMLElement) {
		super(el);

		this.scale.setScalar(0.01);
	}
}
