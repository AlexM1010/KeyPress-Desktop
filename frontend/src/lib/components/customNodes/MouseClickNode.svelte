<!-- MouseClickNode.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { MousePointer } from 'lucide-svelte';
    import NodeWrapper from './NodeWrapper.svelte';
    import { Position } from "@xyflow/svelte";
    import type { HandleConfig } from './types';
    import Select from './Select.svelte';
    import Slider from './Slider.svelte';
    import type { ComponentType } from 'svelte';

    export let id: string;
    export let title: string = 'Mouse Click';
    export let icon: ComponentType = MousePointer;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600';

    interface Data {
        buttonType: string;
        actionType: string;
        clickDuration: number;
    }

    export let data: Data = {
        buttonType: 'Left Click',
        actionType: 'Single',
        clickDuration: 75
    };

    // Set default values for data if they are undefined
    onMount(() => {
        if (!data.buttonType) data.buttonType = 'Left Click';
        if (!data.actionType) data.actionType = 'Single';
        if (data.clickDuration === undefined) data.clickDuration = 75;
    });

    // Define handles for the node
    const handles: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    function handleDuplicate() {
        console.log("Duplicate action triggered");
    }

    function handleDelete() {
        console.log("Delete action triggered");
    }
</script>

<NodeWrapper
    id={id}
    icon={icon}
    {title}
    {color}
    type="Click"
    {handles}
    bind:data
    on:duplicate={handleDuplicate}
    on:delete={handleDelete}
>
    <div class="space-y-4">
        <Select
            label="Button Type"
            options={['Left Click', 'Right Click', 'Middle Click']}
            bind:value={data.buttonType}
            icon={MousePointer}
        />
        <Select
            label="Click Action"
            options={['Single', 'Double', 'Triple', 'Hold']}
            bind:value={data.actionType}
        />
        <Slider
            label="Click Duration"
            bind:value={data.clickDuration}
        />
    </div>
</NodeWrapper>