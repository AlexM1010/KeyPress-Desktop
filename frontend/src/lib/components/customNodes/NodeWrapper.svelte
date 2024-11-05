<script lang="ts">
    import { fly, slide } from 'svelte/transition';
    import { ChevronDown } from "lucide-svelte";
    import type { ComponentType } from "svelte";
    import { Handle, Position } from "@xyflow/svelte";
    import type { HandleConfig } from "./types";
    import ContextMenu from "./ContextMenu.svelte";
    import { cubicOut } from "svelte/easing";
    import nodesStore from '../../stores/nodesStore';
    import { createEventDispatcher } from 'svelte';

    // Component Props
    export let icon: ComponentType;
    export let title: string;
    export let color: string;
    export let isExpanded = true;
    export let isConnectable = true;
    export let handles: HandleConfig[] = [];
    export let id: string;
    export let type: string;
    export let data: any;

    const dispatch = createEventDispatcher();

    // UI State Management
    let isHovered = false;

    // Event Handlers
    function handleDuplicate() {
        dispatch('duplicate', { id });
    }

    function handleDelete() {
        dispatch('delete', { id });
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            isExpanded = !isExpanded;
        }
    }

    // Reactive statement to update nodesStore when data changes
    $: {
        nodesStore.update(nodes => {
            const nodeIndex = nodes.findIndex(node => node.id === id);
            if (nodeIndex !== -1) {
                nodes[nodeIndex] = { id, type, data };
            } else {
                nodes.push({ id, type, data });
            }
            return nodes;
        });
    }

    function getHandlePosition(handle: HandleConfig): string {
        const offsetX = handle.offsetX ?? 0;
        const offsetY = handle.offsetY ?? 0;
        const positionMap = {
            [Position.Left]: `top: ${offsetY}%; left: ${offsetX}%;`,
            [Position.Right]: `top: ${offsetY}%; right: ${offsetX}%;`,
            [Position.Top]: `left: ${offsetY}%; top: ${offsetX}%;`,
            [Position.Bottom]: `left: ${offsetY}%; bottom: ${offsetX}%;`,
        };
        return positionMap[handle.position] || "";
    }
</script>

<div
    class="node-wrapper relative transition-all duration-300 overflow-visible" 
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}
    role="region"
    {...$$restProps}
>
    <!-- Connection Handles -->
    {#each handles as handle (handle.id)}
        <Handle
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={getHandlePosition(handle)}
            {isConnectable}
        />
    {/each}

    <!-- Node Header -->
    <div
        class={`flex items-center justify-between p-4 rounded-t-lg ${color} node-header cursor-pointer ${!isExpanded ? "rounded-bottom" : ""}`}
        style="background: {color}"
        on:click={() => (isExpanded = !isExpanded)}
        on:keydown={handleKeyDown}
        role="button"
        tabindex="0"
    >
        <div class="flex items-center gap-3">
            <div class="p-2 bg-white/20 rounded-lg transform hover:scale-105">
                <svelte:component this={icon} class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-sm font-semibold text-white">{title}</h3>
        </div>
        <button
            class="text-white/80 hover:text-white p-2"
            aria-expanded={isExpanded}
        >
            <ChevronDown class={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
    </div>

    <!-- Expandable Content -->
    {#if isExpanded}
        <div class="content space-y-4 p-4" transition:slide={{ duration: 300, easing: cubicOut }}>
            <slot />
        </div>
    {/if}

    <!-- Slide-out Context Menu -->
    {#if isHovered}
        <div
            class="context-menu-wrapper"
            transition:fly={{ y: 10, duration: 150 }}
        >
            <ContextMenu
                on:duplicate={handleDuplicate}
                on:delete={handleDelete}
            />
        </div>
    {/if}
</div>

<style>
    /* Glass morphism effect for node wrapper */
    .node-wrapper {
        border-radius: 1rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        min-width: 250px;
        transform-origin: center center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .node-wrapper:hover {
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }

    /* Header styling */
    .node-header {
        border-radius: 1rem 1rem 0 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .node-header.rounded-bottom {
        border-radius: 1rem;
    }

    /* Content section styling */
    .content {
        background: rgba(255, 255, 255, 0.05);
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 0 0 1rem 1rem;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

    /* Connection handle styling */
    :global(.svelte-flow__handle) {
        background: #9ca3af;
        width: 8px;
        height: 8px;
        border: 2px solid white;
        position: absolute;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        transform-origin: center center;
    }

    :global(.svelte-flow__handle::before) {
        content: "";
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
    }

    :global(.svelte-flow__handle:hover) {
        background: #3b82f6;
        width: 10px;
        height: 10px;
        margin: -1px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }
</style>