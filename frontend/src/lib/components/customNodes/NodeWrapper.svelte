<!-- NodeWrapper.svelte -->
<!-- 
 * @component NodeWrapper
 * @description A configurable wrapper component for flow diagram nodes with expandable content,
 * context menu support, and customizable connection handles. Used as a building block for
 * visual programming interfaces and workflow editors.
 -->
<script lang="ts">
    import { writable } from "svelte/store";
    import { ChevronDown } from "lucide-svelte";
    import type { ComponentType } from "svelte";
    import { Handle, Position } from "@xyflow/svelte";
    import type { HandleConfig } from "./types";
    import ContextMenu from "./ContextMenu.svelte";
    import { slide } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    // Component Props
    export let icon: ComponentType;            // Icon component to display in the header
    export let title: string;                  // Node title displayed in header
    export let color: string;                  // Background color of the header
    export let isExpanded = true;             // Initial expansion state
    export let isConnectable = true;          // Whether handles accept connections

    // Default connection handle configuration
    const defaultHandles: HandleConfig[] = [
        { 
            id: "right", 
            type: "source", 
            position: Position.Right, 
            offsetY: 50 
        },
        { 
            id: "left", 
            type: "target", 
            position: Position.Left, 
            offsetY: 50 
        },
    ];

    export let handles: HandleConfig[] = defaultHandles;

    // UI State Management
    const isHovered = writable(false);
    const showContextMenu = writable(false);
    const contextMenuPosition = { x: 0, y: 0 };

    /**
     * Calculates CSS positioning for connection handles based on their configuration
     * @param handle - The handle configuration object
     * @returns CSS position string
     */
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

    /**
     * Event Handlers
     */
    function toggleExpand(): void {
        isExpanded = !isExpanded;
    }

    function openContextMenu(event: MouseEvent): void {
        event.preventDefault();
        if (!(event.currentTarget instanceof HTMLElement)) return;

        const rect = event.currentTarget.getBoundingClientRect();
        contextMenuPosition.x = event.clientX - rect.left;
        contextMenuPosition.y = event.clientY - rect.top;
        showContextMenu.set(true);
    }

    function closeContextMenu(): void {
        showContextMenu.set(false);
    }

    // TODO: Implement actual duplicate/delete functionality
    const handleDuplicate = () => console.log("Duplicate action triggered");
    const handleDelete = () => console.log("Delete action triggered");
</script>

<!-- Node Container -->
<div
    class="node-wrapper relative border border-gray-200 transition-all duration-300"
    on:mouseenter={() => isHovered.set(true)}
    on:mouseleave={() => isHovered.set(false)}
    on:contextmenu={openContextMenu}
    role="button"
    tabindex="0"
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
        class={`flex items-center justify-between p-4 rounded-t-lg ${color} 
               node-header ${!isExpanded ? "rounded-bottom" : ""} cursor-pointer`}
        style="background: {color}"
        role="button"
        tabindex="0"
        on:click={toggleExpand}
        on:keydown={(e) => e.key === "Enter" || e.key === " " && toggleExpand()}
    >
        <div class="flex items-center gap-3">
            <div class="p-2 bg-white/20 rounded-lg transform transition-transform duration-200 hover:scale-105">
                <svelte:component this={icon} class="w-5 h-5 text-white transition-colors duration-200" />
            </div>
            <h3 class="text-sm font-semibold text-white transition-colors duration-200">
                {title}
            </h3>
        </div>
        
        <button
            on:click={toggleExpand}
            class="text-white/80 hover:text-white p-2"
            aria-expanded={isExpanded}
            aria-label="Toggle expand"
        >
            <ChevronDown 
                class={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            />
        </button>
    </div>

    <!-- Expandable Content -->
    {#if isExpanded}
        <div
            class="content space-y-4 p-4"
            transition:slide={{ duration: 300, easing: cubicOut }}
        >
            <slot />
        </div>
    {/if}

    <!-- Context Menu -->
    {#if $showContextMenu}
        <div transition:slide={{ duration: 150 }}>
            <ContextMenu
                position={contextMenuPosition}
                on:close={closeContextMenu}
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