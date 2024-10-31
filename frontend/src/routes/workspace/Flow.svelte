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
  import CustomEdge from "./CustomEdge.svelte";
  import { nodeTypes } from "$lib/components/customNodes/nodeTypes";
  import { flowTheme } from "$lib/stores/themeStore";
  import { auth, user, isAuthenticated } from "$lib/stores/authStore";
  import Sidebar from "./Sidebar.svelte";
  import ConnectionLine from './ConnectionLine.svelte';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';

  // Redirect to login if not authenticated
  $: if (!$isAuthenticated || !$user) {
    goto('/login');
  }

  $: colorMode = $flowTheme; // Responsive color mode

  const { toObject, screenToFlowPosition } = useSvelteFlow();

  // Function to handle running the entire flow
  async function handleRunFlow() {
    try {
      // Serialize the current flow data
      const currentFlowData = toObject();
      alert(currentFlowData);

      // Ensure the flow has a Start node
      //const hasStartNode = currentFlowData.nodes.some(node => node.type === "Start");
      //if (!hasStartNode) {
      //  alert("Flowchart must contain a Start node.");
      //  return;
      //}

      // Send the flow data to the backend's StartExecution method
      const response = await window.go.main.App.StartExecution(JSON.stringify(currentFlowData));

      console.log("Flow execution started:", response);
    } catch (error) {
      console.error("Failed to run flow:", error);
      // Optionally, display an error notification to the user
      alert("Failed to run flow. Check the console for details.");
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

  // Save handler (if needed)
  async function handleSave() {
    console.log("Triggering manual save...");
    if (!$user) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Implement your save logic here
    } catch (error) {
      console.error("Failed to save flow:", error);
      // Optionally show an error notification to the user
    }
  }
</script>

{#if $isAuthenticated && $user}
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
            on:click={handleRunFlow}>Run Flow</button
          >
          <button
            class="bg-background text-foreground px-4 py-2 rounded"
            on:click={handleSave}>Save</button
          >
          <button
            class="bg-background text-foreground px-4 py-2 rounded"
            on:click={() => onLayout("TB")}>Layout</button
          >
        </Panel>
        <Controls />
        <Background />
        <MiniMap />
      </SvelteFlow>
    </div>
  </div>
{/if}
