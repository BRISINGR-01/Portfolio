<script lang="ts">
	import { createDisplay } from "$lib/controllers/manageInfo";
	import { createWorld } from "$lib/controllers/setUp";
	import type InfoTable from "$lib/models/world/InfoTable";
	import { EventType } from "$lib/utils/enums";
	import { onMount } from "svelte";
	import Info from "../components/info.svelte";

	let canvas: HTMLElement;
	let info: Info;
	let menu: InfoTable;

	onMount(() => {
		const world = createWorld(canvas);
		menu = createDisplay(info, world);
		world.eventHandler.on(EventType.OpenMenu, () => info.toggle());
	});
</script>

<svelte:head>
	<title>3D Portfolio</title>
	<meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

<div bind:this={canvas} />
<Info {menu} bind:this={info} />
