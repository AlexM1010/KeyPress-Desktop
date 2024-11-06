<!-- DelayNode.svelte -->
<script lang="ts">
    import { Clock } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import type { ComponentType } from 'svelte';
    import { Handle, Position } from "@xyflow/svelte";
    import type { HandleConfig } from "./types";

    export let id: string;
    export let title: string = 'Delay';
    export let icon: ComponentType = Clock;
    export let color: string = 'bg-gradient-to-r from-yellow-500 to-yellow-600';

    export let data = {
        delayType: 'Fixed', // 'Fixed' or 'Random'
        time: 1000,         // For Fixed delay in milliseconds
        minTime: 500,       // For Random delay
        maxTime: 1500
    };

    const handles: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];
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
            <label for="delayType" class="text-sm font-medium text-gray-700">Delay Type:</label>
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
                <label for="fixedTime" class="text-sm font-medium text-gray-700">Time (ms):</label>
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
                <label for="minTime" class="text-sm font-medium text-gray-700">Minimum Time (ms):</label>
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
                <label for="maxTime" class="text-sm font-medium text-gray-700">Maximum Time (ms):</label>
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
