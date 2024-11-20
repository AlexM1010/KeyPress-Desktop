<!-- frontend\src\lib\components\customNodes\NumberInput.svelte -->
<script lang="ts">
    //TODO: update input component primary colours based on header primary colour adjust components for dark mode
    //TODO: add more tooltips to properly explain controls, allows more vauge descriptions  Sv-tooltip
    //TODO: allow up and down arrows to be held not just clicked to change values quickly
    import { ChevronUp, ChevronDown } from 'lucide-svelte';

    export let label: string = '';
    export let value: number = 0;
    export let minValue: number | null = null;
    export let maxValue: number | null = null;
    export let step: number = 1;
    export let showArrows: boolean = true;

    let isInvalid: boolean = false;

    function increment() {
        if (maxValue === null || value + step <= maxValue) {
            value += step;
        }
    }

    function decrement() {
        if (minValue === null || value - step >= minValue) {
            value -= step;
        }
    }

    $: inputWidth = `${Math.max(String(value).length * 0.6 + 1, 1)}em`; //TODO: max value not working? 
    $: if (maxValue !== null && value > maxValue) {
        value = maxValue;
        isInvalid = true;
    } else {
        isInvalid = false;
    }
</script>

<style>
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        appearance: textfield;
        -moz-appearance: textfield;
        text-align: center;
        background-color: #f3f3f3;
        transition: background-color 0.3s;
    }

    input[type="number"]:hover {
        background-color: #e0e0e0;
    }

    .input-error {
        border-color: red;
    }

    .arrow-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1rem;
        background-color: #e5e7eb;
        padding: 0;
        transition: background-color 0.2s;
    }

    .arrow-button:hover {
        background-color: #d1d5db;
    }
</style>

<div class="flex flex-col">
    <div class="flex items-center">
        {#if label}
            <label for="number-input" class="text-sm text-gray-700 mr-2">{label}</label>
        {/if}
        <div class="flex">
            <input 
                type="number"
                bind:value
                id="number-input" 
                class="h-8 px-2 bg-gray-100 text-right 
                    {isInvalid ? 'border border-red-500 input-error' : ''} 
                    {showArrows ? 'rounded-l-md' : 'rounded-md'}"
                style="width: {inputWidth}"
                min={minValue}
                max={maxValue}
                step={step}
            />
            {#if showArrows}
                <div class="flex flex-col">
                    <button 
                        on:click={increment}
                        class="arrow-button rounded-tr-md"
                        aria-label="Increment"
                    >
                        <ChevronUp size={14} />
                    </button>
                    <button 
                        on:click={decrement}
                        class="arrow-button rounded-br-md"
                        aria-label="Decrement"
                    >
                        <ChevronDown size={14} />
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>