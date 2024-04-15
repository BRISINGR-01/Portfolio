<script lang="ts">
	import type InfoTable from "$lib/models/world/InfoTable";
	import Info from "../../components/info.svelte";
	let menu: InfoTable;
</script>

<Info {menu} />
