<!--
MouseClickNode.svelte
A configurable node component for the XYFlow graph editor that handles mouse click operations.

Features:
- Configurable mouse button selection (Left, Middle, Right)
- Click pattern settings including:
  - Number of clicks (0-1000)
  - Click delay timing between multiple clicks
  - Press and release timing control
  - Optional release after press behavior
- Advanced scroll options:
  - Directional scrolling (Vertical and/or Horizontal)
  - Configurable scroll lines (0-1000)
  - Collapsible advanced settings panel
- Responsive UI with:
  - Toggle buttons for button type selection
  - Time input controls for delays
  - Number input with validation
  - Checkbox controls
- Node connection handles for graph integration
- Support for node duplication and deletion

@component
@requires @xyflow/svelte
@requires lucide-svelte
-->

<script context="module" lang="ts">
    export type ButtonType = 'Left' | 'Middle' | 'Right';
    export type ScrollDirection = 'Vertical' | 'Horizontal';

    export interface MouseClickConfig {
        buttonType: ButtonType;
        numberOfClicks: number;
        clickDelay: number;
        pressReleaseDelay: number;
        releaseAfterPress: boolean;
        showAdvanced: boolean;
        scrollDirection: ScrollDirection[];
        scrollLines: number;
    }
</script>

<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ComponentType } from 'svelte';
    import { MousePointer, ChevronDown } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import Checkbox from "./nodeComponents/Checkbox.svelte";
    import TimeInput from "./nodeComponents/TimeInput.svelte";
    import NumberInput from './nodeComponents/NumberInput.svelte';
    import type { HandleConfig } from './types';

    // region Constants
    const TIMING = {
        DEFAULT_CLICK_DELAY: 0.1,
        DEFAULT_PRESS_DURATION: 0.1
    } as const;

    const CLICK_CONSTRAINTS = {
        DEFAULT: 1,
        MIN: 0,
        MAX: 1000
    } as const;

    const SCROLL_CONSTRAINTS = {
        MIN_LINES: 0,
        MAX_LINES: 1000,
        SLIDER_STEP: 10
    } as const;

    const AVAILABLE_SCROLL_DIRECTIONS: ScrollDirection[] = ['Vertical', 'Horizontal'];

    const BUTTON_TYPES: ButtonType[] = ['Left', 'Middle', 'Right'];

    const DEFAULT_NODE_CONFIG: MouseClickConfig = {
        buttonType: 'Left',
        numberOfClicks: CLICK_CONSTRAINTS.DEFAULT,
        clickDelay: TIMING.DEFAULT_CLICK_DELAY,
        pressReleaseDelay: TIMING.DEFAULT_PRESS_DURATION,
        releaseAfterPress: true,
        showAdvanced: false,
        scrollDirection: ['Vertical'],
        scrollLines: SCROLL_CONSTRAINTS.MIN_LINES
    };

    const NODE_HANDLES: HandleConfig[] = [
        { 
            id: "right", 
            type: "source", 
            position: Position.Right, 
            offsetY: 50 
        },
        { 
            id: "left", 
            type: "target", 
            position: Position.Left, 
            offsetY: 50 
        },
    ];
    // endregion

    // region Props
    export let id: string;
    export let title: string = 'Mouse Click';
    export let icon: ComponentType = MousePointer;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600';
    export let data: MouseClickConfig = DEFAULT_NODE_CONFIG;
    // endregion

    $: data = {
        ...DEFAULT_NODE_CONFIG,
        ...data
    };

    // region Event Handlers
    /**
     * Handles the duplication of the current node
     * TODO: Implement actual duplication logic
     */
    function handleDuplicate(): void {
        console.log("Duplicate action triggered");
    }

    /**
     * Handles the deletion of the current node
     * TODO: Implement actual deletion logic
     */
    function handleDelete(): void {
        console.log("Delete action triggered");
    }

    /**
     * Toggles a scroll direction in the configuration
     * @param direction - The scroll direction to toggle
     */
    function toggleDirection(direction: ScrollDirection): void {
        data.scrollDirection = data.scrollDirection.includes(direction)
            ? data.scrollDirection.filter(d => d !== direction)
            : [...data.scrollDirection, direction];
    }

    /**
     * Updates the button type in the configuration
     * @param newType - The new button type to set
     */
    function updateButtonType(newType: ButtonType): void {
        data.buttonType = newType;
    }

    /**
     * Toggles the advanced options visibility
     */
    function toggleAdvancedOptions(): void {
        data.showAdvanced = !data.showAdvanced;
    }
    // endregion
</script>

<!-- Template -->
<NodeWrapper
    {id}
    {icon}
    {title}
    {color}
    type="Click"
    handles={NODE_HANDLES}
    bind:data
    on:duplicate={handleDuplicate}
    on:delete={handleDelete}
>
    <div class="grid gap-6">
        <!-- Button Type Selection -->
        <div class="flex border rounded-lg overflow-hidden">
            {#each BUTTON_TYPES as buttonType}
                <button
                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                        {data.buttonType === buttonType 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        {buttonType !== 'Left' ? 'border-l' : ''}
                        {buttonType === 'Left' ? 'first:rounded-l-lg' : ''}
                        {buttonType === 'Right' ? 'last:rounded-r-lg' : ''}"
                    on:click={() => updateButtonType(buttonType)}
                >
                    {buttonType}
                </button>
            {/each}
        </div>

        <!-- Click Configuration -->
        <div class="grid gap-6 auto-rows-min">
            <!-- Click Count and Delay Configuration -->
            <div class="flex justify-between items-center gap-2">
                <NumberInput
                    label="Clicks"
                    bind:value={data.numberOfClicks}
                    minValue={CLICK_CONSTRAINTS.MIN}
                    maxValue={CLICK_CONSTRAINTS.MAX}
                />
                {#if data.numberOfClicks > 1}
                    <TimeInput 
                        label="delay" 
                        defaultValue={data.clickDelay} 
                    />
                {/if}
            </div>
        
            <!-- Release Configuration -->
            <div class="flex justify-between items-center gap-2">
                <Checkbox
                    label="Release"
                    bind:checked={data.releaseAfterPress}
                />
                {#if data.releaseAfterPress}
                    <TimeInput 
                        label="after" 
                        defaultValue={data.pressReleaseDelay} 
                    />
                {/if}
            </div>
        </div>

        <!-- Advanced Options Section -->
        <div class="border-t pt-4">
            <button
                class="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
                on:click={toggleAdvancedOptions}
                aria-expanded={data.showAdvanced}
            >
                <span>Scroll Options</span>
                <ChevronDown
                    class="w-4 h-4 transition-transform duration-200"
                    style={data.showAdvanced ? "transform: rotate(180deg)" : ""}
                />
            </button>

            {#if data.showAdvanced}
                <div class="mt-4 grid gap-6">
                    <!-- Scroll Direction Selection -->
                    <div class="flex border rounded-lg overflow-hidden">
                        {#each AVAILABLE_SCROLL_DIRECTIONS as direction, index}
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

                    <!-- Scroll Lines Input -->
                    <NumberInput
                        label="Number of Lines"
                        bind:value={data.scrollLines}
                        minValue={SCROLL_CONSTRAINTS.MIN_LINES}
                        maxValue={SCROLL_CONSTRAINTS.MAX_LINES}
                    />
                </div>
            {/if}
        </div>
    </div>
</NodeWrapper>