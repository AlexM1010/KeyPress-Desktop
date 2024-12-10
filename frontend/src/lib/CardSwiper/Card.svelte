<script lang="ts">
	export let element: HTMLElement;
	export let title: string = '';
	export let description: string = '';
	export let image: string = '';
</script>

<div
	class="w-full h-full absolute cursor-grab ease-in-out rounded-xl touch-none select-none border border-black bg-white"
	bind:this={element}
>
	<!-- Use the provided image. If none, display a placeholder. -->
	{#if image}
		<img class="w-full h-full rounded-xl object-cover" src={image} alt={title} />
	{:else}
		<div class="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl">
			No image available
		</div>
	{/if}

	<div class="absolute inset-0 bg-gradient-to-t from-white/80 via-white/0 rounded-b-xl"></div>

	<div class="p-4 absolute bottom-0 w-full flex justify-center">
		<div class="flex items-center flex-col">
			<h3 class="text-3xl font-semibold pb-4">{title}</h3>
			<p>{description}</p>
		</div>
	</div>
</div>
