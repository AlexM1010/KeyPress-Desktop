<!-- frontend\src\lib\components\customNodes\nodeComponents\Button.svelte -->
<script lang="ts">
    export let active: boolean = false;
    export let first: boolean = false;
    export let last: boolean = false;
    export let borderLeft: boolean = false;
    export let disabled: boolean = false;
    export let fullWidth: boolean = true;
    export let variant: 'default' | 'danger' = 'default';
    export let highlightColor: string = 'bg-blue-500'; // New Prop
        
    $: buttonClass = [
        'py-2 px-4 transition-all duration-200 text-sm',
        fullWidth ? 'flex-1' : '',
        active ? getActiveClass() : getInactiveClass(),
        borderLeft ? 'border-l' : '',
        first ? 'rounded-l-lg' : '',
        last ? 'rounded-r-lg' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
    ].filter(Boolean).join(' ');

    function getActiveClass(): string {
        if (variant === 'danger') {
            return 'bg-[--error] text-[--main-text] hover:bg-[--error-hover]';
        }
        return `${highlightColor} text-[--main-text] hover:bg-primary-hover`;
    }

    function getInactiveClass(): string {
        return 'bg-[--secondary] text-[--secondary-text] hover:bg-[--secondary-hover]';
    }
</script>

<button
    class={buttonClass}
    on:click
    disabled={disabled}
>
    <slot />
</button>