<!-- MouseMoveNode.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { Position } from "@xyflow/svelte";
    import type { ComponentType } from 'svelte';

    // UI Component imports
    import { MousePointer2, ChevronDown } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import Checkbox from "./nodeComponents/Checkbox.svelte";
    import NumberInput from './nodeComponents/NumberInput.svelte';

    // Type imports
    import type { HandleConfig } from './types';

    // Default configuration constants
    const DEFAULT_MOVE_SPEED = 500; // milliseconds
    const DEFAULT_VARIANCE = 20; // percentage
    const MIN_COORDINATE = -10000;
    const MAX_COORDINATE = 10000;
    const MIN_SPEED = 100;
    const MAX_SPEED = 5000;
    const MIN_VARIANCE = 0;
    const MAX_VARIANCE = 100;

    type PositionType = 'Mouse' | 'Fixed';
    type PathType = 'Straight Line' | 'Human-like' | 'Custom Recorded';
    type SpeedType = 'Instant' | 'Human-like';

    interface Coordinates {
        x: number;
        y: number;
    }

    interface Data {
        startPosition: {
            type: PositionType;
            coordinates: Coordinates;
        };
        endPosition: {
            type: PositionType;
            coordinates: Coordinates;
        };
        showMovementSettings: boolean;
        dragWhileMoving: boolean;
        speed: {
            type: SpeedType;
            value: number;
            randomize: boolean;
            variance: number;
        };
        pathType: PathType;
        customPath: Coordinates[];
        isRecording: boolean;
    }

    // Component props
    export let id: string;
    export let title: string = 'Mouse Move';
    export let icon: ComponentType = MousePointer2;
    export let color: string = 'bg-gradient-to-r from-green-500 to-green-600';
    export let data: Data = {
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
            type: 'Human-like',
            value: DEFAULT_MOVE_SPEED,
            randomize: false,
            variance: DEFAULT_VARIANCE
        },
        pathType: 'Straight Line',
        customPath: [],
        isRecording: false
    };

    // Handle configurations
    const handles: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    // Initialize default values
    onMount(() => {
        initializeDefaultValues();
    });

    function initializeDefaultValues() {
        // Set any missing values to defaults
        data.startPosition ||= {
            type: 'Mouse',
            coordinates: { x: 0, y: 0 }
        };
        data.endPosition ||= {
            type: 'Fixed',
            coordinates: { x: 0, y: 0 }
        };
        data.speed ||= {
            type: 'Human-like',
            value: DEFAULT_MOVE_SPEED,
            randomize: false,
            variance: DEFAULT_VARIANCE
        };
        data.pathType ||= 'Straight Line';
        data.customPath ||= [];
    }

    function handleDuplicate() {
        console.log("Duplicate action triggered");
    }

    function handleDelete() {
        console.log("Delete action triggered");
    }

    function toggleRecording() {
        if (!data.isRecording) {
            data.customPath = [];
            data.pathType = 'Custom Recorded';
        }
        data.isRecording = !data.isRecording;
    }

    const pathTypes: PathType[] = ['Straight Line', 'Human-like', 'Custom Recorded'];
    const speedTypes: SpeedType[] = ['Instant', 'Human-like'];
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
                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                        {data?.startPosition?.type === 'Fixed' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        border-l last:rounded-r-lg"
                    on:click={() => data.startPosition.type = 'Fixed'}
                >
                    Fixed
                </button>
                <button
                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                        {data?.startPosition?.type === 'Mouse' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        first:rounded-l-lg
                        disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
                    disabled={data?.endPosition?.type === 'Mouse'}
                    on:click={() => data.startPosition.type = 'Mouse'}
                >
                    Mouse
                </button>
            </div>
            
            {#if data?.startPosition?.type === 'Fixed'}
                <div class="grid grid-cols-2 gap-4">
                    <NumberInput
                        label="X"
                        bind:value={data.startPosition.coordinates.x}
                        minValue={MIN_COORDINATE}
                        maxValue={MAX_COORDINATE}
                    />
                    <NumberInput
                        label="Y"
                        bind:value={data.startPosition.coordinates.y}
                        minValue={MIN_COORDINATE}
                        maxValue={MAX_COORDINATE}
                    />
                </div>
            {/if}
        </div>

        <!-- End Position Configuration -->
        <div class="grid gap-4">
            <h3 class="text-sm font-medium text-gray-700">End Position</h3>
            <div class="flex border rounded-lg overflow-hidden">
                <button
                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                        {data?.endPosition?.type === 'Fixed' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        first:rounded-l-lg"
                    on:click={() => data.endPosition.type = 'Fixed'}
                >
                    Fixed
                </button>
                <button 
                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                        {data?.endPosition?.type === 'Mouse' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        border-l last:rounded-r-lg
                        disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
                    disabled={data?.startPosition?.type === 'Mouse'}
                    on:click={() => data.endPosition.type = 'Mouse'}
                >
                    Mouse
                </button>
            </div>
            
            {#if data?.endPosition?.type === 'Fixed'}
                <div class="grid grid-cols-2 gap-4">
                    <NumberInput
                        label="X"
                        bind:value={data.endPosition.coordinates.x}
                        minValue={MIN_COORDINATE}
                        maxValue={MAX_COORDINATE}
                    />
                    <NumberInput
                        label="Y"
                        bind:value={data.endPosition.coordinates.y}
                        minValue={MIN_COORDINATE}
                        maxValue={MAX_COORDINATE}
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
                        label="Drag while moving"
                        bind:checked={data.dragWhileMoving}
                    />

                    <!-- Move Speed Configuration -->
                    <div class="grid gap-4">
                        <h4 class="text-sm font-medium text-gray-700">Move Speed</h4>
                        <div class="flex border rounded-lg overflow-hidden">
                            {#each speedTypes as type}
                                <button
                                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                                        {data.speed.type === type 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                                        {type !== speedTypes[0] ? 'border-l' : ''}
                                        first:rounded-l-lg last:rounded-r-lg"
                                    on:click={() => data.speed.type = type}
                                >
                                    {type}
                                </button>
                            {/each}
                        </div>

                        {#if data.speed.type === 'Human-like'}
                            <NumberInput
                                label="Speed (ms)"
                                bind:value={data.speed.value}
                                minValue={MIN_SPEED}
                                maxValue={MAX_SPEED}
                            />
                            <div class="space-y-2">
                                <Checkbox
                                    label="Randomize Speed"
                                    bind:checked={data.speed.randomize}
                                />
                                {#if data.speed.randomize}
                                    <div class="pl-6">
                                        <NumberInput
                                            label="Variance %"
                                            bind:value={data.speed.variance}
                                            minValue={MIN_VARIANCE}
                                            maxValue={MAX_VARIANCE}
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
                            {#each pathTypes as type}
                                <button
                                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                                        {data.pathType === type 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                                        {type !== pathTypes[0] ? 'border-l' : ''}
                                        first:rounded-l-lg last:rounded-r-lg"
                                    on:click={() => data.pathType = type}
                                >
                                    {type}
                                </button>
                            {/each}
                        </div>
                        
                        {#if data.pathType === 'Custom Recorded'}
                            <button
                                class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                                class:bg-red-500={data.isRecording}
                                class:hover:bg-red-600={data.isRecording}
                                on:click={toggleRecording}
                            >
                                {data.isRecording ? 'Stop Recording' : 'Start Recording'}
                            </button>
                            {#if data.customPath.length > 0}
                                <p class="text-sm text-gray-600">
                                    Recorded points: {data.customPath.length}
                                </p>
                            {/if}
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</NodeWrapper>