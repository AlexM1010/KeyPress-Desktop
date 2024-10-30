<!-- MouseClickNode.svelte -->
<script lang="ts">
    import { MousePointer } from 'lucide-svelte';
    import NodeWrapper from './NodeWrapper.svelte';
    import Select from './Select.svelte';
    import Slider from './Slider.svelte';
    import type { ComponentType } from 'svelte';

    // Props for the MouseClickNode
    export let title: string = 'Mouse Click';
    export let icon: ComponentType = MousePointer;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600';
    export let buttonTypes: string[] = ['Left Click', 'Right Click', 'Middle Click'];
    export let actions: string[] = ['Single', 'Double', 'Triple', 'Hold'];
    export let clickDuration: number = 75;

    function handleDuplicate() {
        console.log("Duplicate action triggered");
    }

    function handleDelete() {
        console.log("Delete action triggered");
    }

    $$restProps;
</script>

<NodeWrapper {icon} {title} {color} on:duplicate={handleDuplicate} on:delete={handleDelete}>
    <!-- Node Content for configuring Mouse Click options -->
    <Select label="Button Type" options={buttonTypes} icon={MousePointer} />
    <Select label="Click Action" options={actions} />
    <Slider label="Click Duration" defaultValue={clickDuration} />
</NodeWrapper>
