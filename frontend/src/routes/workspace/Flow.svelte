<!-- frontend\src\routes\workspace\Flow.svelte -->
<script lang="ts">
  // Import necessary components and utilities from @xyflow/svelte
  import {
    SvelteFlow,
    Controls,
    Background,
    Panel,
    MiniMap,
    ConnectionMode,
    useSvelteFlow,
  } from "@xyflow/svelte";
  import type {
    DefaultEdgeOptions,
    Node,
    Edge,
  } from "@xyflow/svelte";

  
  // Import custom nodes, edges, and utilities
  import { nodesData as defaultNodesData, edgesData as defaultEdgesData } from "$lib/stores/flow";
  import { onNodeDrag, onNodeDragStop, onLayout } from "$lib/utils/workspaceUtils";

  export let nodes = defaultNodesData;
  export let edges = defaultEdgesData;


  // Nodes
  import { nodeTypes } from "$lib/components/customNodes/nodeTypes";
  import MouseClickNode from '$lib/components/customNodes/MouseClickNode.svelte';
  import MouseMoveNode from '$lib/components/customNodes/MouseMoveNode.svelte';
  import StartNode from '$lib/components/customNodes/StartNode.svelte';
  import DelayNode from '$lib/components/customNodes/DelayNode.svelte';
  //Edges
  import CustomEdge from "./CustomEdge.svelte";
  import ConnectionLine from "./ConnectionLine.svelte";
  //Auth/Mount
  import { isAuthenticated, user } from "$lib/stores/auth";
  import { onMount } from "svelte";
  //Flow
  import { flowTheme } from "$lib/stores/theme";
  import "$lib/index.scss";
  import "./FlowStyle.css";
  import { isExpanded } from '$lib/stores/navbar';

  // Import icons from Lucide Svelte
  import {
    Check,
    Save,
    X,
    Play,
    Loader,
    TriangleAlert,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Plus,
  } from "lucide-svelte";

  $: expandedClass = $isExpanded ? 'expanded' : '';

  const availableNodes = [
    {
      group: "Flow Control",
      nodes: [ 
        {
          type: 'Start',
          label: 'Start Node',
          icon: Play,
          id: 'start-node',
          component: StartNode,
          isExpanded: false,
            data: undefined,
        },
        {
          type: 'DelayNode',
          label: 'Delay Node',
          icon: Play,
          id: 'delay-node',
          component: DelayNode,
          isExpanded: false,
            data: undefined,
        }
      ]
    },
    {
      group: "Mouse Control",
      nodes: [
        {
          type: 'Click',
          label: 'Click Node',
          icon: Play,
          id: 'click-node',
          component: MouseClickNode,
          isExpanded: false,
            data: undefined,
        },
        {
          type: 'MoveMouse',
          label: 'Move Node',
          icon: Play,
          id: 'move-node',
          component: MouseMoveNode,
          isExpanded: false,
            data: undefined,
        }
      ]
    }
  ];

  function handleNodeDataUpdate(event: CustomEvent) {
        const { id, data: newData } = event.detail;
        $nodes = $nodes.map(node => {
            if (node.id === id) {
                return { ...node, data: newData };
            }
            return node;
        });
    }

  // Reactive statement to sync color mode with flow theme
  $: colorMode = $flowTheme;

  // Destructure helper functions from useSvelteFlow
  const { toObject, screenToFlowPosition } = useSvelteFlow();

  // State variables
  let isStatusPanelExpanded = false; // Tracks the status panel expansion
  let isExecuting = false; // Indicates if the flow is executing

  // State variable to track if the left panel is expanded
  let isLeftPanelExpanded = true; // Set to true or false based on your preference

  // Toggle the status panel expansion
  function toggleStatusPanel() {
    isStatusPanelExpanded = !isStatusPanelExpanded;
  }

  // Toggle the left panel expansion
  function toggleLeftPanel() {
    isLeftPanelExpanded = !isLeftPanelExpanded;
  }

  export let previewMode: boolean  = false;

  if (previewMode) {
    isLeftPanelExpanded = false;
    isStatusPanelExpanded = false;
  }

  // Function to handle drag start event
  function onDragStart(event: DragEvent, nodeType: string) {
    event.dataTransfer?.setData("application/svelteflow", nodeType);
    event.dataTransfer?.setData("text/plain", nodeType);
    event.dataTransfer?.setDragImage(event.target as Element, 0, 0);
    event.dataTransfer!.effectAllowed = "move";
  }

  // Status messages
  let statusMessages: { id: string; type: string; message: string }[] = [];
  let isSuccess = false;

  // Computed property to determine the current execution status and icon
  $: executionStatus = (() => {
    const hasError = statusMessages.some((msg) => msg.type === "error");
    const hasWarning = statusMessages.some((msg) => msg.type === "warning");
    const hasSuccess = statusMessages.some(
      (msg) =>
        msg.type === "success" && msg.message.includes("Flow execution completed")
    );

    if (isExecuting) return { icon: Loader, color: "text-blue-500" };
    if (hasError) return { icon: X, color: "text-red-500" };
    if (hasWarning) return { icon: TriangleAlert, color: "text-yellow-500" };
    if (hasSuccess) return { icon: Play, color: "text-green-500" };
    return { icon: Play, color: "text-foreground" };
  })();

  // Custom edge types
  const edgeTypes = {
    customedge: CustomEdge,
  };

  // Default options for edges
  export const defaultEdgeOptions: DefaultEdgeOptions = {
    type: "customedge",
    animated: true,
    deletable: true,
    selectable: true,
    data: { color: "var(--main-text)" },
    interactionWidth: 20,
  };

  // Handle drag over event to allow dropping nodes onto the flow
  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer && (event.dataTransfer.dropEffect = "move");
  };

  // Handle drop event to add new nodes to the flow
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer?.getData("application/svelteflow");
    if (!type) return;

    // Convert screen coordinates to flow coordinates
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // Create a new node with a unique ID
    const newNode = {
      id: `${Math.random()}`,
      type,
      position,
      data: { label: `${type} node` },
    };

    // Add the new node to the nodes array
    $nodes = [...$nodes, newNode];
  };

  // Function to handle running the entire flow
  async function handleRunFlow() {
    try {
      isExecuting = true;
      isSuccess = false;
      statusMessages = [];

      // Get the current flow data as an object
      const currentFlowData = toObject();

      // Check if the flow contains a Start node
      const hasStartNode = currentFlowData.nodes.some(
        (node) => node.type === "Start"
      );
      if (!hasStartNode) {
        alert("Flowchart must contain a Start node.");
        isExecuting = false;
        return;
      }

      // Start execution via the Go backend
      const response = await window.go.main.App.StartExecution(
        JSON.stringify(currentFlowData)
      );

      console.log("Flow execution started:", response);
      addStatusMessage({
        id: `exec-${Date.now()}`,
        type: "info",
        message: "Flow execution started.",
      });
    } catch (error) {
      console.error("Failed to run flow:", error);
      isExecuting = false;
      addStatusMessage({
        id: `error-${Date.now()}`,
        type: "error",
        message: "Failed to run flow. Check the console for details.",
      });
    }
  }

  // Function to handle saving the flow
  let isSaving = false;
  let saveSuccess = false;
  let saveError = false;
  let hasAttemptedSave = false;

  // Modify the handleSave function
  async function handleSave() {
    console.log("Triggering manual save...");
    if (!$user) {
      hasAttemptedSave = true;
      console.error("User not authenticated");
      return;
    }

    try {
      isSaving = true;
      saveSuccess = false;
      saveError = false;

      // TODO: Implement save functionality here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate save

      saveSuccess = true;
      addStatusMessage({
        id: `save-${Date.now()}`,
        type: "success",
        message: "Flow saved successfully.",
      });

      // Reset success state after 2 seconds
      setTimeout(() => {
        saveSuccess = false;
      }, 2000);
    } catch (error) {
      console.error("Failed to save flow:", error);
      saveError = true;
      addStatusMessage({
        id: `save-error-${Date.now()}`,
        type: "error",
        message: "Failed to save flow.",
      });

      // Reset error state after 2 seconds
      setTimeout(() => {
        saveError = false;
      }, 2000);
    } finally {
      isSaving = false;
    }
  }

  // Computed property to determine if the status panel should be shown
  $: hasStatusPanel = isStatusPanelExpanded || statusMessages.length > 0;

  // Function to add a status message with automatic removal after 10 seconds
  function addStatusMessage(msg: {
    id: string;
    type: string;
    message: string;
  }) {
    statusMessages = [...statusMessages, msg];
    setTimeout(() => {
      statusMessages = statusMessages.filter((m) => m.id !== msg.id);
    }, 10000);
  }

  // Set up event listeners for various execution events
  function setupEventListeners() {
    window.runtime.EventsOn("task-started", (taskId: string) => {
      addStatusMessage({
        id: `task-started-${taskId}`,
        type: "info",
        message: `Task ${taskId} started.`,
      });
    });

    window.runtime.EventsOn("task-completed", (taskId: string) => {
      addStatusMessage({
        id: `task-completed-${taskId}`,
        type: "success",
        message: `Task ${taskId} completed successfully.`,
      });
    });

    window.runtime.EventsOn(
      "task-error",
      (payload: { taskID: string; error: string }) => {
        isExecuting = false;
        addStatusMessage({
          id: `task-error-${payload.taskID}`,
          type: "error",
          message: `Task ${payload.taskID} failed: ${payload.error}`,
        });
      }
    );

    window.runtime.EventsOn("execution-error", (errorMsg: string) => {
      isExecuting = false;
      addStatusMessage({
        id: `exec-error-${Date.now()}`,
        type: "error",
        message: `Flow execution error: ${errorMsg}`,
      });
    });

    window.runtime.EventsOn("execution-stopped", () => {
      isExecuting = false;
      addStatusMessage({
        id: `exec-stopped-${Date.now()}`,
        type: "warning",
        message: "Flow execution was stopped.",
      });
    });

    window.runtime.EventsOn("execution-timed-out", () => {
      isExecuting = false;
      addStatusMessage({
        id: `exec-timed-out-${Date.now()}`,
        type: "warning",
        message: "Flow execution timed out.",
      });
    });

    window.runtime.EventsOn("execution-completed", () => {
      isExecuting = false;
      isSuccess = true;
      addStatusMessage({
        id: `exec-completed-${Date.now()}`,
        type: "success",
        message: "Flow execution completed.",
      });
      // Reset success state after 3 seconds
      setTimeout(() => {
        isSuccess = false;
      }, 1000);
    });
  }

  // Initialize event listeners when the component mounts
  onMount(() => {
    setupEventListeners();
  });
</script>

<div class="flow-container flex">
  <!-- Left Panel -->
  {#if isLeftPanelExpanded}
  <div class="left-panel {expandedClass}">
    <div class="panel-spacing">
      <h2 class="text-lg font-semibold mb-4 flex-center flex-gap">
        <Plus class="flow-icon" />
        <span>Nodes</span>
      </h2>
      {#each availableNodes as group}
        <div class="node-group">
          <h3 class="text-sm font-medium text-secondary mb-2">{group.group}</h3>
          <ul>
            {#each group.nodes as node}
              <li
                class="draggable-node"
                draggable="true"
                on:dragstart={(event) => onDragStart(event, node.type)}
              >
                <div class="node-preview">
                  <svelte:component this={node.component} id={node.id} data={node.data} />
                </div>
              </li>
            {/each}
          </ul>
          <div class="group-separator"></div>
        </div>
      {/each}
    </div>
  </div>
  {/if}

  {#if !previewMode}
  <!-- Left Panel Toggle Button -->
  <div class="left-toggle-button">
    <button
      class="left-toggle-button-inner"
      style="left: {isLeftPanelExpanded ? '300px' : '0'}"
      on:click={toggleLeftPanel}
      aria-label={isLeftPanelExpanded ? "Collapse node panel" : "Expand node panel"}
    >
      <svelte:component
        this={isLeftPanelExpanded ? ChevronLeft : ChevronRight}
        class="flow-icon"
      />
    </button>
  </div>
  {/if}

  <!-- Main Flow Area -->
  <div
    class="h-full flex-1 transition-all duration-300"
    class:pl-80={isLeftPanelExpanded}
    class:pl-0={!isLeftPanelExpanded}
    class:pr-80={isStatusPanelExpanded}
    class:pr-0={!isStatusPanelExpanded}
  >
    <SvelteFlow
      {nodes}
      {nodeTypes}
      {edges}
      {edgeTypes}
      {colorMode}
      connectionMode={ConnectionMode.Loose}
      defaultEdgeOptions={defaultEdgeOptions}
      on:nodedrag={!previewMode ? onNodeDrag : undefined}
      on:nodedragstop={!previewMode ? onNodeDragStop : undefined}
      on:dragover={!previewMode ? onDragOver : undefined}
      on:drop={!previewMode ? onDrop : undefined}
      on:updateNodeData={handleNodeDataUpdate}
      proOptions={{ hideAttribution: previewMode }}
      fitView
    >
      <!-- Custom connection line -->
      <ConnectionLine slot="connectionLine" />
      {#if !previewMode}
      <!-- Control Panel -->
      <Panel position="top-right">
        <div class="flex items-center">
          <div class="nav-button-container flex-center flex-gap transition-transform duration-300 {expandedClass}">
            <!-- Run Flow Button -->
            <button
              class="flow-button"
              on:click={handleRunFlow}
              disabled={isExecuting}
            >
              <svelte:component
                this={executionStatus.icon}
                class="flow-icon {executionStatus.color}"
                style={isExecuting ? "animation: spin 1s linear infinite" : ""}
              />
            </button>
            <!-- Save Button -->
            {#if ($isAuthenticated && $user) || hasAttemptedSave}
              <button class="flow-button" on:click={handleSave} disabled={isSaving}>
                <svelte:component
                  this={isSaving ? Loader : saveError ? X : saveSuccess ? Check : Save}
                  class="flow-icon"
                  style={isSaving ? "animation: spin 1s linear infinite" : ""}
                />
              </button>
            {:else if hasAttemptedSave}
              <button class="flow-button">
                <X class="flow-icon text-red-500" />
                <span class="text-red-500">Login</span>
              </button>
            {/if}
            <!-- Layout Button -->
            <button
              class="flow-button"
              on:click={() => onLayout("TB")}
            >
              <LayoutDashboard class="flow-icon" />
              <span>Layout</span>
            </button>
          </div>
        </div>
      </Panel>

      <!-- Flow Controls -->
      <Controls />
      <MiniMap />
      {/if}

      <Background />
    </SvelteFlow>
  </div>

  <!-- Status Panel Toggle Button -->
  {#if !previewMode}
  {#if hasStatusPanel}
    <div
      class="status-toggle-button transition-all duration-300"
      class:opacity-0={!hasStatusPanel}
    >
      <button
        class="status-toggle-button-inner"
        style="right: {isStatusPanelExpanded ? '300px' : '0'}"
        on:click={toggleStatusPanel}
        aria-label={
          isStatusPanelExpanded
            ? "Collapse status panel"
            : "Expand status panel"
        }
      >
        <svelte:component
          this={isStatusPanelExpanded ? ChevronRight : ChevronLeft}
          class="flow-icon"
        />
      </button>
    </div>
  {/if}
  {/if}

  <!-- Status Panel -->
  <div
    class="status-panel {expandedClass}"
    style="transform: translateX({isStatusPanelExpanded ? '0' : '100%'})"
  >
    <div class="panel-spacing">
      <h2 class="text-lg font-semibold mb-4 flex-center flex-gap">
        <svelte:component
          this={executionStatus.icon}
          class="flow-icon {executionStatus.color}"
        />
        <span>Execution Status</span>
      </h2>
      {#if statusMessages.length === 0}
        <p class="text-[--secondary-text]">No status updates.</p>
      {:else}
        <ul>
          {#each statusMessages as msg (msg.id)}
            <li class="flex-center mb-3">
              <!-- Status Icon -->
              {#if msg.type === "success"}
                <Check class="flow-icon text-green-500 mr-2" />
              {:else if msg.type === "error"}
                <X class="flow-icon text-red-500 mr-2" />
              {:else if msg.type === "warning"}
                <TriangleAlert class="flow-icon text-yellow-500 mr-2" />
              {:else if msg.type === "info" || msg.type === "running"}
                <Play
                  class="flow-icon text-blue-500 mr-2 {msg.type === 'running' ? 'animate-pulse' : ''}"
                />
              {/if}
              <span class="text-sm">{msg.message}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>