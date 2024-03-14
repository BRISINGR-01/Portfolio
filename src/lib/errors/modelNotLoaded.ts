export default class ModelNotLoaded extends Error {
	constructor() {
		super("Could not load model");
	}
}
