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
  import { user, isAuthenticated } from "$lib/stores/authStore";
  import Sidebar from "./Sidebar.svelte";
  import ConnectionLine from './ConnectionLine.svelte';
  import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { Events } from '@wailsapp/runtime'; 

  // Import Lucide Svelte icons
  import { Check } from 'lucide-svelte';
  import { X } from 'lucide-svelte';
  import { Play } from 'lucide-svelte';
  import { TriangleAlert } from 'lucide-svelte';
  import { ChevronLeft } from 'lucide-svelte';
  import { ChevronRight } from 'lucide-svelte';

  // Redirect to login if not authenticated
  $: if (!$isAuthenticated || !$user) {
    goto('/login');
  }

  $: colorMode = $flowTheme; // Responsive color mode

  const { toObject, screenToFlowPosition } = useSvelteFlow();

  // State for status panel expansion
  let isStatusPanelExpanded = true;

  // Toggle status panel
  function toggleStatusPanel() {
    isStatusPanelExpanded = !isStatusPanelExpanded;
  }

  // Reactive variable to store status messages
  let statusMessages: { id: string, type: string, message: string }[] = [];

  // Function to handle running the entire flow
  async function handleRunFlow() {
    try {
      // Clear previous status messages
      statusMessages = [];

      // Serialize the current flow data
      const currentFlowData = toObject();
      console.log(JSON.stringify(currentFlowData));

      // Ensure the flow has a Start node
      const hasStartNode = currentFlowData.nodes.some(node => node.type === "Start");
      if (!hasStartNode) {
        alert("Flowchart must contain a Start node.");
        return;
      }

      // Send the flow data to the backend's StartExecution method
      const response = await window.go.main.App.StartExecution(JSON.stringify(currentFlowData));

      console.log("Flow execution started:", response);
      // Optionally, add a status message indicating that execution has started
      addStatusMessage({
        id: `exec-${Date.now()}`,
        type: 'info',
        message: 'Flow execution started.',
      });
    } catch (error) {
      console.error("Failed to run flow:", error);
      // Optionally, display an error notification to the user
      addStatusMessage({
        id: `error-${Date.now()}`,
        type: 'error',
        message: 'Failed to run flow. Check the console for details.',
      });
    }
  }

  // Function to handle saving the flow
  async function handleSave() {
    console.log("Triggering manual save...");
    if (!$user) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Implement your save logic here
      // Example: await window.go.main.App.SaveFlow({ flowName: "My Flow", flowData: JSON.stringify(toObject()) });

      addStatusMessage({
        id: `save-${Date.now()}`,
        type: 'success',
        message: 'Flow saved successfully.',
      });
    } catch (error) {
      console.error("Failed to save flow:", error);
      addStatusMessage({
        id: `save-error-${Date.now()}`,
        type: 'error',
        message: 'Failed to save flow.',
      });
    }
  }

  // Function to add a status message
  function addStatusMessage(msg: { id: string, type: string, message: string }) {
    statusMessages = [...statusMessages, msg];
    // Optionally, remove the message after a certain time
    setTimeout(() => {
      statusMessages = statusMessages.filter(m => m.id !== msg.id);
    }, 10000); // Remove after 10 seconds
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

  // Listen to backend events and update status messages
  function setupEventListeners() {
    // Listen to task-started event
    window.runtime.EventsOn('task-started', (taskId: string) => {
      addStatusMessage({
        id: `task-started-${taskId}`,
        type: 'info',
        message: `Task ${taskId} started.`,
      });
    });

    // Listen to task-completed event
    window.runtime.EventsOn('task-completed', (taskId: string) => {
      addStatusMessage({
        id: `task-completed-${taskId}`,
        type: 'success',
        message: `Task ${taskId} completed successfully.`,
      });
    });

    // Listen to task-error event
    window.runtime.EventsOn('task-error', (payload: { taskID: string, error: string }) => {
      addStatusMessage({
        id: `task-error-${payload.taskID}`,
        type: 'error',
        message: `Task ${payload.taskID} failed: ${payload.error}`,
      });
    });

    // Listen to execution-completed event
    window.runtime.EventsOn('execution-completed', () => {
      addStatusMessage({
        id: `exec-completed-${Date.now()}`,
        type: 'success',
        message: 'Flow execution completed.',
      });
    });

    // Listen to execution-error event
    window.runtime.EventsOn('execution-error', (errorMsg: string) => {
      addStatusMessage({
        id: `exec-error-${Date.now()}`,
        type: 'error',
        message: `Flow execution error: ${errorMsg}`,
      });
    });

    // Listen to execution-stopped event
    window.runtime.EventsOn('execution-stopped', () => {
      addStatusMessage({
        id: `exec-stopped-${Date.now()}`,
        type: 'warning',
        message: 'Flow execution was stopped.',
      });
    });

    // Listen to execution-timed-out event
    window.runtime.EventsOn('execution-timed-out', () => {
      addStatusMessage({
        id: `exec-timed-out-${Date.now()}`,
        type: 'warning',
        message: 'Flow execution timed out.',
      });
    });
  }

  // Setup event listeners on mount and clean up on destroy
  onMount(() => {
    setupEventListeners();
  });

  /*onDestroy(() => {
    // Remove all event listeners
    Events.Off('task-started');
    Events.Off('task-completed');
    Events.Off('task-error');
    Events.Off('execution-completed');
    Events.Off('execution-error');
    Events.Off('execution-stopped');
    Events.Off('execution-timed-out');
  });*/
</script>

{#if $isAuthenticated && $user}
  <div class="w-full h-[calc(100vh-4.5rem)] relative flex">
    <!-- Sidebar -->
    <div class="absolute left-0 top-0 bottom-0 z-10 w-64 bg-background border-r border-border">
      <Sidebar />
    </div>

    <!-- Main Flow Area -->
    <div class="pl-64 h-full flex-1 transition-all duration-300" class:pr-80={isStatusPanelExpanded} class:pr-0={!isStatusPanelExpanded}>
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
            class="bg-background text-foreground px-4 py-2 rounded mr-2 flex items-center space-x-1"
            on:click={handleRunFlow}>
            <Play class="w-5 h-5" />
            <span>Run Flow</span>
          </button>
          <button
            class="bg-background text-foreground px-4 py-2 rounded mr-2 flex items-center space-x-1"
            on:click={handleSave}>
            <Check class="w-5 h-5" />
            <span>Save</span>
          </button>
          <button
            class="bg-background text-foreground px-4 py-2 rounded flex items-center space-x-1"
            on:click={() => onLayout("TB")}>
            <TriangleAlert class="w-5 h-5" />
            <span>Layout</span>
          </button>
        </Panel>
        <Controls />
        <Background />
        <MiniMap />
      </SvelteFlow>
    </div>

    <!-- Expand/Collapse Tab -->
    <button 
      class="absolute top-1/2 -translate-y-1/2 bg-background border border-border rounded-l-md p-1 cursor-pointer z-20 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      style="right: {isStatusPanelExpanded ? '320px' : '0'}"
      on:click={toggleStatusPanel}
      aria-label={isStatusPanelExpanded ? "Collapse status panel" : "Expand status panel"}
    >
      {#if isStatusPanelExpanded}
        <ChevronRight class="w-4 h-4" />
      {:else}
        <ChevronLeft class="w-4 h-4" />
      {/if}
    </button>

    <!-- Status Panel -->
    <div 
      class="absolute right-0 top-0 bottom-0 bg-gray-100 dark:bg-gray-800 border-l border-border overflow-y-auto transition-all duration-300"
      style="width: 320px; transform: translateX({isStatusPanelExpanded ? '0' : '100%'})"
    >
      <div class="p-4">
        <h2 class="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Play class="w-6 h-6" />
          <span>Execution Status</span>
        </h2>
        {#if statusMessages.length === 0}
          <p class="text-gray-500 dark:text-gray-400">No status updates.</p>
        {:else}
          <ul>
            {#each statusMessages as msg (msg.id)}
              <li class="flex items-center mb-3">
                {#if msg.type === 'success'}
                  <Check class="w-5 h-5 text-green-500 mr-2" />
                {:else if msg.type === 'error'}
                  <X class="w-5 h-5 text-red-500 mr-2" />
                {:else if msg.type === 'warning'}
                  <TriangleAlert class="w-5 h-5 text-yellow-500 mr-2" />
                {:else if msg.type === 'info'}
                  <Play class="w-5 h-5 text-blue-500 mr-2" />
                {/if}
                <span class="text-sm">{msg.message}</span>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>
{/if}