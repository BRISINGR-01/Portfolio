<script lang="ts">
	import { createScene } from "$lib/controllers/setUp";
	import { onMount } from "svelte";

	let el: HTMLElement;

	onMount(() => {
		createScene(el);
	});
</script>

<svelte:head>
	<title>3D Portfolio</title>
	<meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

<div bind:this={el} />
