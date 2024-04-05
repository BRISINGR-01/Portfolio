<script lang="ts">
	import { createWorld } from "$lib/controllers/setUp";
	import { onMount } from "svelte";
	import Info from "../components/info.svelte";

	let canvas: HTMLElement;
	let info: HTMLElement;

	onMount(() => {
		const world = createWorld(canvas);
		// createDisplay(info, world);
	});
</script>

<svelte:head>
	<title>3D Portfolio</title>
	<meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

<div bind:this={canvas} />

<div bind:this={info}>
	<Info />
</div>
