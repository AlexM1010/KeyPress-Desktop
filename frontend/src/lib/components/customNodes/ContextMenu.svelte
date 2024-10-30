<!-- ContextMenu.svelte -->
<script lang="ts">
    import { Trash2, Copy } from 'lucide-svelte';
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';

    export let position = { x: 0, y: 0 };
    const dispatch = createEventDispatcher();

    function closeMenu() {
        dispatch('close');
    }

    function handleDuplicate() {
        closeMenu();
        dispatch('duplicate');
    }

    function handleDelete() {
        closeMenu();
        dispatch('delete');
    }

    function handleClickOutside(event: MouseEvent) {
        if (!event.target || !(event.target as HTMLElement).closest('.context-menu')) {
            closeMenu();
        }
    }

    // Add and remove event listener on mount and destroy
    onMount(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onDestroy(() => {
        document.removeEventListener('click', handleClickOutside);
    });
</script>

<div
    class="context-menu"
    style="top: {position.y}px; left: {position.x}px;"
>
    <button on:click={handleDuplicate} class="context-item">
        <Copy class="icon" /> Duplicate
    </button>
    <button on:click={handleDelete} class="context-item">
        <Trash2 class="icon" /> Delete
    </button>
</div>

<style>
    .context-menu {
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 0.5rem;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        z-index: 100;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }

    .context-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: white;
        padding: 0.5rem;
        font-size: 0.875rem;
        cursor: pointer;
        background: transparent;
        border: none;
        text-align: left;
    }

    .context-item:hover {
        background: rgba(255, 255, 255, 0.2);
    }
</style>
