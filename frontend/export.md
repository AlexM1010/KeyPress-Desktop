# Project Structure

```
.svelte-kit/
  generated/
    client/
      nodes/
        0.js
        1.js
        2.js
        3.js
        4.js
        5.js
        6.js
        7.js
        8.js
        9.js
      app.js
      matchers.js
    client-optimized/
      nodes/
        0.js
        1.js
        2.js
        3.js
      app.js
      matchers.js
    server/
      internal.js
    root.svelte
  output/
    client/
      _app/
        immutable/
          assets/
            _layout.qopWNkAi.css
            _page.BzoYrNfz.css
            0.qopWNkAi.css
            3.BzoYrNfz.css
            app.CyCNpD78.css
            app.fzZd5Dk5.css
          chunks/
            entry.BXChADZ1.js
            globals.D0QH3NT1.js
            index.D7cByh4s.js
            index.DMw0Zgb1.js
            scheduler.DYL6cEhT.js
          entry/
            app.CV5JLG91.js
            start.DkbdqTuX.js
          nodes/
            0.BvZvE1Uc.js
            1.8FSgc2WH.js
            2.B2-EIr7f.js
            3.dyxF-mtf.js
        version.json
      .vite/
        manifest.json
      favicon.png
    server/
      _app/
        immutable/
          assets/
            _layout.qopWNkAi.css
            _page.BzoYrNfz.css
            app.CyCNpD78.css
      .vite/
        manifest.json
      chunks/
        client.js
        exports.js
        index.js
        internal.js
        ssr.js
      entries/
        fallbacks/
          error.svelte.js
        pages/
          _email_/
            _page.svelte.js
          _layout.svelte.js
          _page.svelte.js
      nodes/
        0.js
        1.js
        2.js
        3.js
      stylesheets/
      index.js
      internal.js
      manifest-full.js
      manifest.js
  types/
    src/
      routes/
        (workspace)/
          [userId]/
        [email]/
        [userId]/
        auth/
          confirm/
            $types.d.ts
          error/
            $types.d.ts
          $types.d.ts
          proxy+page.server.ts
        design/
        login/
          $types.d.ts
          proxy+page.server.ts
        private/
          [userId]/
        profile/
          $types.d.ts
          proxy+page.server.ts
        register/
          $types.d.ts
          proxy+page.server.ts
        workspace/
          [userId]/
            $types.d.ts
            proxy+page.server.ts
        $types.d.ts
        proxy+layout.server.ts
        proxy+layout.ts
        proxy+page.server.ts
    route_meta_data.json
  ambient.d.ts
  non-ambient.d.ts
  tsconfig.json
prisma/
  schema.prisma
src/
  Data/
  lib/
    assets/
      logo-no-background.png
      moon.svg
      sun.svg
    components/
      customNodes/
        BinNode.svelte
        ColorPickerNode.svelte
        ContextMenu.svelte
        Input.svelte
        KeyPressNode.svelte
        MouseClickNode.svelte
        nodes-and-edges.ts
        NodeSVGStore.ts
        nodeTypes.ts
        NodeWrapper.svelte
        Select.svelte
        Slider.svelte
        SVGNode.svelte
        types.ts
      ui/
        button/
          button.svelte
          index.ts
        form/
          form-button.svelte
          form-description.svelte
          form-element-field.svelte
          form-field-errors.svelte
          form-field.svelte
          form-fieldset.svelte
          form-label.svelte
          form-legend.svelte
          index.ts
        input/
          index.ts
          input.svelte
        label/
          index.ts
          label.svelte
    server/
      prisma.ts
    stores/
      themeStore.ts
    theme/
    types/
      block.ts
      edge.ts
      manifest.ts
      nodeProps.ts
      tailwind.ts
    utils/
      tailwind.ts
      textWrap.ts
      util.ts
    index.ts
    utils.ts
  routes/
    auth/
      confirm/
        +server.ts
      error/
        +page.svelte
      +page.server.ts
    login/
      +page.server.ts
      +page.svelte
      login.scss
      Login.svelte
      schema.ts
    profile/
      +page.server.ts
      +page.svelte
    register/
      +page.server.ts
      +page.svelte
      Register.scss
      Register.svelte
      schema.ts
    workspace/
      [userId]/
        +layout.server.ts
        +page.server.ts
        +page.svelte
        ConnectionLine.svelte
        CustomEdge.svelte
        DnDProvider.svelte
        Flow.svelte
        Sidebar.svelte
        utils.ts
    +layout.server.ts
    +layout.svelte
    +layout.ts
    +page.server.ts
    +page.svelte
    dark-light.scss
    ThemeToggle.svelte
  app.css
  app.d.ts
  app.html
  hooks.server.ts
static/
  favicon.png
supabase/
  .branches/
    _current_branch
  .temp/
    cli-latest
  migrations/
    init.sql
  .gitignore
  config.toml
.env
.env.local
.gitignore
.npmrc
components.json
export.md
package-lock.json
package.json
postcss.config.cjs
postcss.config.js
README.md
svelte.config.js
tailwind.config.js
tsconfig.json
vite.config.ts
```


# Active Tabs Content


## src\routes\workspace\Flow.svelte

```svelte
<!-- src/routes/workspace/Flow.svelte -->
<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    Panel,
    MiniMap,
    ConnectionMode,
    useSvelteFlow,
    type DefaultEdgeOptions,
  } from "@xyflow/svelte";
  import {
    nodes,
    edges,
    onNodeDrag,
    onNodeDragStop,
    onLayout,
  } from "./utils";
  import { lastSavedFlowData, saveOrUpdateFlow } from "./utils";
  import CustomEdge from "./CustomEdge.svelte";
  import { nodeTypes } from "$lib/components/customNodes/nodeTypes"; //Custom Nodes
  import { flowTheme } from "$lib/stores/themeStore";
  import Sidebar from "./Sidebar.svelte";
  import type { PageData } from './$types';
  import ConnectionLine from './ConnectionLine.svelte';

  // Authentication 
  export let data: PageData;
  $: ({ supabase, user, session } = data);

  $: colorMode = $flowTheme; // Responsive color mode

  const { toObject } = useSvelteFlow();

  async function handleSave() {
    console.log("Triggering manual save...");
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    // Get the current flow state
    let flowName = "Untitled Flow";
    const currentFlowData = toObject();
    const response = await saveOrUpdateFlow(supabase, session, currentFlowData, flowName);

    if (response.success) {
      console.log("Flow saved successfully!");
      lastSavedFlowData.set(JSON.stringify(currentFlowData));
    } else {
      console.error(response.error);
    }
  }

  // Custom Edges
  const edgeTypes = {
    customedge: CustomEdge,
  };

  // Default options for this edge type
  export const defaultEdgeOptions: DefaultEdgeOptions = {
    type: "customedge",
    animated: true,
    hidden: false,
    deletable: true,
    selectable: true,
    data: { color: '#000000' },
    markerStart: undefined,
    markerEnd: undefined,
    zIndex: 0,
    ariaLabel: undefined,
    interactionWidth: 20,
  };

  // Handle drag and drop functionality
  const { screenToFlowPosition } = useSvelteFlow();

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer?.getData('application/reactflow');
    if (!type) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });

    const newNode = {
      id: `${Math.random()}`,
      type,
      position,
      data: { label: `${type} node` }
    };

    $nodes = [...$nodes, newNode];
  };
</script>

<div class="w-full h-[calc(100vh-4.5rem)] relative">
  <div class="absolute left-0 top-0 bottom-0 z-10 w-64 bg-background border-r border-border">
    <Sidebar />
  </div>
  <div class="pl-64 h-full">
    <SvelteFlow
      {nodes}
      {nodeTypes}
      {edges}
      {edgeTypes}
      {colorMode}
      connectionMode={ConnectionMode.Loose}
      {defaultEdgeOptions}
      on:nodedrag={onNodeDrag}
      on:nodedragstop={onNodeDragStop}
      on:dragover={onDragOver}
      on:drop={onDrop}
      fitView
    >
      <ConnectionLine slot="connectionLine"/>
      <Panel position="top-right">
        <button
          class="bg-background text-foreground px-4 py-2 rounded"
          on:click={handleSave}>Save Flow</button
        >
        <button
          class="bg-background text-foreground px-4 py-2 rounded"
          on:click={() => onLayout("TB")}>Vertical Layout</button
        >
        <button
          class="bg-background text-foreground px-4 py-2 rounded"
          on:click={() => onLayout("LR")}>Horizontal Layout</button
        >
      </Panel>
      <Controls />
      <Background />
      <MiniMap />
    </SvelteFlow>
  </div>
</div>
```


## src\routes\workspace\[userId]\ConnectionLine.svelte

```svelte
<script lang="ts">
	import { getBezierPath, useConnection } from '@xyflow/svelte';

	const connection = useConnection();

	let path: string | null = null;

	$: if ($connection.inProgress) {
		const { from, to, fromPosition, toPosition } = $connection;
		const pathParams = {
			sourceX: from.x,
			sourceY: from.y,
			sourcePosition: fromPosition,
			targetX: to.x,
			targetY: to.y,
			targetPosition: toPosition
		};
		[path] = getBezierPath(pathParams);
	}
</script>

{#if $connection.inProgress}
	<path d={path} fill="none" stroke={$connection.fromHandle.id} />
{/if}
```


## src\routes\workspace\[userId]\CustomEdge.svelte

```svelte
<script lang="ts">
  /**
   * CustomEdge.svelte
   * A customizable edge component for XYFlow that displays a delete button on hover.
   * Features dynamic positioning, smooth animations, and single-button display.
   * 
   *  TODO:
   *  - Expand x button hover but not visual radius 
   *  - Fix edge path hover detection - 
   */

  import type { Position } from "@xyflow/svelte";
  import {
    getBezierPath,
    BaseEdge,
    type EdgeProps,
    EdgeLabelRenderer,
    useEdges,
  } from "@xyflow/svelte";
  import { X } from "lucide-svelte";
  import { cubicOut } from "svelte/easing";
  import { fade } from "svelte/transition";

  // Types and Interfaces
  interface HoverPoint {
    x: number;
    y: number;
    timeoutId: ReturnType<typeof setTimeout> | null;
    isHovered: boolean;
    id: string;
  }

  interface CustomEdgeProps extends EdgeProps {
    id: string;
    sourceX: number;
    sourceY: number;
    sourcePosition: Position;
    targetX: number;
    targetY: number;
    targetPosition: Position;
    markerEnd?: string;
    style?: string;
  }

  // Configuration Constants
  const CONFIG = {
    CREATION_COOLDOWN: 300, // ms between new point creation attempts
    MIN_POINT_DISTANCE: 30, // minimum pixels between hover points
    PATH_SAMPLING_POINTS: 50, // number of points to sample when finding closest point
    HOVER_TIMEOUT: 300, // ms before removing hover points
    MAX_HOVER_POINTS: 1, // maximum number of hover points (buttons) to show
    FADE_DURATION: 200, // ms for fade animation
    BUTTON_SCALE: {
      DEFAULT: 0.8,
      HOVER: 1.2,
    },
    ICON_SCALE: {
      DEFAULT: "65%",
      HOVER: "75%",
    },
  } as const;

  // Props
  type $$Props = EdgeProps;

  export let id: $$Props["id"];
  export let sourceX: $$Props["sourceX"];
  export let sourceY: $$Props["sourceY"];
  export let sourcePosition: $$Props["sourcePosition"];
  export let targetX: $$Props["targetX"];
  export let targetY: $$Props["targetY"];
  export let targetPosition: $$Props["targetPosition"];
  export let markerEnd: $$Props["markerEnd"] = "url(#arrow)";
  export let style: $$Props["style"] = undefined;

  // State
  let edgePath: string;
  let pathElement: SVGPathElement | null = null;
  let isEdgeHovered = false;
  let lastCreationTime = 0;
  let hoverPoints: HoverPoint[] = [];
  let globalCleanupTimeout: ReturnType<typeof setTimeout> | null = null;
  let pointIdCounter = 0;

  // Reactive declarations
  $: [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edges = useEdges();

  // Helper Functions
  /**
   * Finds the closest point on the path to the given coordinates
   */
  function getClosestPoint(path: SVGPathElement, x: number, y: number) {
    const pathLength = path.getTotalLength();
    const increment = pathLength / CONFIG.PATH_SAMPLING_POINTS;

    let closestPoint = { x: 0, y: 0 };
    let minDistance = Infinity;

    for (let i = 0; i <= pathLength; i += increment) {
      const point = path.getPointAtLength(i);
      const distance = Math.hypot(point.x - x, point.y - y);
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }
    return closestPoint;
  }

  /**
   * Transforms mouse coordinates from screen space to SVG space
   */
  function transformCoordinates(event: MouseEvent, svgElement: SVGSVGElement) {
    const ctm = svgElement.getScreenCTM();
    if (!ctm) return null;

    const point = svgElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    return point.matrixTransform(ctm.inverse());
  }

  /**
   * Cleans up all timeouts and scheduled operations
   */
  function clearAllTimeouts() {
    if (globalCleanupTimeout !== null) {
      clearTimeout(globalCleanupTimeout);
      globalCleanupTimeout = null;
    }

    hoverPoints.forEach((point) => {
      if (point.timeoutId !== null) {
        clearTimeout(point.timeoutId);
      }
    });
  }

  /**
   * Schedules removal of hover points if no hover states are active
   */
  function schedulePointRemoval() {
    clearAllTimeouts();

    if (!isEdgeHovered && !hoverPoints.some((p) => p.isHovered)) {
      globalCleanupTimeout = setTimeout(() => {
        hoverPoints = [];
      }, CONFIG.HOVER_TIMEOUT);
    }
  }

  /**
   * Checks if enough time has passed to create a new hover point
   */
  function canCreateNewPoint(): boolean {
    const now = Date.now();
    if (now - lastCreationTime >= CONFIG.CREATION_COOLDOWN) {
      lastCreationTime = now;
      return true;
    }
    return false;
  }

  // Event Handlers
  function onEdgeClick() {
    edges.update((eds) => eds.filter((edge) => edge.id !== id));
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isEdgeHovered) {
      isEdgeHovered = true;
      clearAllTimeouts();
    }

    if (!pathElement || !canCreateNewPoint()) return;

    const svgElement = (event.currentTarget as SVGElement).closest(
      "svg",
    ) as SVGSVGElement;
    if (!svgElement) return;

    const transformedPoint = transformCoordinates(event, svgElement);
    if (!transformedPoint) return;

    const nearestPoint = getClosestPoint(
      pathElement,
      transformedPoint.x,
      transformedPoint.y,
    );

    // Check if the new point would be too close to existing points
    const tooClose = hoverPoints.some(
      (p) =>
        Math.hypot(p.x - nearestPoint.x, p.y - nearestPoint.y) <
        CONFIG.MIN_POINT_DISTANCE,
    );

    if (!tooClose) {
      // Remove old points with fade animation
      if (hoverPoints.length >= CONFIG.MAX_HOVER_POINTS) {
        const oldPoints = [...hoverPoints];
        oldPoints.forEach((point) => {
          if (!point.isHovered) {
            setTimeout(() => {
              hoverPoints = hoverPoints.filter((p) => p.id !== point.id);
            }, CONFIG.FADE_DURATION);
          }
        });
      }

      // Add new point
      const newPointId = `point-${pointIdCounter++}`;
      hoverPoints = [
        ...hoverPoints,
        {
          x: nearestPoint.x,
          y: nearestPoint.y,
          timeoutId: null,
          isHovered: false,
          id: newPointId,
        },
      ];
    }
  }

  function handleMouseLeave() {
    isEdgeHovered = false;
    schedulePointRemoval();
  }

  function handleButtonMouseEnter(id: string) {
    const index = hoverPoints.findIndex((p) => p.id === id);
    if (index === -1) return;

    hoverPoints[index] = { ...hoverPoints[index], isHovered: true };
    hoverPoints = [...hoverPoints];
    clearAllTimeouts();
  }

  function handleButtonMouseLeave(id: string) {
    const index = hoverPoints.findIndex((p) => p.id === id);
    if (index === -1) return;

    hoverPoints[index] = { ...hoverPoints[index], isHovered: false };
    hoverPoints = [...hoverPoints];
    schedulePointRemoval();
  }

  // Lifecycle
  function bindPath(node: SVGPathElement) {
    pathElement = node;
    return {
      destroy: () => {
        clearAllTimeouts();
        pathElement = null;
      },
    };
  }

  $$restProps; // Silence warnings 
</script>

<!-- Arrow marker definition -->
<svg style="position: absolute; width: 0; height: 0;">
  <defs>
    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerUnits="strokeWidth"
      markerWidth="8"
      markerHeight="8"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
    </marker>
  </defs>
</svg>

<!-- Edge container with invisible hit area -->
<g
  class="edge-container"
  on:mouseenter={handleMouseMove}
  on:mousemove={handleMouseMove}
  on:mouseleave={handleMouseLeave}
  role="presentation"
>
  <path
    use:bindPath
    d={edgePath}
    fill="none"
    stroke="transparent"
    stroke-width="10"
    style="pointer-events: stroke;"
  />
  <BaseEdge path={edgePath} {markerEnd} {style} />
</g>

<!-- Hover points with delete buttons -->
{#each hoverPoints as point (point.id)}
  <EdgeLabelRenderer>
    <div
      class="hover-point nodrag nopan"
      style="transform: translate({point.x}px, {point.y}px);"
      transition:fade={{ duration: CONFIG.FADE_DURATION, easing: cubicOut }}
    >
      <button
        class="delete-button"
        on:click={onEdgeClick}
        on:mouseenter={() => handleButtonMouseEnter(point.id)}
        on:mouseleave={() => handleButtonMouseLeave(point.id)}
        aria-label="Remove edge"
      >
        <X />
      </button>
    </div>
  </EdgeLabelRenderer>
{/each}

<style>
  .edge-container {
    position: relative;
  }

  .hover-point {
    position: absolute;
    pointer-events: all;
    padding: 0.25rem; /* ensures button is centred */
    transform-origin: center;
    margin-left: -12px; /* ensures button is centred */
    margin-top: -12px; /* ensures button is centred */
  }

  .delete-button {
    width: 1rem;
    height: 1rem;
    background: #9ca3af;
    border: 0.125rem solid white;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 0;
    transform-origin: center;
    transform: scale(0.8);
  }

  .delete-button:hover {
    background: #3b82f6;
    transform: scale(1.2);
  }

  .delete-button :global(svg) {
    width: 65%;
    height: 65%;
    transition: inherit;
  }

  .delete-button:hover :global(svg) {
    width: 75%;
    height: 75%;
  }
</style>
```


## src\lib\components\customNodes\NodeWrapper.svelte

```svelte
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
    }

    function handleDelete() {
        console.log("Delete action triggered");
    }
</script>

<div
    class="node-wrapper relative border border-gray-200"
    on:mouseenter={() => isHovered.set(true)}
    on:mouseleave={() => isHovered.set(false)}
    on:contextmenu={openContextMenu}
    role="button"
    tabindex="0"
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
```

