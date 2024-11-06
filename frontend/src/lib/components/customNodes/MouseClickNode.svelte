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
    // Core imports
    import { onMount } from 'svelte';
    import { Position } from "@xyflow/svelte";
    import type { ComponentType } from 'svelte';

    // UI Components
    import { MousePointer, ChevronDown } from 'lucide-svelte';
    import NodeWrapper from './NodeWrapper.svelte';
    import Slider from './Slider.svelte';
    import Checkbox from "./Checkbox.svelte";
    import TimeInput from "./TimeInput.svelte";
    import NumberInput from './NumberInput.svelte';

    // Types
    import type { HandleConfig } from './types';

    // Constants
    const DEFAULT_CLICK_DELAY = 0.1;
    const DEFAULT_PRESS_DURATION = 0.1;
    const MIN_CLICKS = 1;
    const MAX_CLICKS = 1000;
    const MIN_SCROLL_LINES = 1;
    const MAX_SCROLL_LINES = 1000;
    const SLIDER_STEP = 10;

    // Custom type definitions
    type ButtonType = 'Left' | 'Right' | 'Middle';
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

    // Props
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

    // Configuration arrays
    const buttonTypes: ButtonType[] = ['Left', 'Right', 'Middle'];
    const scrollDirections: ScrollDirection[] = ['Vertical', 'Horizontal'];
    const handles: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    // Lifecycle hooks
    onMount(() => {
        initializeDefaultValues();
    });

    // Initialization functions
    function initializeDefaultValues() {
        data.buttonType ||= 'Left';
        data.numberOfClicks ||= MIN_CLICKS;
        data.clickDelay ??= DEFAULT_CLICK_DELAY;
        data.pressReleaseDelay ??= DEFAULT_PRESS_DURATION;
        data.releaseAfterPress ??= true;
        data.scrollDirection ||= ['Vertical'];
        data.scrollLines ||= MIN_SCROLL_LINES;
    }

    function handleDuplicate() {
        console.log("Duplicate action triggered");
    }

    function handleDelete() {
        console.log("Delete action triggered");
    }

    function toggleDirection(direction: ScrollDirection) {
        data.scrollDirection = data.scrollDirection.includes(direction)
            ? data.scrollDirection.filter(d => d !== direction)
            : [...data.scrollDirection, direction];
    }

    // Input validation handlers
    function updateNumberOfClicks(event: Event) {
        const target = event.target as HTMLInputElement;
        data.numberOfClicks = Math.max(MIN_CLICKS, Math.min(MAX_CLICKS, Number(target.value)));
    }

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
    <div class="space-y-4">
        <!-- Button Type Selection -->
        <div class="space-y-3">
            <div class="flex gap-2">
                {#each buttonTypes as type}
                    <button
                        class="flex-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm
                            {data.buttonType === type 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}"
                        on:click={() => data.buttonType = type}
                    >
                        {type}
                    </button>
                {/each}
            </div>

             <!-- Click Configuration Group -->
             <div class="flex items-center">
                <div class="mr-2">
                    <div class="flex items-center gap-4">
                        <div class="flex-1">
                            <NumberInput
                                label="Clicks"
                                bind:value={data.numberOfClicks}
                                minValue={MIN_CLICKS}
                                maxValue={MAX_CLICKS}
                            />
                        </div>
                    </div>
                </div>
                <!-- Multiple Clicks Delay Configuration -->
                {#if data.numberOfClicks > 1}
                        <TimeInput label="delay" defaultValue={data.clickDelay}/>
                {/if}
            </div>

            <!-- Press/Release Configuration Group -->
            <div class="flex items-center">
                <!-- Release After Press Option -->
                <div class="mr-2">
                    <Checkbox
                        label="Release"
                        bind:checked={data.releaseAfterPress}
                    />
                </div>
                <!-- Press/Release Delay (input field)--> 
                {#if data.releaseAfterPress}
                    <div class="flex-1">
                        <TimeInput label="after" defaultValue={data.pressReleaseDelay} />
                    </div>
                {/if}
            </div>

           

                <!-- Advanced Options -->
                <div class="border-t pt-3">
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
                        <div class="mt-3 space-y-3">
                            <!-- Scroll Direction Configuration -->
                            <div class="space-y-2">
                                <div id="scrollDirection" class="flex gap-2">
                                    {#each scrollDirections as direction}
                                        <button
                                            class="flex-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm
                                                {data.scrollDirection.includes(direction)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}"
                                            on:click={() => toggleDirection(direction)}
                                        >
                                            {direction}
                                        </button>
                                    {/each}
                                </div>
                            </div>

                            <!-- Scroll Lines Configuration -->
                            <div class="space-y-2">
                                <NumberInput
                                    label="Number of Lines"
                                    bind:value={data.scrollLines}
                                    minValue={MIN_SCROLL_LINES}
                                    maxValue={MAX_SCROLL_LINES}
                                />
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
</NodeWrapper>