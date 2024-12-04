// src/lib/nodeTypes.ts
import type { NodeTypes } from '@xyflow/svelte';
import type { SvelteComponent } from 'svelte';
import ColorPickerNode from './ColorPickerNode.svelte';
import SVGNode from './SVGNode.svelte';
import MouseClickNode from './MouseClickNode.svelte';
import KeyPressNode from './KeyPressNode.svelte';
import StartNode from './StartNode.svelte';
import MouseMoveNode from './MouseMoveNode.svelte';
import DelayNode from './DelayNode.svelte';

export const nodeTypes: NodeTypes = {
  'ColorPicker': ColorPickerNode as unknown as typeof SvelteComponent,
  'svgNode': SVGNode as unknown as typeof SvelteComponent,
  'Click': MouseClickNode as unknown as typeof SvelteComponent,
  'Keypress': KeyPressNode as unknown as typeof SvelteComponent,
  'Start': StartNode as unknown as typeof SvelteComponent,
  'MoveMouse': MouseMoveNode as unknown as typeof SvelteComponent,
  'DelayNode': DelayNode as unknown as typeof SvelteComponent
};