<!--
MouseMoveNode.svelte
A configurable node component for the XYFlow graph editor that handles mouse movement operations.

Features:
- Configurable start and end positions (Fixed coordinates or Mouse position)
- Movement settings including:
  - Drag while moving option
  - Speed control (Instant or Human-like with randomization)
  - Path type selection (Straight or Human-like)
- Interactive UI with collapsible settings panel
- Input validation and bounds checking
- Node connection handles for graph integration

@component
@requires @xyflow/svelte
@requires lucide-svelte
-->

<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ComponentType } from 'svelte';
    import { Mouse, ChevronDown } from 'lucide-svelte';
    
    // Component Imports
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import Checkbox from "./nodeComponents/Checkbox.svelte";
    import NumberInput from './nodeComponents/NumberInput.svelte';
    import Slider from './nodeComponents/Slider.svelte';
    import TimeInput from './nodeComponents/TimeInput.svelte';
    import type { HandleConfig } from './types';

    // Type definitions
    type PositionType = 'Mouse' | 'Fixed';
    type PathType = 'Straight' | 'Human';
    type SpeedType = 'Instant' | 'Human';

    interface Coordinates {
        x: number;
        y: number;
    }

    interface MouseMoveTaskData {
        startPosition: {
            type: PositionType;
            coordinates: Coordinates;
        };
        endPosition: {
            type: PositionType;
            coordinates: Coordinates;
        };
        dragWhileMoving: boolean;
        speed: {
            type: SpeedType;
            value: number;
            randomize: boolean;
            variance: number;
        };
        pathType: PathType;
        customPath: Coordinates[];
    }

    // Props
    export let id: string;
    export let title: string = 'Mouse Move';
    export let icon: ComponentType = Mouse;
    export let color: string = 'bg-gradient-to-r from-green-500 to-green-600';
    
    // Data initialization with default values
    export let data: MouseMoveTaskData = {
        startPosition: {
            type: 'Mouse',
            coordinates: { x: 0, y: 0 }
        },
        endPosition: {
            type: 'Fixed',
            coordinates: { x: 0, y: 0 }
        },
        dragWhileMoving: false,
        speed: {
            type: 'Instant',
            value: 500,
            randomize: false,
            variance: 20
        },
        pathType: 'Straight',
        customPath: []
    };

    // Reactive statement for data consistency
    $: {
        if (data?.startPosition == null) data.startPosition = { type: 'Mouse', coordinates: { x: 0, y: 0 } };
        if (data?.endPosition == null) data.endPosition = { type: 'Fixed', coordinates: { x: 0, y: 0 } };
        if (data?.dragWhileMoving == null) data.dragWhileMoving = false;
        if (data?.speed == null) {
            data.speed = {
                type: 'Instant',
                value: 500,
                randomize: false,
                variance: 20
            };
        }
        if (data?.pathType == null) data.pathType = 'Straight';
        if (data?.customPath == null) data.customPath = [];
    }

    // Local UI state
    let showMovementSettings = false;

    // Debug logging
    $: console.log('MouseMoveNode data:', JSON.stringify(data));

    /**
     * Node connection handle configuration
     */
    const handles: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    // Available options
    const PATH_TYPES: PathType[] = ['Straight', 'Human'];
    const SPEED_TYPES: SpeedType[] = ['Instant', 'Human'];
    const POSITION_TYPES: PositionType[] = ['Fixed', 'Mouse'];

    // Constants
    const CONFIG = {
        POSITION: {
            MIN: -10000,
            MAX: 10000
        },
        SPEED: {
            DEFAULT: 500,
            MIN: 100,
            MAX: 5000
        },
        VARIANCE: {
            DEFAULT: 20,
            MIN: 0,
            MAX: 100
        }
    } as const;

    // Event handlers
    function handleDuplicate(): void {
        console.log("Duplicate action triggered", JSON.stringify(data));
    }

    function handleDelete(): void {
        console.log("Delete action triggered", JSON.stringify(data));
    }

    /**
     * Helper function to generate button classes
     */
    function getButtonClasses(isActive: boolean, isFirst: boolean = false, isLast: boolean = false, isDisabled: boolean = false): string {
        return `
            flex-1 py-2 px-4 transition-colors duration-200 text-sm
            ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
            ${!isFirst ? 'border-l' : ''}
            ${isFirst ? 'first:rounded-l-lg' : ''}
            ${isLast ? 'last:rounded-r-lg' : ''}
            ${isDisabled ? 'disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-gray-100' : ''}
        `;
    }
</script>

<NodeWrapper
    {id}
    {icon}
    {title}
    {color}
    type="Move"
    {handles}
    bind:data
    on:duplicate={handleDuplicate}
    on:delete={handleDelete}
>
    <div class="grid gap-6">
        <!-- Start Position Configuration -->
        <div class="grid gap-4">
            <h3 class="text-sm font-medium text-gray-700">Start Position</h3>
            <div class="flex border rounded-lg overflow-hidden">
                <button 
                    class={getButtonClasses(data.startPosition.type === 'Fixed', true)}
                    on:click={() => data.startPosition.type = 'Fixed'}
                >
                    Fixed
                </button>
                <button
                    class={getButtonClasses(data.startPosition.type === 'Mouse', false, true, data.endPosition.type === 'Mouse')}
                    disabled={data.endPosition.type === 'Mouse'}
                    on:click={() => data.startPosition.type = 'Mouse'}
                >
                    Mouse
                </button>
            </div>
            
            {#if data.startPosition.type === 'Fixed'}
                <div class="grid grid-cols-2 gap-4">
                    <NumberInput
                        label="X"
                        bind:value={data.startPosition.coordinates.x}
                        minValue={CONFIG.POSITION.MIN}
                        maxValue={CONFIG.POSITION.MAX}
                    />
                    <NumberInput
                        label="Y"
                        bind:value={data.startPosition.coordinates.y}
                        minValue={CONFIG.POSITION.MIN}
                        maxValue={CONFIG.POSITION.MAX}
                    />
                </div>
            {/if}
        </div>

        <!-- End Position Configuration -->
        <div class="grid gap-4">
            <h3 class="text-sm font-medium text-gray-700">End Position</h3>
            <div class="flex border rounded-lg overflow-hidden">
                <button
                    class={getButtonClasses(data.endPosition.type === 'Fixed', true)}
                    on:click={() => data.endPosition.type = 'Fixed'}
                >
                    Fixed
                </button>
                <button 
                    class={getButtonClasses(data.endPosition.type === 'Mouse', false, true, data.startPosition.type === 'Mouse')}
                    disabled={data.startPosition.type === 'Mouse'}
                    on:click={() => data.endPosition.type = 'Mouse'}
                >
                    Mouse
                </button>
            </div>
            
            {#if data.endPosition.type === 'Fixed'}
                <div class="grid grid-cols-2 gap-4">
                    <NumberInput
                        label="X"
                        bind:value={data.endPosition.coordinates.x}
                        minValue={CONFIG.POSITION.MIN}
                        maxValue={CONFIG.POSITION.MAX}
                    />
                    <NumberInput
                        label="Y"
                        bind:value={data.endPosition.coordinates.y}
                        minValue={CONFIG.POSITION.MIN}
                        maxValue={CONFIG.POSITION.MAX}
                    />
                </div>
            {/if}
        </div>

        <!-- Movement Settings -->
        <div class="border-t pt-4">
            <button
                class="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
                on:click={() => showMovementSettings = !showMovementSettings}
                aria-expanded={showMovementSettings}
            >
                <span>Movement Settings</span>
                <ChevronDown
                    class="w-4 h-4 transition-transform duration-200"
                    style={showMovementSettings ? "transform: rotate(180deg)" : ""}
                />
            </button>

            {#if showMovementSettings}
                <div class="mt-4 grid gap-6">
                    <!-- Drag Option -->
                    <Checkbox
                        label="Drag"
                        bind:checked={data.dragWhileMoving}
                    />

                    <!-- Move Speed Configuration -->
                    <div class="grid gap-4">
                        <h4 class="text-sm font-medium text-gray-700">Move Speed</h4>
                        <div class="flex border rounded-lg overflow-hidden">
                            {#each SPEED_TYPES as type, index}
                                <button
                                    class={getButtonClasses(
                                        data.speed.type === type,
                                        index === 0,
                                        index === SPEED_TYPES.length - 1
                                    )}
                                    on:click={() => data.speed.type = type}
                                >
                                    {type}
                                </button>
                            {/each}
                        </div>

                        {#if data.speed.type === 'Human'}
                            <TimeInput
                                label="Speed"
                                bind:value={data.speed.value}
                                defaultValue={CONFIG.SPEED.DEFAULT}
                                startingUnit="ms"
                            />
                            <div class="flex items-center gap-4">
                                <Checkbox
                                    label="Randomize"
                                    bind:checked={data.speed.randomize}
                                />
                                {#if data.speed.randomize}
                                    <div class="flex-1">
                                        <Slider
                                            label="Variance"
                                            unit="%"
                                            bind:value={data.speed.variance}
                                            min={CONFIG.VARIANCE.MIN}
                                            max={CONFIG.VARIANCE.MAX}
                                            defaultValue={CONFIG.VARIANCE.DEFAULT}
                                        />
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>

                    <!-- Path Type Configuration -->
                    <div class="grid gap-4">
                        <h4 class="text-sm font-medium text-gray-700">Path Type</h4>
                        <div class="flex border rounded-lg overflow-hidden">
                            {#each PATH_TYPES as type, index}
                                <button
                                    class={getButtonClasses(
                                        data.pathType === type,
                                        index === 0,
                                        index === PATH_TYPES.length - 1
                                    )}
                                    on:click={() => data.pathType = type}
                                >
                                    {type}
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</NodeWrapper>