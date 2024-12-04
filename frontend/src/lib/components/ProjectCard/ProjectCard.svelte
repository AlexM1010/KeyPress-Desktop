<script lang="ts">
	import { computeExactDuration, countMonths, getMonthName } from '$lib/utils/helpers';
	import Chip from '../Chip/Chip.svelte';
	import Card from '../Card/Card.svelte';
	import CardTitle from '../Card/CardTitle.svelte';
	import CardLink from '../Card/CardLink.svelte';
	import CardDivider from '../Card/CardDivider.svelte';
	import ChipIcon from '../Chip/ChipIcon.svelte';
	import CardLogo from '../Card/CardLogo.svelte';
	import type { Project } from '$lib/types/types';
	import { getAssetURL } from '$lib/data/assets';
	import { base } from '$app/paths';
	import UIcon from '../Icon/UIcon.svelte';
	import Flow from '../../../routes/workspace/Flow.svelte';
	import "$lib/index.scss";
	import { nodesData, edgesData } from '$lib/stores/flow';
	import { SvelteFlowProvider } from "@xyflow/svelte";
  
	export let project: Project;
  
	$: months = countMonths(project.period.from, project.period.to);
	$: period = computeExactDuration(project.period.from, project.period.to);
	$: from = `${getMonthName(project.period.from.getMonth())} ${project.period.from.getFullYear()}`;
	$: to = project.period.to
	  ? `${getMonthName(project.period.to.getMonth())} ${project.period.to.getFullYear()}`
	  : 'now';
  </script>
  
  <Card color={project.color} href={`${base}/projects/${project.slug}`}>
	<CardLogo alt={project.name} src={getAssetURL(project.logo)} size={40} radius={'0'} />
	<div class="m-t-[20px] row justify-between items-center display: inline-flex">
	  <CardTitle title={project.name} />
	  <div class="row">
		{#each project.links as link}
		  <CardLink label={link.label ?? ''} to={link.to} />
		{/each}
	  </div>
	</div>
  
	<!-- Render Flow component if flow data is available -->
	{#if nodesData && edgesData}
	  <div class="small-flow">
		<SvelteFlowProvider>
			<Flow previewMode={true} nodes={nodesData} edges={edgesData} />
		</SvelteFlowProvider>
	  </div>
	{/if}
  
	<CardDivider />
	<div class="col m-b-[15px] justify-between text-[var(--secondary-text)] text-0.85em">
	  <div class="row items-center gap-2">
		<UIcon icon="i-carbon-assembly-cluster" classes="text-1.25em" />
		<p>{project.type}</p>
	  </div>
	  <CardDivider />
	  <div class="row items-center gap-2">
		<UIcon icon="i-carbon-time" classes="text-1.25em" />
		<p>{period}</p>
	  </div>
	  <CardDivider />
	</div>
	<div class="col sm:h-[100px] md:h-[160px]">
	  <p class="text-[0.9em] text-[var(--secondary-text)] m-t-[20px] m-b-[40px] flex-1 line-clamp-3">
		{project.shortDescription}
	  </p>
	</div>
	<div class="row justify-between text-0.8em font-400">
	  <Chip>{from}</Chip>
	  {#if from !== to}
		<Chip>{to}</Chip>
	  {/if}
	</div>
	<CardDivider />
	<div class="row flex-wrap">
	  {#each project.skills as tech}
		<ChipIcon
		  logo={getAssetURL(tech.logo)}
		  name={tech.name}
		  href={`${base}/skills/${tech.slug}`}
		/>
	  {/each}
	</div>
  </Card>
  
  <style lang="scss">
	.small-flow {
	  height: 100px; /* Adjust as needed */
	  width: 100%;
	  overflow: hidden;
	  margin-top: 1rem;
	}
  
	.small-flow :global(.flow-container) {
	  height: 100%;
	}
  </style>
  