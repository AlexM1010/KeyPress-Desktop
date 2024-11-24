<script lang="ts">
    import { useDnD } from './utils/utils';
    import type { Node } from '@xyflow/svelte';
    
    const type = useDnD();
    
    interface NodeData {
      type: string;
      label: string;
      nodeType: string;
      data: {
        label: string;
        styles: { 
          fill: string; 
          stroke: string;
        }
      }
    }
  
    const onDragStart = (event: DragEvent, nodeData: NodeData) => {
      if (!event.dataTransfer) {
        return null;
      }
      
      // Set both the type store and the transfer data
      type.set(nodeData.type);
      event.dataTransfer.setData('application/svelteflow', nodeData.type);
      event.dataTransfer.setData('application/json', JSON.stringify(nodeData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    const customNodes = [
      {
        type: 'svgNode',
        label: 'Start',
        nodeType: 'start',
        data: {
          label: 'Start',
          styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
        }
      },
      {
        type: 'svgNode',
        label: 'Input',
        nodeType: 'input',
        data: {
          label: 'Input',
          styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
        }
      },
      {
        type: 'svgNode',
        label: 'Process',
        nodeType: 'process',
        data: {
          label: 'Process',
          styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
        }
      },
      {
        type: 'svgNode',
        label: 'Decision',
        nodeType: 'decision',
        data: {
          label: 'Decision',
          styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
        }
      },
      {
        type: 'svgNode',
        label: 'Store',
        nodeType: 'store',
        data: {
          label: 'Store',
          styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
        }
      },
      {
        type: 'svgNode',
        label: 'Wait',
        nodeType: 'delay',
        data: {
          label: 'Wait',
          styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
        }
      },
      {
        type: 'svgNode',
        label: 'End',
        nodeType: 'end',
        data: {
          label: 'End',
          styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
        }
      }
    ] satisfies NodeData[];
  
    // Preview renderers for the sidebar
    const getPreviewPath = (nodeType: string): string => {
      switch (nodeType) {
        case 'start':
        case 'end':
          return 'M 0 30 A 30 30 0 0 1 100 30 A 30 30 0 0 1 0 30';
        case 'input':
          return 'M 10 0 L 90 0 L 100 30 L 90 60 L 10 60 L 0 30 Z';
        case 'process':
          return 'M 0 0 L 100 0 L 100 60 L 0 60 Z';
        case 'decision':
          return 'M 50 0 L 100 30 L 50 60 L 0 30 Z';
        case 'store':
          return 'M 0 10 L 80 10 Q 100 10 100 30 L 100 40 Q 100 60 80 60 L 0 60 Q 20 35 0 10';
        case 'delay':
          return 'M 0 0 L 70 0 Q 100 0 100 30 Q 100 60 70 60 L 0 60 Z';
        default:
          return 'M 0 0 L 100 0 L 100 60 L 0 60 Z';
      }
    };
  
    // Clean up the type when drag ends
    const onDragEnd = () => {
      type.set(null);
    };
  </script>
  
  <aside class="h-full bg-background border-r border-border p-4">
    <div class="text-sm font-medium text-center mb-6">
      Drag nodes to the canvas
    </div>
    
    <div class="flex flex-col space-y-4">
      {#each customNodes as node}
        <div
          class="node-wrapper"
          on:dragstart={(event) => onDragStart(event, node)}
          on:dragend={onDragEnd}
          draggable={true}
          role="button"
          tabindex={0}
        >
          <div class="node-container">
            <svg
              viewBox="0 0 100 60"
              width="100"
              height="60"
              class="node-svg"
            >
              <path
                d={getPreviewPath(node.nodeType)}
                fill={node.data.styles.fill}
                stroke={node.data.styles.stroke}
                stroke-width="2"
              />
            </svg>
            <span class="text-xs font-medium mt-1">{node.label}</span>
          </div>
        </div>
      {/each}
    </div>
  </aside>
  
  <style>
    .node-wrapper {
      cursor: grab;
      transition: transform 0.2s;
      user-select: none;
    }
  
    .node-wrapper:hover {
      transform: translateY(-2px);
    }
  
    .node-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      background-color: var(--background);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
    }
  
    .node-svg {
      max-width: 100%;
      height: auto;
    }
  
    .node-wrapper:active {
      cursor: grabbing;
    }
  </style>