<!-- KeyboardNode.svelte -->
<script lang="ts">
    import { Keyboard } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import Select from './nodeComponents/Select.svelte';
    import Slider from './nodeComponents/Slider.svelte';
    import type { ComponentType } from 'svelte';

    // Props for the KeyboardInputNode
    export let title: string = 'Keypress';
    export let icon: ComponentType = Keyboard;
    export let color: string = 'bg-gradient-to-r from-orange-500 to-orange-600';
    export let keyActions: string[] = ['Press', 'Hold', 'Release'];
    export let modifierKeys: string[] = ['None', 'Shift', 'Ctrl', 'Alt', 'Windows']; // will need Command for Mac
    export let pressDuration: number = 50;

    function handleDuplicate() {
        console.log("Duplicate action triggered");
    }

    function handleDelete() {
        console.log("Delete action triggered");
    }

    $$restProps;
</script>

<NodeWrapper 
    {icon} 
    {title} 
    {color} 
    id="unique-id" 
    type="custom-type" 
    data={{}} 
    on:duplicate={handleDuplicate} 
    on:delete={handleDelete}
>
    <!-- Node Content for configuring Keyboard Input options -->
    <Select label="Key Action" options={keyActions} icon={Keyboard} />
    <Select label="Modifier Key" options={modifierKeys} />
    <Slider label="Press Duration" defaultValue={pressDuration} />
</NodeWrapper>