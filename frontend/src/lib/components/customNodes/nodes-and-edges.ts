import type { Node, Edge, Position } from '@xyflow/svelte';
import { writable } from 'svelte/store';
import { nodeShapes } from './NodeSVGStore';  // Add this import

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const baseX = 0;
const baseY = 0;
const xSpacing = 600;

export const initialNodes: Node[] = [ 
  /*
  { 
    id: 'startsvg',
    type: 'svgNode',
    position: { x: baseX, y: baseY },
    data: {
      shape: nodeShapes.start,
      label: 'Start',
      styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
    }
  }, */
  {
    id: 'colorpicker-1',
    type: 'ColorPicker',
    position: { x: baseX + xSpacing * 3, y: baseY + xSpacing * 2 },
    data: {
      label: 'Color Picker',
      colorStore: '#6366f1', // Default to indigo
      icon: 'Palette',
      color: 'bg-gradient-to-r from-violet-500 to-purple-500'
    },
    targetPosition: 'left' as Position,
    sourcePosition: 'right' as Position
  },
  {
    id: 'Click',
    type: 'Click',
    position: { x: baseX + xSpacing * 2, y: baseY + xSpacing },
    data: { }
  },
  {
    id: 'keypress',
    type: 'keypress-node',
    position: { x: baseX + xSpacing * 2, y: baseY + xSpacing },
    data: {}
  },
  {
    id: 'Start',
    type: 'Start',
    position: { x: baseX + xSpacing * 2, y: baseY + xSpacing },
    data: {
      label: 'Start',
      icon: 'Play',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    }
  },
  {
    id: 'MoveMouse-node',
    type: 'MoveMouse',
    position: { x: baseX + xSpacing * 4, y: baseY + xSpacing }, // Adjust position as needed
    data: {
      x: 300.0,
      y: 400.0
    },
    targetPosition: 'right' as Position,
    sourcePosition: 'left' as Position,
    measured: { width: 100, height: 50 }
  },
  {
    id: 'MoveMouse-node1',
    type: 'MoveMouse',
    position: { x: baseX + xSpacing * 4, y: baseY + xSpacing }, // Adjust position as needed
    data: {
      x: 300.0,
      y: 400.0
    },
    targetPosition: 'right' as Position,
    sourcePosition: 'left' as Position,
    measured: { width: 100, height: 50 }
  },
];

export const initialEdges: Edge[] = [
  /*
  { id: 'e12', source: '1', target: '2', type: edgeType, animated: true },
  { id: 'e13', source: '1', target: '3', type: edgeType, animated: true },
  { id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true },
  { id: 'e22b', source: '2', target: '2b', type: edgeType, animated: true },
  { id: 'e22c', source: '2', target: '2c', type: edgeType, animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', type: edgeType, animated: true },
  { id: 'e45', source: '4', target: '5', type: edgeType, animated: true },
  { id: 'e56', source: '5', target: '6', type: edgeType, animated: true },
  { id: 'e57', source: '5', target: '7', type: edgeType, animated: true },
  { // this edge is a close button edge
    id: 'edge-button',
    source: 'button-1',
    target: 'button-2',
    type: 'buttonedge'
  } */
];