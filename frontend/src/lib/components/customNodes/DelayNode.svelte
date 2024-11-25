<!-- DelayNode.svelte -->
<script lang="ts">
    import { Clock } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import type { ComponentType } from 'svelte';
    import { Handle, Position } from "@xyflow/svelte";
    import type { HandleConfig } from "./types";
    import TimeInput from './nodeComponents/TimeInput.svelte';
    import ButtonGroup from "./nodeComponents/ButtonGroup.svelte";
    import ButtonGroupItem from "./nodeComponents/ButtonGroupItem.svelte";

    export let id: string;
    export let title: string = 'Delay';
    export let icon: ComponentType = Clock;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600';
    export let highlightColor: string = 'bg-blue-500';

    export let data = {
        delayType: 'Fixed',
        time: 1000,
        minTime: 500,
        maxTime: 1500
    };

    const handles: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    const DELAY_TYPES = ['Fixed', 'Random'];

    function updateDelayType(newType: string) {
        data.delayType = newType;
    }

    $: {
        if (data.delayType === 'Fixed' && !data.time) {
            data.time = 1000;
        }
        if (data.delayType === 'Random') {
            data.minTime = data.minTime || 500;
            data.maxTime = data.maxTime || 1500;
        }
    }
</script>

<NodeWrapper
    id={id}
    icon={icon}
    {title}
    {color}
    type="Delay"
    {handles}
    bind:data
    on:duplicate
    on:delete
>
    <div class="space-y-4">
        <!-- Delay Type Selection -->
        <ButtonGroup variant="default">
            {#each DELAY_TYPES as type}
                <ButtonGroupItem 
                    value={type}
                    on:click={() => updateDelayType(type)}
                    active={data.delayType === type}
                    itemHighlightColor={highlightColor}
                >
                    {type}
                </ButtonGroupItem>
            {/each}
        </ButtonGroup>

        <!-- Fixed Delay Input -->
        {#if data.delayType === 'Fixed'}
            <TimeInput
                label="Time"
                bind:value={data.time}
                defaultValue={1000}
                startingUnit="ms"
                minValue={0}
                highlightColor={highlightColor}
            />
        <!-- Random Delay Inputs -->
        {:else if data.delayType === 'Random'}
            <TimeInput
                label="Minimum Time"
                bind:value={data.minTime}
                defaultValue={500}
                startingUnit="ms"
                minValue={0}
                highlightColor={highlightColor}
            />
            <TimeInput
                label="Maximum Time"
                bind:value={data.maxTime}
                defaultValue={1500}
                startingUnit="ms"
                minValue={0}
                highlightColor={highlightColor}
            />
        {/if}
    </div>
</NodeWrapper>