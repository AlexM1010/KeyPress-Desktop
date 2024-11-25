<!-- frontend\src\lib\components\customNodes\nodeComponents\ButtonGroup.svelte -->
<script lang="ts">
    import Button from './Button.svelte';

    export let labels: string[];
    export let variant: 'default' | 'danger' | undefined;
    export let highlightColor: string | undefined;
    export let active: boolean | undefined;
    export let disabled: boolean | undefined;
    export let onClick: (() => void) | undefined;
    
    export let fullWidth: boolean = true;

    // Generate buttons array from labels and shared props
    $: buttons = labels.map(label => ({
        label,
        variant,
        highlightColor: active ? highlightColor : undefined,
        active,
        disabled,
        onClick,
    }));
</script>

<div class="flex rounded-lg overflow-hidden">
    {#each buttons as btn, index}
        <Button
            active={btn.active}
            variant={btn.variant || "default"}
            highlightColor={btn.highlightColor || "bg-primary"}
            first={index === 0}
            last={index === buttons.length - 1}
            disabled={btn.disabled}
            {fullWidth}
            on:click={btn.onClick}
        >
            {btn.label}
        </Button>
    {/each}
</div>