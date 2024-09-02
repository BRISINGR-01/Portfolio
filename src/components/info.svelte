<script lang="ts">
  import type { Section } from "../lib/models/data/DataWrapper";
  import type InfoTable from "../lib/models/world/InfoTable";
  import Steps from "./Steps.svelte";

  let isMenuShown = false;

  export const toggle = () => {
    isMenuShown = !isMenuShown;
    setTimeout(() => {
      data = window.data;
    }, 10);
  };
  export let menu: InfoTable;

  window.data = [];
  let data = window.data as Section[];
</script>

<div style="display: {isMenuShown ? 'flex' : 'none'};" class="container">
  <Steps {data}>
    <div slot="item" let:item>
      {#if item.image}
        <img src="/images/{item.image}" style="max-width: 10em;" />
      {/if}
      <div class="text-xl font-bold">{item.name}</div>
      <div class="text-xl white text-surface-content/50">
        {item.timespan ?? ""}
      </div>
      <div class="text-xl text-white text-surface-content/50">
        {item.description}
      </div>
      <div
        style="display: flex; gap: 1em; margin-top: 0.5em; background-color: #360e9238; padding: 1em; border-radius: 10px"
      >
        {#each item.connections as connection}
          <img
            src="/icons/{connection.image}.svg"
            style="max-width: 3em;max-height: 3	em;"
          />
        {/each}
      </div>
    </div>
    <div slot="marker" let:item>
      <div class={"w-4 h-4 flex-shrink-0 rounded-full flex items-center"}></div>
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
