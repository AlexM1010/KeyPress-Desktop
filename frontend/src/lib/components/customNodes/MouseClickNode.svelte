<!-- MouseClickNode.svelte -->
<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ComponentType } from 'svelte';
    import { MousePointer, ChevronDown } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import Checkbox from "./nodeComponents/Checkbox.svelte";
    import ButtonGroup from "./nodeComponents/ButtonGroup.svelte";
    import TimeInput from "./nodeComponents/TimeInput.svelte";
    import NumberInput from './nodeComponents/NumberInput.svelte';
    import type { HandleConfig } from './types';
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";

    // Move types inside main script
    type ButtonType = 'left' | 'middle' | 'right';
    type ScrollDirection = 'Vertical' | 'Horizontal';

    interface MouseClickTaskData {
        buttonType: ButtonType;
        numberOfClicks: number;
        clickDelay: number;
        pressReleaseDelay: number;
        releaseAfterPress: boolean;
        scrollDirection: ScrollDirection[];
        scrollLines: number;
    }

    export let id: string;
    export let title: string = 'Mouse Click';
    export let icon: ComponentType = MousePointer;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600 bg-opacity-75'; // Custom header color 
    export let highlightColor: string = 'bg-blue-500 bg-opacity-75'; // Custom highlight color with partial transparency

    const BUTTON_TYPES: ButtonType[] = ['left', 'middle', 'right'];
    const SCROLL_DIRECTIONS: ScrollDirection[] = ['Vertical', 'Horizontal'];

    // Simplified data initialization
    export let data: MouseClickTaskData = {
        buttonType: 'left',
        numberOfClicks: 1,
        clickDelay: 0.1,
        pressReleaseDelay: 100,
        releaseAfterPress: true,
        scrollDirection: ['Vertical'],
        scrollLines: 0
    };

    // Add reactive statement for data consistency
    $: {
        if (data?.buttonType == null) data.buttonType = 'left';
        if (data?.numberOfClicks == null) data.numberOfClicks = 1;
        if (data?.clickDelay == null) data.clickDelay = 0.1;
        if (data?.pressReleaseDelay == null) data.pressReleaseDelay = 100;
        if (data?.releaseAfterPress == null) data.releaseAfterPress = true;
        if (data?.scrollDirection == null || !Array.isArray(data.scrollDirection)) {
            data.scrollDirection = ['Vertical'];
        }
        if (data?.scrollLines == null) data.scrollLines = 0;
    }

    // Local UI state
    let showAdvanced = false;

    // Debug logging for data changes
    $: console.log('MouseClickNode data:', JSON.stringify(data));

    const NODE_HANDLES: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    // Event Handlers
    function handleDuplicate(): void {
        console.log("Duplicate action triggered", JSON.stringify(data));
    }

    function handleDelete(): void {
        console.log("Delete action triggered", JSON.stringify(data));
    }

    /**
     * Toggles a scroll direction in the configuration
     * @param direction - The scroll direction to toggle
     */
    function toggleDirection(direction: ScrollDirection): void {
        data.scrollDirection = data.scrollDirection ?? [];
        if (data.scrollDirection.includes(direction)) {
            data.scrollDirection = data.scrollDirection.filter(d => d !== direction);
        } else {
            data.scrollDirection.push(direction);
        }
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
        showAdvanced = !showAdvanced;
    }
</script>

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
        <ToggleGroup.Root size="lg" type="multiple">
            <ToggleGroup.Item value="bg-blue-500" aria-label="Toggle bold">
              Left
            </ToggleGroup.Item>
            <ToggleGroup.Item value="italic" aria-label="Toggle italic">
              Middle
            </ToggleGroup.Item>
            <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
              Right
            </ToggleGroup.Item>
          </ToggleGroup.Root>
    
        <ButtonGroup 
            labels={["left","middle","right"]}
            variant="default"
            highlightColor={highlightColor}
            active={data.buttonType === data.buttonType}
            onClick={() => updateButtonType(data.buttonType)}
            disabled={false}
        />

        <!-- Click Configuration -->
        <div class="grid gap-6 auto-rows-min">
            <!-- Click Count and Delay Configuration -->
            <div class="flex justify-between items-center gap-2">
                <NumberInput
                    label="Clicks"
                    bind:value={data.numberOfClicks}
                    minValue={0} 
                    maxValue={1000}
                />
                {#if data?.numberOfClicks > 1}
                    <TimeInput 
                        label="delay" 
                        bind:value={data.clickDelay}
                        defaultValue={0.1}
                    />
                {/if}
            </div>
        
            <div class="flex justify-between items-center gap-2">
                <Checkbox
                    label="Release"
                    bind:checked={data.releaseAfterPress}
                />
                {#if data?.releaseAfterPress}
                    <TimeInput 
                        label="after" 
                        bind:value={data.pressReleaseDelay}
                        defaultValue={0.1}
                    />
                {/if}
            </div>
        </div>
        
        <!-- Advanced Options Section -->
        <div class="pt-4">
            <button
                class="flex items-center justify-between w-full text-sm text-[--secondary-text] hover:text-[--secondary-text-hover] transition-colors"
                on:click={toggleAdvancedOptions}
                aria-expanded={showAdvanced}
            >
                <span>Scroll Options</span>
                <ChevronDown
                    class="w-4 h-4 transition-transform duration-200"
                    style={showAdvanced ? "transform: rotate(180deg)" : ""}
                />
            </button>

            {#if showAdvanced}
                <div class="mt-4 grid gap-6">
                    <!-- Scroll Direction Selection add default={data.scrollDirection}}-->
                    <ButtonGroup 
                        labels={['Vertical','Horizontal']}
                        variant="default"
                        highlightColor={highlightColor}
                        active={data.scrollDirection === data.scrollDirection}
                        onClick={() => toggleDirection('Vertical')}
                        disabled={false}
                    />
                    
                    <!-- Scroll Lines Input -->
                    <NumberInput
                        label="Lines"
                        bind:value={data.scrollLines}
                        minValue={-100000}
                        maxValue={100000}
                    />
                </div>
            {/if}
        </div>
    </div>
</NodeWrapper>