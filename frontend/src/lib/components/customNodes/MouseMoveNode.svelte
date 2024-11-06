<!-- MouseMoveNode.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { Mouse } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import type { ComponentType } from 'svelte';
    import { Handle, Position } from "@xyflow/svelte";
    import type { HandleConfig } from "./types";

    export let id: string;
    export let title: string = 'Move Mouse';
    export let icon: ComponentType = Mouse;
    export let color: string = 'bg-gradient-to-r from-green-500 to-green-600';
    export let initialX: number = 300;
    export let initialY: number = 400;

    // Initialize data with x and y
    export let data = { x: initialX, y: initialY };

    // Define handles for the node
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
    type="MoveMouse"
    {handles}
    bind:data 
    on:duplicate
    on:delete
>
    <!-- Node Content for configuring Mouse Move options -->
    <div class="space-y-4">
        <div class="flex flex-col">
            <label for="x-position" class="text-sm font-medium text-gray-700">X Position:</label>
            <input
                id="x-position"
                type="number"
                min="0"
                max="1920"
                step="1"
                bind:value={data.x} 
                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div class="flex flex-col">
            <label for="y-position" class="text-sm font-medium text-gray-700">Y Position:</label>
            <input
                id="y-position"
                type="number"
                min="0"
                max="1080"
                step="1"
                bind:value={data.y} 
                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    </div>
</NodeWrapper>