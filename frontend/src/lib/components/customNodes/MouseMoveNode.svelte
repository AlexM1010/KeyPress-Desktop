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

    /**
     * Constants for configuration boundaries and defaults
     */
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

    /**
     * Type definitions for component configuration
     */
    type PositionType = 'Mouse' | 'Fixed';
    type PathType = 'Straight' | 'Human';
    type SpeedType = 'Instant' | 'Human';

    interface Coordinates {
        x: number;
        y: number;
    }

    interface PositionConfig {
        type: PositionType;
        coordinates: Coordinates;
    }

    interface SpeedConfig {
        type: SpeedType;
        value: number;
        randomize: boolean;
        variance: number;
    }

    interface NodeData {
        startPosition: PositionConfig;
        endPosition: PositionConfig;
        showMovementSettings: boolean;
        dragWhileMoving: boolean;
        speed: SpeedConfig;
        pathType: PathType;
        customPath: Coordinates[];
        isRecording: boolean;
    }

    interface HandleConfig {
        id: string;
        type: "source" | "target";
        position: Position;
        offsetY: number;
    }

    /**
     * Component Props
     */
    export let id: string;
    export let title: string = 'Mouse Move';
    export let icon: ComponentType = Mouse;
    export let color: string = 'bg-gradient-to-r from-green-500 to-green-600';
    export let data: NodeData;

    /**
     * Initialize default data configuration
     */
    const DEFAULT_DATA: NodeData = {
        startPosition: {
            type: 'Mouse',
            coordinates: { x: 0, y: 0 }
        },
        endPosition: {
            type: 'Fixed',
            coordinates: { x: 0, y: 0 }
        },
        showMovementSettings: false,
        dragWhileMoving: false,
        speed: {
            type: 'Instant',
            value: CONFIG.SPEED.DEFAULT,
            randomize: false,
            variance: CONFIG.VARIANCE.DEFAULT
        },
        pathType: 'Straight',
        customPath: [],
        isRecording: false
    };

    /**
     * Reactive data initialization with fallback to defaults
     */
    $: data = {
        startPosition: {
            type: data?.startPosition?.type || DEFAULT_DATA.startPosition.type,
            coordinates: {
                x: data?.startPosition?.coordinates?.x ?? DEFAULT_DATA.startPosition.coordinates.x,
                y: data?.startPosition?.coordinates?.y ?? DEFAULT_DATA.startPosition.coordinates.y
            }
        },
        endPosition: {
            type: data?.endPosition?.type || DEFAULT_DATA.endPosition.type,
            coordinates: {
                x: data?.endPosition?.coordinates?.x ?? DEFAULT_DATA.endPosition.coordinates.x,
                y: data?.endPosition?.coordinates?.y ?? DEFAULT_DATA.endPosition.coordinates.y
            }
        },
        showMovementSettings: data?.showMovementSettings ?? DEFAULT_DATA.showMovementSettings,
        dragWhileMoving: data?.dragWhileMoving ?? DEFAULT_DATA.dragWhileMoving,
        speed: {
            type: data?.speed?.type || DEFAULT_DATA.speed.type,
            value: data?.speed?.value ?? DEFAULT_DATA.speed.value,
            randomize: data?.speed?.randomize ?? DEFAULT_DATA.speed.randomize,
            variance: data?.speed?.variance ?? DEFAULT_DATA.speed.variance
        },
        pathType: data?.pathType || DEFAULT_DATA.pathType,
        customPath: data?.customPath || DEFAULT_DATA.customPath,
        isRecording: data?.isRecording ?? DEFAULT_DATA.isRecording
    };

    /**
     * Node connection handle configuration
     */
    const handles: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    /**
     * Available configuration options
     */
    const pathTypes: PathType[] = ['Straight', 'Human'];
    const speedTypes: SpeedType[] = ['Instant', 'Human'];

    /**
     * Event Handlers
     */
    function handleDuplicate(): void {
        console.log("Duplicate action triggered");
    }

    function handleDelete(): void {
        console.log("Delete action triggered");
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
                on:click={() => data.showMovementSettings = !data.showMovementSettings}
                aria-expanded={data.showMovementSettings}
            >
                <span>Movement Settings</span>
                <ChevronDown
                    class="w-4 h-4 transition-transform duration-200"
                    style={data.showMovementSettings ? "transform: rotate(180deg)" : ""}
                />
            </button>

            {#if data.showMovementSettings}
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
                            {#each speedTypes as type, index}
                                <button
                                    class={getButtonClasses(
                                        data.speed.type === type,
                                        index === 0,
                                        index === speedTypes.length - 1
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
                            {#each pathTypes as type, index}
                                <button
                                    class={getButtonClasses(
                                        data.pathType === type,
                                        index === 0,
                                        index === pathTypes.length - 1
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