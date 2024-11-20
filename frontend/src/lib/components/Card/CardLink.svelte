<script lang="ts">
	import { Store } from 'lucide-svelte';

	export let label: string;
	export let to: string;
</script>

<a
	class="card-link row-center relative m-x-[2.5px] border-[1px] border-solid border-[var(--border)] p-[5px] rounded-[10px] text-inherit"
	href={to}
	title={label}
	target="_blank"
	rel="noreferrer"
	data-help={label}
>
	<Store/>
</a>

<style lang="scss">
	.card-link {
		display: inline-flex;

		&:hover {
			border-color: var(--border-hover);

			&:after {
				content: attr(data-help);
				display: inline-block;
				position: absolute;
				width: max-content;
				background-color: var(--secondary);
				padding: 5px 10px;
				right: 40%;
				top: calc(100% + 5px);
				border: 1px solid var(--border);
				border-radius: 15px;
				z-index: 10;
			}
		}
	}
</style>
