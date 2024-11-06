<script lang="ts">
    export let label: string;
    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let id = crypto.randomUUID();
</script>

<div class="checkbox-container select-none">
    <label 
        for={id} 
        class="flex items-center cursor-pointer {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
    >
        <span class="mr-2 text-sm text-gray-700">{label}</span>
        <input
            {id}
            type="checkbox"
            bind:checked
            {disabled}
            class="sr-only absolute"
            aria-checked={checked}
            aria-label={label}
        />
        <div class="checkbox-custom relative">
            {#if checked}
                <svg 
                    class="check-mark" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M10 3L4.5 8.5L2 6" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    />
                </svg>
            {/if}
        </div>
    </label>
</div>

<style>
    .checkbox-container {
        display: inline-block;
        margin: 0; /* Remove spacing around the component */
    }

    .checkbox-custom {
        width: 18px;
        height: 18px;
        border: 2px solid #d1d5db;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        background-color: white;
    }

    .check-mark {
        position: absolute;
        width: 12px;
        height: 12px;
        color: white;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    input[type="checkbox"]:checked + .checkbox-custom {
        background-color: #3b82f6;
        border-color: #3b82f6;
    }

    input[type="checkbox"]:focus + .checkbox-custom {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }

    label:hover .checkbox-custom {
        border-color: #3b82f6;
    }

    label.cursor-not-allowed:hover .checkbox-custom {
        border-color: #d1d5db;
    }
</style>