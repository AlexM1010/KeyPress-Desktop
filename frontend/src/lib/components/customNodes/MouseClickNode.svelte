<!-- MouseClickNode.svelte -->
<!-- 
 * @component MouseClickNode
 * @description A node component that handles mouse click configurations in a flow diagram
 * @exports {string} id - Unique identifier for the node
 * @exports {string} [title='Mouse Click'] - Display title for the node
 * @exports {ComponentType} [icon=MousePointer] - Icon component to display
 * @exports {string} [color='bg-gradient-to-r from-blue-500 to-blue-600'] - Background color/gradient
 * @exports {Data} data - Configuration data for the mouse click behavior
-->
<script lang="ts">
    // Core Svelte imports
    import { onMount } from 'svelte';
    import { Position } from "@xyflow/svelte";
    import type { ComponentType } from 'svelte';

    // UI Component imports
    import { MousePointer, ChevronDown } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import Checkbox from "./nodeComponents/Checkbox.svelte";
    import TimeInput from "./nodeComponents/TimeInput.svelte";
    import NumberInput from './nodeComponents/NumberInput.svelte';

    // Type imports
    import type { HandleConfig } from './types';

    // Default configuration constants
    const DEFAULT_CLICK_DELAY = 0.1;
    const DEFAULT_PRESS_DURATION = 0.1;
    const MIN_CLICKS = 1;
    const MAX_CLICKS = 1000;
    const MIN_SCROLL_LINES = 1;
    const MAX_SCROLL_LINES = 1000;

    // Scroll slider step
    const SLIDER_STEP = 10;

    // Custom type definitions
    type ButtonType = 'Left' | 'Middle' | 'Right';
    type ScrollDirection = 'Vertical' | 'Horizontal';

    interface Data {
        buttonType: ButtonType;
        numberOfClicks: number;
        clickDelay: number;
        pressReleaseDelay: number;
        releaseAfterPress: boolean;
        showAdvanced: boolean;
        scrollDirection: ScrollDirection[];
        scrollLines: number;
    }

    // Component props with default values
    export let id: string;
    export let title: string = 'Mouse Click';
    export let icon: ComponentType = MousePointer;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600';
    export let data: Data = {
        buttonType: 'Left',
        numberOfClicks: MIN_CLICKS,
        clickDelay: DEFAULT_CLICK_DELAY,
        pressReleaseDelay: DEFAULT_PRESS_DURATION,
        releaseAfterPress: true,
        showAdvanced: false,
        scrollDirection: ['Vertical'],
        scrollLines: MIN_SCROLL_LINES
    };

    // Configuration arrays for scroll directions
    const scrollDirections: ScrollDirection[] = ['Vertical', 'Horizontal'];

    // Handle configurations for node connections
    const handles: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    // Lifecycle hook to initialize default values
    onMount(() => {
        initializeDefaultValues();
    });

    // Initialize default data values if not provided
    function initializeDefaultValues() {
        data.buttonType ||= 'Left';
        data.numberOfClicks ||= MIN_CLICKS;
        data.clickDelay ??= DEFAULT_CLICK_DELAY;
        data.pressReleaseDelay ??= DEFAULT_PRESS_DURATION;
        data.releaseAfterPress ??= true;
        data.scrollDirection ||= ['Vertical'];
        data.scrollLines ||= MIN_SCROLL_LINES;
    }

    // Event handler for duplicating the node
    function handleDuplicate() {
        console.log("Duplicate action triggered");
    }

    // Event handler for deleting the node
    function handleDelete() {
        console.log("Delete action triggered");
    }

    // Toggle scroll direction selection
    function toggleDirection(direction: ScrollDirection) {
        data.scrollDirection = data.scrollDirection.includes(direction)
            ? data.scrollDirection.filter(d => d !== direction)
            : [...data.scrollDirection, direction];
    }

    // Update the number of clicks with validation
    function updateNumberOfClicks(event: Event) {
        const target = event.target as HTMLInputElement;
        data.numberOfClicks = Math.max(MIN_CLICKS, Math.min(MAX_CLICKS, Number(target.value)));
    }

    // Update the number of scroll lines with validation
    function updateScrollLines(event: Event) {
        const target = event.target as HTMLInputElement;
        data.scrollLines = Math.max(MIN_SCROLL_LINES, Math.min(MAX_SCROLL_LINES, Number(target.value)));
    }
</script>

<!-- Template -->
<NodeWrapper
    {id}
    {icon}
    {title}
    {color}
    type="Click"
    {handles}
    bind:data
    on:duplicate={handleDuplicate}
    on:delete={handleDelete}
>
    <div class="grid gap-4">
        <!-- Button Type Selection -->
        <div class="flex border rounded-lg overflow-hidden">
            <button
                class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                    {data.buttonType === 'Left' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                    first:rounded-l-lg"
                on:click={() => data.buttonType = 'Left'}
            >
                Left
            </button>
            <button 
                class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                    {data.buttonType === 'Middle' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                    border-l"
                on:click={() => data.buttonType = 'Middle'}
            >
                Middle
            </button>
            <button
                class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                    {data.buttonType === 'Right' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                    border-l last:rounded-r-lg"
                on:click={() => data.buttonType = 'Right'}
            >
                Right
            </button>
        </div>

        <div class="grid gap-4 auto-rows-min">
            <!-- First Row: Clicks and Delay -->
            <div class="flex justify-between items-center gap-2">
                <NumberInput
                    label="Clicks"
                    bind:value={data.numberOfClicks}
                    minValue={MIN_CLICKS}
                    maxValue={MAX_CLICKS}
                />
                {#if data.numberOfClicks > 1}
                    <TimeInput label="delay" defaultValue={data.clickDelay} />
                {/if}
            </div>
        
            <!-- Second Row: Release and After -->
            <div class="flex justify-between items-center gap-2">
                <Checkbox
                    label="Release"
                    bind:checked={data.releaseAfterPress}
                />
                {#if data.releaseAfterPress}
                    <TimeInput label="after" defaultValue={data.pressReleaseDelay} />
                {/if}
            </div>
        </div>

        <!-- Advanced Options -->
        <div class="border-t pt-4">
            <button
                class="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
                on:click={() => data.showAdvanced = !data.showAdvanced}
                aria-expanded={data.showAdvanced}
            >
                <span>Scroll Options</span>
                <ChevronDown
                    class="w-4 h-4 transition-transform duration-200"
                    style={data.showAdvanced ? "transform: rotate(180deg)" : ""}
                />
            </button>

            {#if data.showAdvanced}
                <div class="mt-4 grid gap-4">
                    <!-- Scroll Direction Configuration -->
                    <div class="flex border rounded-lg overflow-hidden">
                        {#each scrollDirections as direction, index}
                            <button
                                class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                                    {data.scrollDirection.includes(direction)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                                    {index > 0 ? 'border-l' : ''}
                                    first:rounded-l-lg last:rounded-r-lg"
                                on:click={() => toggleDirection(direction)}
                            >
                                {direction}
                            </button>
                        {/each}
                    </div>

                    <!-- Scroll Lines Configuration -->
                    <NumberInput
                        label="Number of Lines"
                        bind:value={data.scrollLines}
                        minValue={MIN_SCROLL_LINES}
                        maxValue={MAX_SCROLL_LINES}
                    />
                </div>
            {/if}
        </div>
    </div>
</NodeWrapper>