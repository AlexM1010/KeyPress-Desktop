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
  import { nodeTypes } from "$lib/components/customNodes/nodeTypes";
  import { flowTheme } from "$lib/stores/themeStore";
  import { auth, user, isAuthenticated } from "$lib/stores/authStore";
  import Sidebar from "./Sidebar.svelte";
  import ConnectionLine from './ConnectionLine.svelte';
  import { goto } from '$app/navigation';

  // Use the reactive auth store values
  $: if (!$isAuthenticated || !$user) {
    goto('/login');
  }

  $: colorMode = $flowTheme; // Responsive color mode

  const { toObject, screenToFlowPosition } = useSvelteFlow();

  // Updated save handler using the auth store
  async function handleSave() {
    console.log("Triggering manual save...");
    if (!$user) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Get the current flow state
      let flowName = "Untitled Flow";
      const currentFlowData = toObject();
      
      // Get the current auth token
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error("No auth token found");
      }

      /*const response = await window.go.main.App.SaveFlow({
        flowData: currentFlowData,
        flowName: flowName,
        userId: $user.id
      });

      if (response.success) {
        console.log("Flow saved successfully!");
        lastSavedFlowData.set(JSON.stringify(currentFlowData));
      } else {
        throw new Error(response.error);
      }*/
    } catch (error) {
      console.error("Failed to save flow:", error);
      // Optionally show an error notification to the user
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

  async function handleSimpleClick() {
    try {
      const response = await window.go.main.App.RunSimpleClick();
      if (response.success) {
        console.log("TagUI click executed successfully!");
      }
    } catch (error) {
      console.error("Failed to run TagUI click:", error);
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
            on:click={handleSimpleClick}>Run</button
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