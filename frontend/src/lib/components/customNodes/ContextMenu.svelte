<script lang="ts">
    import { Trash2, Copy } from 'lucide-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleDuplicate() {
        dispatch('duplicate');
    }

    function handleDelete() {
        dispatch('delete');
    }
</script>

<div class="context-menu">
    <button
        on:click={handleDuplicate}
        aria-label="Duplicate"
        class="icon-button"
    >
        <Copy class="icon" />
    </button>
    <button
        on:click={handleDelete}
        aria-label="Delete"
        class="icon-button"
    >
        <Trash2 class="icon" />
    </button>
</div>

<style>
    .context-menu {
        display: flex;
        gap: 0.5rem;
        background: rgba(0, 0, 0, 0.8);
        padding: 0.5rem;
        border-radius: 0.5rem;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1;
    }

    .icon-button {
        background: none;
        border: none;
        cursor: pointer;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-button:hover {
        color: #f3f4f6;
    }

    .icon {
        width: 24px;
        height: 24px;
    }
</style>
