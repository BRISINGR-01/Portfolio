import GUI from "lil-gui";
import { useEffect, useState } from "react";

const gui = new GUI();

export function useRotation() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [z, setZ] = useState(0);

	useEffect(() => {
		addDebugSlider("x", setX, 0, 2 * Math.PI, 0.01);
		addDebugSlider("y", setY, 0, 2 * Math.PI, 0.01);
		addDebugSlider("z", setZ, 0, 2 * Math.PI, 0.01);
	}, []);

	return [x, y, z];
}
export function usePosition() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [z, setZ] = useState(0);

	useEffect(() => {
		addDebugSlider("x", setX, -20, 20, 0.1);
		addDebugSlider("y", setY, -20, 20, 0.1);
		addDebugSlider("z", setZ, -20, 20, 0.1);
	}, []);

	return [x, y, z] as [x: number, y: number, z: number];
}

export function addDebugSlider(name: string, onChange: (v: number) => void, min: number, max: number, step: number) {
	console.log(name);

	gui.add({ [name]: min }, name, min, max, step).onChange(onChange);
}

export function useDebugChoice<T extends string>(name: string, choices: T[]) {
	const [choice, setChoice] = useState(choices[0]);

	useEffect(() => {
		gui.add({ [name]: choices[0] }, name, choices).onChange(setChoice);
	});

	return choice;
}
