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
    type DefaultEdgeOptions,
  } from "@xyflow/svelte";

  // Import custom nodes, edges, and utilities
  import { nodes, edges, onNodeDrag, onNodeDragStop, onLayout } from "./utils/utils";
  import CustomEdge from "./CustomEdge.svelte";
  import { nodeTypes } from "$lib/components/customNodes/nodeTypes";
  import { flowTheme } from "$lib/stores/theme";
  import { isAuthenticated, user } from "$lib/stores/auth";
  import Sidebar from "./Sidebar.svelte";
  import ConnectionLine from "./ConnectionLine.svelte";
  import { onMount } from "svelte";
  import "$lib/index.scss";
  import "./FlowStyle.css";

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

  // Define available nodes
  const availableNodes = [
    { type: "Start", label: "Start Node", icon: Play },
  ];

  // Reactive statement to sync color mode with flow theme
  $: colorMode = $flowTheme;

  // Destructure helper functions from useSvelteFlow
  const { toObject, screenToFlowPosition } = useSvelteFlow();

  // State variables
  let isStatusPanelExpanded = false; // Tracks the status panel expansion
  let isExecuting = false; // Indicates if the flow is executing

  // State variable to track if the left panel is expanded
  let isLeftPanelExpanded = true; // Set to true or false based on your preference

  // Reactive variable to check if there are any status messages
  $: hasStatusMessages = statusMessages.length > 0;

  // Toggle the status panel expansion
  function toggleStatusPanel() {
    isStatusPanelExpanded = !isStatusPanelExpanded;
  }

  // Toggle the left panel expansion
  function toggleLeftPanel() {
    isLeftPanelExpanded = !isLeftPanelExpanded;
  }

  // Function to handle drag start event
  function onDragStart(event: DragEvent, nodeType: string) {
    event.dataTransfer?.setData("application/svelteflow", nodeType);
    event.dataTransfer?.setData("text/plain", nodeType); // For compatibility
    event.dataTransfer?.setDragImage(event.target as Element, 0, 0);
    event.dataTransfer!.effectAllowed = "move";
  }

  // Array to store status messages
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
    data: { color: "#000000" },
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
    <div class="left-panel">
      <div class="panel-spacing">
        <h2 class="text-lg font-semibold mb-4 flex-center flex-gap">
          <Plus class="flow-icon" />
          <span>Nodes</span>
        </h2>
        <ul>
          {#each availableNodes as node}
            <li
              class="draggable-node"
              draggable="true"
              on:dragstart={(event) => onDragStart(event, node.type)}
            >
              {#if node.icon}
                <svelte:component this={node.icon} class="flow-icon" />
              {/if}
              <span>{node.label}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}

  <!-- Left Panel Toggle Button -->
  <div class="left-toggle-button">
    <button
      class="left-toggle-button-inner"
      style="left: {isLeftPanelExpanded ? '320px' : '0'}"
      on:click={toggleLeftPanel}
      aria-label={isLeftPanelExpanded ? "Collapse node panel" : "Expand node panel"}
    >
      <svelte:component
        this={isLeftPanelExpanded ? ChevronLeft : ChevronRight}
        class="flow-icon"
      />
    </button>
  </div>

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
      {defaultEdgeOptions}
      on:nodedrag={onNodeDrag}
      on:nodedragstop={onNodeDragStop}
      on:dragover={onDragOver}
      on:drop={onDrop}
      fitView
    >
      <!-- Custom connection line -->
      <ConnectionLine slot="connectionLine" />

      <!-- Control Panel -->
      <Panel position="top-right">
        <div class="flex items-center">
          <div class="button-container flex-center flex-gap transition-transform duration-300">
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
              <!-- Save Button TODO: Changes between local and cloud storage depending on auth/marketplace/premium -->
            {#if $isAuthenticated && $user || hasAttemptedSave}
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
      <Background />
      <MiniMap />
    </SvelteFlow>
  </div>

  <!-- Status Panel Toggle Button -->
  {#if hasStatusPanel}
    <div
      class="status-toggle-button ml-2 transition-all duration-300"
      class:opacity-0={!hasStatusPanel}
    >
      <button
        class="status-toggle-button-inner"
        style="right: {isStatusPanelExpanded ? '320px' : '0'}"
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

  <!-- Status Panel -->
  <div
    class="status-panel"
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
