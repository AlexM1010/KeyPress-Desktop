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