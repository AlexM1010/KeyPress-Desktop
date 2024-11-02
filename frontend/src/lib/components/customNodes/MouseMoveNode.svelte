<!-- MouseMoveNode.svelte -->
<script lang="ts">
    import { MousePointer } from 'lucide-svelte';
    import NodeWrapper from './NodeWrapper.svelte';
    import type { ComponentType } from 'svelte';
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    // Props for the MouseMoveNode
    export let title: string = 'Move Mouse';
    export let icon: ComponentType = MousePointer;
    export let color: string = 'bg-gradient-to-r from-green-500 to-green-600';
    export let initialX: number = 300;
    export let initialY: number = 400;

    // Internal state for x and y
    let x: number = initialX;
    let y: number = initialY;

    // Dispatch data changes to parent (e.g., to update node data)
    function updateData() {
        dispatch('update', { x, y });
    }

    // Initialize data on mount
    onMount(() => {
        updateData();
    });

    // Watch for changes and update data accordingly
    $: updateData();

    $$restProps
</script>

<NodeWrapper
    icon={icon}
    {title}
    {color}
    id="move-mouse" 
    type="move-mouse-node"
    data={{ x, y }}
    position={{ x: 200, y: 0 }}
    targetPosition="bottom"
    sourcePosition="top"
    measured={{ width: 100, height: 50 }}
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
                bind:value={x}
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
                bind:value={y}
                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    </div>
</NodeWrapper>