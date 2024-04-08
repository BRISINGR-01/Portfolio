<script lang="ts">
	import type InfoTable from "$lib/models/world/InfoTable";
	import { ModeType } from "$lib/utils/enums";

	let isMenuShown = false;
	let mode = "Walking";

	export const toggle = () => (isMenuShown = !isMenuShown);

	function switchMode() {
		switch (mode) {
			case "Flying":
				mode = "Walking";
				menu.switchMode(ModeType.Walking);
				break;
			case "Walking":
				mode = "Flying";
				menu.switchMode(ModeType.Flying);
				break;
		}
	}

	export let menu: InfoTable;
	//variable Init
	let count = 0;
	//function to be called on click
	function incrementCount() {
		//incremtent
		count++;
	}
</script>

<div hidden={!isMenuShown} style="position:absolute; top:0px; width: 100px;height: 200px;background-color: aqua;">
	<p>Text</p>
	<button on:click={() => alert(9)}>{mode}</button>
</div>
<button on:click={incrementCount} style="position:absolute; top:0px;">
	Clicked {count}
	{count === 1 ? "time" : "times"}
</button>
