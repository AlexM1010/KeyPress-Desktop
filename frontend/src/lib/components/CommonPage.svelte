<script>
	import TabTitle from './TabTitle.svelte';

	export let title = 'Title';
</script>

<TabTitle bind:title />
<div class="flex-1 col gap-5 px-1 sm:px-2 md:px-3 py-2 sm:py-4 md:py-6">
	<div class="col gap-2 flex-1">
		<slot />
	</div>
</div>
