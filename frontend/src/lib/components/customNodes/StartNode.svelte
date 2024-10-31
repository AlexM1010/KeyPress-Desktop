<!-- MouseClickNode.svelte -->
<script lang="ts">
    import { Play } from 'lucide-svelte';
    import NodeWrapper from './NodeWrapper.svelte';
    import type { ComponentType } from 'svelte';

    // Props for the MouseClickNode
    export let title: string = 'Start';
    export let icon: ComponentType = Play;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600';

    function handleDuplicate() {
        console.log("Duplicate action triggered");
    }

    function handleDelete() {
        console.log("Delete action triggered");
    }

    $$restProps;
</script>

<NodeWrapper {icon} {title} {color} on:duplicate={handleDuplicate} on:delete={handleDelete}></NodeWrapper>
