<!-- ButtonGroup.svelte -->
<script lang="ts">
    export let active: boolean = false;
    export let first: boolean = false;
    export let last: boolean = false;
    export let borderLeft: boolean = false;
    export let disabled: boolean = false;
    export let fullWidth: boolean = true;
    export let variant: 'default' | 'danger' = 'default';
    
    $: buttonClass = [
        'py-2 px-4 transition-colors duration-200 text-sm',
        fullWidth ? 'flex-1' : '',
        active ? getActiveClass() : getInactiveClass(),
        borderLeft ? 'border-l' : '',
        first ? 'rounded-l-lg' : '',
        last ? 'rounded-r-lg' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
    ].filter(Boolean).join(' ');

    function getActiveClass(): string {
        if (variant === 'danger') {
            return 'bg-red-500 text-white hover:bg-red-600';
        }
        return 'bg-blue-500 text-white';
    }

    function getInactiveClass(): string {
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
    }
</script>

<button
    class={buttonClass}
    on:click
    {disabled}
>
    <slot />
</button>