// src/lib/nodeTypes.ts
import type { NodeTypes } from '@xyflow/svelte';
import type { SvelteComponent } from 'svelte';
import ColorPickerNode from '$lib/components/customNodes/ColorPickerNode.svelte';
import SVGNode from './SVGNode.svelte';
import BinNode from '$lib/components/customNodes/BinNode.svelte';
import MouseClickNode from './MouseClickNode.svelte';
import KeyPressNode from './KeyPressNode.svelte';

export const nodeTypes: NodeTypes = {
  'color-picker': ColorPickerNode as unknown as typeof SvelteComponent,
  'svgNode': SVGNode as unknown as typeof SvelteComponent,
  'bin-node': BinNode as unknown as typeof SvelteComponent,
  'mouse-click-node': MouseClickNode as unknown as typeof SvelteComponent,
  'keypress-node': KeyPressNode as unknown as typeof SvelteComponent
};