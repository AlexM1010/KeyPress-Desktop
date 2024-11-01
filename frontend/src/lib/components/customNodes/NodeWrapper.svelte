<!-- NodeWrapper.svelte -->
<script lang="ts">
    import { writable } from 'svelte/store';
    import { ChevronDown } from 'lucide-svelte';
    import type { ComponentType } from 'svelte';
    import { Handle, Position } from '@xyflow/svelte';
    import type { HandleConfig } from './types';
    import ContextMenu from './ContextMenu.svelte';

    export let icon: ComponentType;
    export let title: string;
    export let color: string;
    export let isExpanded: boolean = true;
    export let isConnectable: boolean = true;

    // Default handles configuration
    export let handles: HandleConfig[] = [
        //{ id: 'top', type: 'target', position: Position.Top, offsetY: 50 },
        { id: 'right', type: 'source', position: Position.Right, offsetY: 50 },
        //{ id: 'bottom', type: 'source', position: Position.Bottom, offsetY: 50 },
        { id: 'left', type: 'target', position: Position.Left, offsetY: 50 }
    ];

    let isHovered = writable(false);
    let showContextMenu = writable(false);
    let contextMenuPosition = { x: 0, y: 0 };

    function getHandlePosition(handle: HandleConfig): string {
        const offsetX = handle.offsetX ?? 0;
        const offsetY = handle.offsetY ?? 0;

        switch (handle.position) {
            case Position.Left:
                return `top: ${offsetY}%; left: ${offsetX}%;`;
            case Position.Right:
                return `top: ${offsetY}%; right: ${offsetX}%;`;
            case Position.Top:
                return `left: ${offsetY}%; top: ${offsetX}%;`;
            case Position.Bottom:
                return `left: ${offsetY}%; bottom: ${offsetX}%;`;
            default:
                return "";
        }
    }

    function toggleExpand() {
        isExpanded = !isExpanded;
    }

    function openContextMenu(event: MouseEvent) {
        event.preventDefault();

        if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            contextMenuPosition = { x, y };
            showContextMenu.set(true);
        }
    }

    function closeContextMenu() {
        showContextMenu.set(false);
    }

    function handleDuplicate() {
        console.log("Duplicate action triggered");
        // You can dispatch an event or handle duplication logic here
    }

    function handleDelete() {
        console.log("Delete action triggered");
        // You can dispatch an event or handle deletion logic here
    }
</script>

<div
    class="node-wrapper relative border border-gray-200"
    on:mouseenter={() => isHovered.set(true)}
    on:mouseleave={() => isHovered.set(false)}
    on:contextmenu={openContextMenu}
    role="button"
    tabindex="0"
    {...$$restProps} 
>
    <!-- Svelte Flow Handles -->
    {#each handles as handle (handle.id)}
        <Handle
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={getHandlePosition(handle)}
            {isConnectable}
        />
    {/each}

    <!-- Header with Icon and Title -->
    <div class={`flex items-center justify-between p-4 rounded-t-lg ${color} node-header ${!isExpanded ? 'rounded-bottom' : ''}`}>
        <div class="flex items-center gap-3">
            <div class="p-2 bg-white/20 rounded-lg">
                <svelte:component this={icon} class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-sm font-semibold text-white">{title}</h3>
        </div>
        <button
            on:click={toggleExpand}
            class="text-white/80 hover:text-white p-2"
            aria-expanded={isExpanded}
            aria-label="Toggle expand"
        >
            <ChevronDown class={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
    </div>

    <!-- Content Slot with Expandable Area -->
    {#if isExpanded}
        <div class="content space-y-4 p-4 expand-animation"> 
            <slot />
        </div>
    {:else}
        <div class="content space-y-4 p-4 retract-animation">
            <slot />
        </div>
    {/if}

    <!-- Context Menu -->
    {#if $showContextMenu}
        <ContextMenu
            position={contextMenuPosition}
            on:close={closeContextMenu}
            on:duplicate={handleDuplicate}
            on:delete={handleDelete}
        />
    {/if}
</div>

<style>
    .node-wrapper {
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .node-header {
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        transition: border-radius 0.5s;
    }

    .node-header.rounded-bottom {
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    .content {
        background: rgba(255, 255, 255, 0.05);
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        overflow: hidden;
    }

    .expand-animation {
        animation: expand 0.5s ease-out forwards;
    }

    .retract-animation {
        animation: retract 0.5s ease-in forwards;
    }

    @keyframes expand {
        from {
            max-height: 0;
            opacity: 0;
        }
        to {
            max-height: 500px;
            opacity: 1;
        }
    }

    @keyframes retract {
        0% {
            max-height: 500px;
            padding: 1rem;
        }
        99% {
            max-height: 0;
            padding: 1rem;
        }
        100% {
            max-height: 0;
            padding: 0;
        }
    }

    :global(.svelte-flow__handle) {
        background: #9ca3af;
        width: 8px;
        height: 8px;
        border: 2px solid white;
        position: absolute;
        transition: all 0.2s ease;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }

    :global(.svelte-flow__handle::before) {
        content: "";
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
        z-index: -1;
    }

    :global(.svelte-flow__handle:hover) {
        background: #3b82f6;
        width: 10px;
        height: 10px;
        margin: -1px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }
</style>
