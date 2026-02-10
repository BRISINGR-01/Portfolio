import { useControls } from "leva";
import { useEffect, useState } from "react";
import { Color } from "three";
import { MONTHS } from "./constants";
import { Mode, type ContentData } from "./types";

export function parseTimeSpan(str: string) {
	const [m, y] = str.split("/").map(Number).slice(1);

	return `${MONTHS[m]} ${y}`;
}

export function calculateSVGPathRenderOffset(index: number, isWide?: boolean) {
	return Math.sqrt(Math.sqrt(index)) * -40 * (isWide ? 0.01 : 0.001);
}

export function useIcon() {
	const [icons, setIcons] = useState<{ name: string; url: string }[]>([]);

	useEffect(() => {
		if (icons.length) return;

		fetch("/icons.json")
			.then((res) => res.json())
			.then((data) => setIcons(data));
	}, [icons.length]);

	return icons;
}

export function useRot(r?: [number, number, number]) {
	return useControls("rot", { r: r ?? [0, 0, 0] }).r;
}

export function usePos(p?: [number, number, number]) {
	return useControls("pos", { p: p ?? [0, 0, 0] }).p;
}

export function useEdit(data?: ContentData) {
	const p = usePos(data?.icon3D.position);
	const r = useRot(data?.icon3D.rotation);

	if (!data) return;
	data.icon3D.position = p;
	data.icon3D.rotation = r;

	console.log(
		`position: [${p[0].toFixed(3)}, ${p[1].toFixed(3)}, ${p[2].toFixed(3)}],
									rotation: [${r[0].toFixed(3)}, ${r[1].toFixed(3)}, ${r[2].toFixed(3)}],`,
	);
}

export function setPointerCursor() {
	document.body.style.cursor = 'url("/cursors/move.cur") 0 0, auto';
}

export function setDefaultCursor() {
	document.body.style.cursor = 'url("/cursors/normal_select.cur") 0 0, auto';
}

export function prettifyTitle(text: string | null | Mode) {
	switch (text) {
		case Mode.Experience:
			return "Experience";
		case Mode.Education:
			return "Education";
		case Mode.AboutMe:
			return "About Me";
		case Mode.Interests:
			return "Interests";
		case Mode.Info:
			return "Info";
		case Mode.None:
			return "";
		default:
			return !text ? "" : text[0].toUpperCase() + text.slice(1);
	}
}

export function bluify(color: Color) {
	// extract current lightness
	const hsl = { h: 0, s: 0, l: 0 };
	color.getHSL(hsl);

	// get target hue/saturation from your blue reference color
	const target = new Color("#72cbfc");
	const targetHSL = { h: 0, s: 0, l: 0 };
	target.getHSL(targetHSL);

	// lift very dark tones so they aren't pure black
	const minL = 0.2;
	const adjustedL = Math.max(hsl.l, minL);

	// keep brightness (l) from original, but use blue hue and saturation
	return new Color().setHSL(targetHSL.h, targetHSL.s, adjustedL);
}

export function throttle(callback: () => void, delay = 100) {
	let shouldWait = false;

	return () => {
		if (shouldWait) {
			return;
		}

		callback();
		shouldWait = true;

		setTimeout(() => (shouldWait = false), delay);
	};
}

const audioPlayer = new Audio("sounds/ambient.mp3");
audioPlayer.loop = true;
const clickSound = new Audio("sounds/click.mp3");
clickSound.volume = 0.4;
export let isAudioEnabled = false;

export function enableMusic() {
	try {
		audioPlayer.play();
	} catch {
		return false;
	}

	isAudioEnabled = true;
	return true;
}

export function disableMusic() {
	isAudioEnabled = false;
	audioPlayer.pause();
}

export function makeClickSound() {
	if (isAudioEnabled) {
		if (clickSound.currentTime !== 0) clickSound.currentTime = 0;

		clickSound.play();
	}
}
