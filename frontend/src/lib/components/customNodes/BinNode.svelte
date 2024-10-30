 <script lang="ts">
	import type { Writable } from 'svelte/store';
	import { Handle, Position, type NodeProps, type Node } from '@xyflow/svelte';

	type $$Props = NodeProps;

	//export let data: $$Props['data'];

	$$restProps;
</script>

<div class="binNode">
	<div>
		Bin
	</div>
</div>

<style>
	.binNode {
		background-color: white;
		padding: 10px;
		border: 1px solid #777;
		border-radius: 20px;
	}
</style>
