<script lang="ts">
	import { createDisplay } from "$lib/controllers/manageInfo";
	import { createWorld } from "$lib/controllers/setUp";
	import type InfoTable from "$lib/models/world/InfoTable";
	import { EventType } from "$lib/utils/enums";
	import { onMount } from "svelte";
	import Loader from "../components/Loader.svelte";
	import Info from "../components/info.svelte";

	let canvas: HTMLElement;
	let info: Info;
	let menu: InfoTable;
	let hasLoaded = false;

	onMount(() => {
		createWorld(canvas).then(world => {
			menu = createDisplay(info, world);
			world.eventHandler.on(EventType.OpenMenu, () => info.toggle());
			hasLoaded = true;
		})
	});
</script>

<svelte:head>
	<title>3D Portfolio</title>
	<meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

{#if hasLoaded}
	<Info {menu} bind:this={info} />
{:else}
	<Loader />
{/if}

<div bind:this={canvas} />
