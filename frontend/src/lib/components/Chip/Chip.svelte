<script lang="ts">
	import { onMount } from 'svelte';

	let el: HTMLElement;

	export let active = false;
	export let size = 'auto';
	export let classes = '';
	export let href = '';

	$: className = `chip ${active ? 'chip--active' : ''} ${classes}`;

	onMount(() => {
		el.style.setProperty('--size', size);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={el}
	{href}
	class={className}
	on:click
	on:keydown
	on:keypress
	on:keyup
>
	<slot />
</svelte:element>

<style>
    .chip {
        display: inline-block;
        padding: 5px 15px;
        margin: 3px;
		margin-top: 10px;
		border-width: 1px;
		border-style: solid;
		border-radius: 15px;
		border-color: var(--border);
        text-align: center;
        text-decoration: none;
        font-size: 0.9em;
        font-weight: 300;
        color: var(--tertiary-text);
        transition: background-color 150ms;
        cursor: pointer;
    }

    .chip:hover {
        background-color: var(--main-hover);
    }

    .chip--active {
        background-color: var(--accent);
    }

    .chip--active:hover {
        background-color: var(--accent-hover);
    }
</style>