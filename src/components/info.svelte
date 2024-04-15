<script lang="ts">
	import DataWrapper from "$lib/models/data/DataWrapper";
	import type InfoTable from "$lib/models/world/InfoTable";
	import Steps from "./Steps.svelte";

	let isMenuShown = false;
	let mode = "Walking";

	export const toggle = () => (isMenuShown = !isMenuShown);
	export let menu: InfoTable;


	const data = new DataWrapper().sections
</script>

<div style="display: {isMenuShown ? "flex": "none"};" class="container">
	<Steps {data}>
		<div slot="item" let:item>
			<div class="text-xl font-bold">{item.name}</div>
			<div class="text-xl white text-surface-content/50">
				{item.timespan ?? ""}
			</div>
			<div class="text-xl text-white text-surface-content/50">
				{item.description}
			</div>
		</div>
		<div slot="marker" let:item>
			<div
				class={"w-4 h-4 flex-shrink-0 rounded-full flex items-center"}
			>
			</div>
		</div>
	</Steps>
	<!-- <Card >
		<Header title={data.name} subheading={data.timespan} slot="header">
			<div slot="avatar">
				<Avatar><img src="/icons/{data.image}.svg" alt="A1"/></Avatar>
			</div>
		</Header>
		<div slot="contents">
			<p>{data.description}</p>
			{#each data.connections as item}
			<div>
				<img src="/icons/{item?.image}" alt={item?.value} height="100px" width="100px"/>
				<p>{item?.value}</p>
			</div>
			{/each}
		</div>
	</Card> -->
</div>

<style>
	.container {
		padding: 2em;
		position: absolute;
		z-index: 1000000;
		flex-direction: column;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		height: 80%;
		overflow-y: scroll;
		background-color: rgb(0 164 255 / 87%);
	}
	.connections > div {
		display: flex;
		flex-direction: column;
	}
	.connections > div > p {
		font-size: large;
	}
</style>
