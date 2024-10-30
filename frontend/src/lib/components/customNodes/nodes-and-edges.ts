import type { Node, Edge } from '@xyflow/svelte';
import { writable } from 'svelte/store';
import { nodeShapes } from './NodeSVGStore';  // Add this import

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const baseX = 0;
const baseY = 0;
const xSpacing = 200;

export const initialNodes: Node[] = [ /*
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position
  },
  {
    id: '2d',
    data: { label: 'node 2d' },
    position
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position
  },
  {
    id: '4',
    data: { label: 'node 4' },
    position
  },
  {
    id: '5',
    data: { label: 'node 5' },
    position
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'output' },
    position
  },
  { id: '7', type: 'output', data: { label: 'output' }, position },
  {
    id: '8',
    // this type needs to match the newly defined node type
    type: 'color-picker',
    position: { x: 0, y: 0 },
    // data is used to store the current color value
    data: { color: writable('#ff4000') },
  },
  {
    id: 'button-1',
    type: 'input',
    data: { label: 'Button Edge 1' },
    position: { x: 125, y: 0 }
  },
  { id: 'button-2', data: { label: 'Button Edge 2' }, position: { x: 125, y: 200 } },
  { id: 'bin-node', type: 'group', position: { x: 0, y: 0 }, data: { label: 'Bin Node' } }, */
  { 
    id: 'start',
    type: 'svgNode',
    position: { x: baseX, y: baseY },
    data: {
      shape: nodeShapes.start,
      label: 'Start',
      styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
    }
  },
  {
    id: 'input',
    type: 'svgNode',
    position: { x: baseX + xSpacing, y: baseY },
    data: {
      shape: nodeShapes.input,
      label: 'Input',
      styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
    }
  },
  {
    id: 'process',
    type: 'svgNode',
    position: { x: baseX + xSpacing * 2, y: baseY },
    data: {
      shape: nodeShapes.process,
      label: 'Process',
      styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
    }
  },
  {
    id: 'decision',
    type: 'svgNode',
    position: { x: baseX + xSpacing * 3, y: baseY },
    data: {
      shape: nodeShapes.decision,
      label: 'Decision',
      styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
    }
  },
  {
    id: 'Store',
    type: 'svgNode',
    position: { x: baseX + xSpacing * 5, y: baseY },
    data: {
      shape: nodeShapes.store,
      label: 'Store',
      styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
    }
  },
  {
    id: 'delay',
    type: 'svgNode',
    position: { x: baseX + xSpacing * 12, y: baseY },
    data: {
      shape: nodeShapes.delay,
      label: 'Wait',
      styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
    }
  },
  {
    id: 'end',
    type: 'svgNode',
    position: { x: baseX + xSpacing * 13, y: baseY },
    data: {
      shape: nodeShapes.end,
      label: 'End',
      styles: { fill: '#f0f9ff', stroke: '#3b82f6' }
    }
  },
  {
    id: 'mouse-click',
    type: 'mouse-click-node',
    position: { x: baseX + xSpacing * 2, y: baseY + xSpacing },
    data: {
      label: 'Mouse Click',
      icon: 'MousePointer',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      buttonTypes: ["Left Click", "Right Click", "Middle Click"],
      actions: ["Single", "Double", "Triple", "Hold"],
      clickDuration: 75
    }
  },
  {
    id: 'keypress',
    type: 'keypress-node',
    position: { x: baseX + xSpacing * 2, y: baseY + xSpacing },
    data: {
      label: 'Mouse Click',
      icon: 'MousePointer',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      buttonTypes: ['Press', 'Hold', 'Release'],
      actions: ['None', 'Shift', 'Ctrl', 'Alt', 'Windows'], // Will need Command for Mac
      clickDuration: 75
    }
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