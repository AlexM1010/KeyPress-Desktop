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
  import { nodes, edges, onNodeDrag, onNodeDragStop, onLayout } from "./utils";
  import CustomEdge from "./CustomEdge.svelte";
  import { nodeTypes } from "$lib/components/customNodes/nodeTypes";
  import { flowTheme } from "$lib/stores/themeStore";
  import { user, isAuthenticated } from "$lib/stores/authStore";
  import Sidebar from "./Sidebar.svelte";
  import ConnectionLine from "./ConnectionLine.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

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
  } from "lucide-svelte";

  // Redirect to login if the user is not authenticated
  $: if (!$isAuthenticated || !$user) {
    goto("/login");
  }

  // Reactive statement to sync color mode with flow theme
  $: colorMode = $flowTheme;

  // Destructure helper functions from useSvelteFlow
  const { toObject, screenToFlowPosition } = useSvelteFlow();

  // State variables
  let isStatusPanelExpanded = false; // Tracks the status panel expansion
  let isExecuting = false; // Indicates if the flow is executing

  // Reactive variable to check if there are any status messages
  $: hasStatusMessages = statusMessages.length > 0;

  // Toggle the status panel expansion
  function toggleStatusPanel() {
    isStatusPanelExpanded = !isStatusPanelExpanded;
  }

  // Array to store status messages
  let statusMessages: { id: string; type: string; message: string }[] = [];
  let isSuccess = false;

  // Computed property to determine the current execution status and icon
  $: executionStatus = (() => {
    const hasError = statusMessages.some((msg) => msg.type === "error");
    const hasWarning = statusMessages.some((msg) => msg.type === "warning");
    const hasSuccess = statusMessages.some((msg) => msg.type === "success" && msg.message.includes("Flow execution completed"));
    
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

  // Modify the handleSave function
  async function handleSave() {
    console.log("Triggering manual save...");
    if (!$user) {
      console.error("User not authenticated");
      return;
    }

    try {
      isSaving = true;
      saveSuccess = false;
      saveError = false;
      
      // TODO: Implement save functionality here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate save
      
      saveSuccess = true;
      addStatusMessage({
        id: `save-${Date.now()}`,
        type: "success", 
        message: "Flow saved successfully."
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
        message: "Failed to save flow."
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
  function setupEventListeners() { //TODO fix infinite loading when nothing connects to the start node
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

{#if $isAuthenticated && $user}
  <div class="flow-container">
    <!-- Main Flow Area -->
    <div
      class="h-full flex-1 transition-all duration-300"
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
            <div
              class="button-container flex items-center space-x-2 transition-transform duration-300"
            >
              <!-- Run Flow Button -->
              <button
                class="bg-background text-foreground px-4 py-2 rounded flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                on:click={handleRunFlow}
                disabled={isExecuting}
              >
                <svelte:component this={executionStatus.icon} class="w-5 h-5 {executionStatus.color}" style={isExecuting ? "animation: spin 1s linear infinite" : ""} />
              </button>
              <!-- Save Button -->
              <button
                class="bg-background text-foreground px-4 py-2 rounded flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                on:click={handleSave}
                disabled={isSaving}
              >
                <svelte:component 
                  this={isSaving ? Loader : saveError ? X : saveSuccess ? Check : Save}
                  class="w-5 h-5 {isSaving ? 'text-blue-500' : saveError ? 'text-red-500' : saveSuccess ? 'text-green-500' : ''}"
                  style={isSaving ? "animation: spin 1s linear infinite" : ""}
                />
              </button>
              <!-- Layout Button -->
              <button
                class="bg-background text-foreground px-4 py-2 rounded flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                on:click={() => onLayout("TB")}
              >
                <LayoutDashboard class="w-5 h-5" />
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
          class="absolute top-[15%] right-80 -translate-y-1/2 bg-background border border-border rounded-l-md p-1 cursor-pointer z-20 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          style="right: {isStatusPanelExpanded ? '320px' : '0'}"
          on:click={toggleStatusPanel}
          aria-label={isStatusPanelExpanded
            ? "Collapse status panel"
            : "Expand status panel"}
        >
          <svelte:component
            this={isStatusPanelExpanded ? ChevronRight : ChevronLeft}
            class="w-4 h-4"
          />
        </button>
      </div>
    {/if}

    <!-- Status Panel -->
    <div
      class="absolute right-0 top-0 bottom-0 bg-gray-100 dark:bg-gray-800 border-l border-border overflow-y-auto transition-all duration-300"
      style="width: 320px; transform: translateX({isStatusPanelExpanded
        ? '0'
        : '100%'})"
    >
      <div class="p-4">
        <h2 class="text-lg font-semibold mb-4 flex items-center space-x-2">
          <svelte:component
            this={executionStatus.icon}
            class="w-6 h-6 {executionStatus.color}"
          />
          <span>Execution Status</span>
        </h2>
        {#if statusMessages.length === 0}
          <p class="text-gray-500 dark:text-gray-400">No status updates.</p>
        {:else}
          <ul>
            {#each statusMessages as msg (msg.id)}
              <li class="flex items-center mb-3">
                <!-- Status Icon -->
                {#if msg.type === "success"}
                  <Check class="w-5 h-5 text-green-500 mr-2" />
                {:else if msg.type === "error"}
                  <X class="w-5 h-5 text-red-500 mr-2" />
                {:else if msg.type === "warning"}
                  <TriangleAlert class="w-5 h-5 text-yellow-500 mr-2" />
                {:else if msg.type === "info" || msg.type === "running"}
                  <Play
                    class="w-5 h-5 text-blue-500 mr-2 {msg.type === 'running' ? 'animate-pulse' : ''}"
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
{/if}

<style>
  /* Prevent horizontal overflow */
  :global(html, body) {
    overflow-x: hidden;
  }

  /* Main flow container */
  .flow-container {
    width: 100%;
    height: calc(100vh - 4.5rem); /* Adjust based on header height */
    position: relative;
    overflow: hidden;
  }

  /* Button container styles */
  .button-container {
    transform-origin: right center;
  }

  /* Status toggle button styles */
  .status-toggle-button {
    transform-origin: left center;
  }

  .status-toggle-button:not(.opacity-0) {
    animation: slide-in 0.3s ease-out;
  }

  /* Slide-in animation */
  @keyframes slide-in {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* Loader spin animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
