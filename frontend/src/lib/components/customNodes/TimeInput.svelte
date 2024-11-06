<!-- frontend\src\lib\components\customNodes\TimeInput.svelte -->
<script lang="ts">
    import { writable, type Writable, derived } from 'svelte/store';
    import { ChevronUp, ChevronDown } from 'lucide-svelte';

    type TimeUnit = 'ms' | 's' | 'min';

    interface ConversionFactors {
        ms: number;
        s: number;
        min: number;
    }

    // Conversion factors to milliseconds
    const TO_MS: ConversionFactors = {
        'ms': 1,
        's': 1000,
        'min': 60 * 1000
    };

    // Display names for tooltip
    const UNIT_DISPLAY_NAMES: Record<TimeUnit, string> = {
        'ms': 'milliseconds',
        's': 'seconds',
        'min': 'minutes'
    };

    export let label = '';
    export let defaultValue = 1;
    export let value = writable(defaultValue * 1000);
    export let unit: Writable<TimeUnit> = writable('s');

    // Arrow controls
    export let showArrows: boolean = true;
    export let step: number = 1;
    export let minValue: number | null = null;
    export let maxValue: number | null = null;

    const UNITS: TimeUnit[] = ['ms', 's', 'min'];
    let significantDigits = 2;

    // Derived store for the next unit in sequence
    const nextUnit = derived(unit, $unit => 
        UNITS[(UNITS.indexOf($unit) + 1) % UNITS.length]
    );

    // Derived store for display value
    const displayValue = derived([value, unit], ([$value, $unit]) => {
        const conversionFactor = TO_MS[$unit];
        const converted = $value / conversionFactor;
        const precision = significantDigits > 0 ? significantDigits : 2;
        return Number(converted.toFixed(precision));
    });

    function handleInputChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value;
        
        // Update significant digits based on decimal places
        significantDigits = inputValue.split('.')[1]?.length ?? 0;
        
        // Convert input value to milliseconds
        const numericValue = Number(inputValue);
        if (!isNaN(numericValue)) {
            const valueInMs = numericValue * TO_MS[$unit];
            value.set(valueInMs);
        }
    }

    function handleUnitChange() {
        unit.update(currentUnit => 
            UNITS[(UNITS.indexOf(currentUnit) + 1) % UNITS.length]
        );
    }

    function increment() { //TODO update these methods to work when holding down up/down buttons - NumberInput also needs 
        let newValue = $displayValue + step;
        if (maxValue === null || newValue <= maxValue) {
            const valueInMs = newValue * TO_MS[$unit];
            value.set(valueInMs);
        }
    }

    function decrement() {
        let newValue = $displayValue - step;
        const min = minValue !== null ? minValue : 0;
        if (newValue >= min) {
            const valueInMs = newValue * TO_MS[$unit];
            value.set(valueInMs);
        }
    }

    $: inputWidth = `${Math.max(String($displayValue).length * 0.6 + 1.2, 3)}em`;

    // Handle invalid input
    let isInvalid: boolean = false;
    $: if (maxValue !== null && $displayValue > maxValue) {
        isInvalid = true;
    } else {
        isInvalid = false;
    }
</script>

<div class="flex items-center gap-2">
    {#if label}
        <label 
            for="time-input" 
            class="text-sm text-gray-700"
        >
            {label}
        </label>
    {/if}
    
    <div class="flex items-center">
        <input 
            type="number"
            value={$displayValue}
            on:input={handleInputChange}
            id="time-input" 
            class="h-8 px-2 bg-gray-100 text-right border-r border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   {isInvalid ? 'border-red-500' : ''} {showArrows ? 'rounded-l-md' : 'rounded-l-lg'}"
            style="width: {inputWidth}"
            step="any"
            min="0"
        />

        {#if showArrows}
            <div class="flex flex-col">
                <button 
                    on:click={increment}
                    class="arrow-button"
                    aria-label="Increment"
                >
                    <ChevronUp size={14} />
                </button>
                <button 
                    on:click={decrement}
                    class="arrow-button"
                    aria-label="Decrement"
                >
                    <ChevronDown size={14} />
                </button>
            </div>
        {/if}

        <button 
            type="button"
            on:click={handleUnitChange} 
            class="h-8 px-2 bg-blue-500 text-white w-[40px] text-center 
                   relative group hover:bg-blue-600 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                   {showArrows ? 'rounded-r-md' : 'rounded-r-lg'}"
        >
            {$unit}
            <div class="absolute hidden group-hover:block bg-gray-800 text-white text-xs 
                      rounded py-1 px-2 bottom-full mb-1 left-1/2 transform -translate-x-1/2 
                      whitespace-nowrap z-10">
                Click to convert to {UNIT_DISPLAY_NAMES[$nextUnit]}
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 
                          border-4 border-transparent border-t-gray-800">
                </div>
            </div>
        </button>
    </div>
</div>

<style>
    input[type="number"] {
        -moz-appearance: textfield;
        appearance: textfield;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Ensure input maintains its style when disabled */
    input[type="number"]:disabled {
        opacity: 0.7;
        cursor: not-allowed;
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