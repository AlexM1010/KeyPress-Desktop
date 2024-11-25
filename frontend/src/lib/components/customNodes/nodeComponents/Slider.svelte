<!-- frontend\src\lib\components\customNodes\Slider.svelte -->
<script lang="ts">
    export let label: string;
    export let defaultValue: number = 50;
    export let value: number = defaultValue;
    export let unit: string = '%';
    export let min: number = 0;
    export let max: number = 100;
    export let step: number = 1;
    export let id = crypto.randomUUID();
    export let highlightColor: string = 'gray-500';

    import '$lib/index.scss';

    // Validate and constrain value
    $: value = Math.min(Math.max(value, min), max);

    // Event handlers
    function handleMouseDown(e: MouseEvent) {
        e.stopPropagation();
    }

    function handleTouchStart(e: TouchEvent) {
        e.stopPropagation();
    }
</script>

<div class="slider-container space-y-1.5 select-none" style="--highlight-color: {highlightColor};"> 
    <div class="flex justify-between min-w-[120px]">
        <label for={id} class="text-xs font-medium --main-text">{label}</label>
        <span class="text-xs --main-text w-12 text-right">{value}{unit}</span>
    </div>
    <input 
        {id}
        type="range"
        {min}
        {max}
        {step}
        bind:value
        on:mousedown={handleMouseDown}
        on:touchstart={handleTouchStart}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        class="{highlightColor}"
    />
</div>

<style>
    input[type="range"] {
        width: 100%;
        height: 0.5rem;
        background-color: var(--accent-text);
        border-radius: 0.5rem;
        accent-color: var(--highlight-color);
        cursor: pointer;
        touch-action: none;
    }

    .slider-container {
        isolation: isolate;
    }

    input[type="range"] {
        user-select: none;
        -webkit-user-select: none;
        pointer-events: auto !important;
        -webkit-appearance: none;
        appearance: none;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: var(--highlight-color);
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.1s;
    }

    input[type="range"]::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: #3b82f6;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.1s;
        border: none;
    }

    input[type="range"]:focus {
        outline: none;
    }

    input[type="range"]:focus::-webkit-slider-thumb {
        transform: scale(1.1);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    input[type="range"]:focus::-moz-range-thumb {
        transform: scale(1.1);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    /* Prevent parent node dragging */
    .slider-container {
        pointer-events: none;
    }

    input[type="range"],
    label,
    span {
        pointer-events: auto;
    }
</style>