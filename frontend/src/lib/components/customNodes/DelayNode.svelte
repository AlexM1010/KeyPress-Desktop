<!-- DelayNode.svelte -->
<script lang="ts">
    import { Clock } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import type { ComponentType } from 'svelte';
    import { Handle, Position } from "@xyflow/svelte";
    import type { HandleConfig } from "./types";

    export let id: string;
    export let title: string = 'Delay';
    export let icon: ComponentType = Clock;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600';

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

    // Add a reactive statement to ensure data consistency
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
    <!-- Node Content for configuring Delay options -->
    <div class="space-y-4">
        <!-- Delay Type Selection -->
        <div class="flex flex-col">
            <label for="delayType" class="text-sm font-medium --main-text">Delay Type:</label>
            <select
                id="delayType"
                bind:value={data.delayType}
                class="mt-1 block w-full px-3 py-2 bg-gray-50 border 
                       border-gray-300 rounded-md shadow-sm focus:outline-none 
                       focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="Fixed">Fixed Delay</option>
                <option value="Random">Random Delay</option>
            </select>
        </div>

        <!-- Fixed Delay Input -->
        {#if data.delayType === 'Fixed'}
            <div class="flex flex-col">
                <label for="fixedTime" class="text-sm font-medium --main-text">Time (ms):</label>
                <input
                    id="fixedTime"
                    type="number"
                    min="0"
                    step="1"
                    bind:value={data.time}
                    class="mt-1 block w-full px-3 py-2 bg-gray-50 border 
                           border-gray-300 rounded-md shadow-sm focus:outline-none 
                           focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        <!-- Random Delay Inputs -->
        {:else if data.delayType === 'Random'}
            <div class="flex flex-col">
                <label for="minTime" class="text-sm font-medium --main-text">Minimum Time (ms):</label>
                <input
                    id="minTime"
                    type="number"
                    min="0"
                    step="1"
                    bind:value={data.minTime}
                    class="mt-1 block w-full px-3 py-2 bg-gray-50 border 
                           border-gray-300 rounded-md shadow-sm focus:outline-none 
                           focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div class="flex flex-col">
                <label for="maxTime" class="text-sm font-medium --main-text">Maximum Time (ms):</label>
                <input
                    id="maxTime"
                    type="number"
                    min="0"
                    step="1"
                    bind:value={data.maxTime}
                    class="mt-1 block w-full px-3 py-2 bg-gray-50 border 
                           border-gray-300 rounded-md shadow-sm focus:outline-none 
                           focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        {/if}
    </div>
</NodeWrapper>
