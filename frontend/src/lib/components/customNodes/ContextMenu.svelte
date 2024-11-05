<script lang="ts">
    import { Trash2, Copy } from 'lucide-svelte';
    import { createEventDispatcher } from 'svelte';
    import { isDarkMode } from '$lib/stores/themeStore';

    const dispatch = createEventDispatcher();

    function handleDuplicate() {
        dispatch('duplicate');
    }

    function handleDelete() {
        dispatch('delete');
    }
</script>

<div class="context-menu" class:dark={$isDarkMode}>
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
        --icon-color: #4a5568;          /* Medium gray */
        --icon-hover-color: #2d3748;    /* Darker medium gray */
        
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 1rem; 
        position: absolute;           
        z-index: 1;
        top: -50px;    
        right: 10px; 
    }

    .context-menu.dark {
        --icon-color: #9ca3af;          /* Light gray */
        --icon-hover-color: #d1d5db;    /* Lighter gray */
    }

    .icon-button {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--icon-color);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
    }

    .icon-button:hover {
        color: var(--icon-hover-color);
    }

    :global(.context-menu-container) {
        animation: slideIn 200ms cubic-bezier() forwards;
    }

    @keyframes slideIn {
        from {
            transform: translateY(50px);
        }
        to {
            transform: translateY(0);
        }
    }
</style>