<!-- src/lib/components/customNodes/ColorPickerNode.svelte -->
<script lang="ts">
    import { Handle, Position } from '@xyflow/svelte';
    import type { BaseNodeProps } from '$lib/types/nodeProps';
    import type { TVariant } from '$lib/types/tailwind';
    import type { CtrlData } from '$lib/types/block';
    import { writable } from 'svelte/store';

    // Declare props using export const
    export const id: BaseNodeProps['id'] = '';
    export const type: BaseNodeProps['type'] = '';
    export const data: BaseNodeProps['data'] = {
        id: '',
        label: '',
        type: '',
        func: '',
        path: '',
        ctrls: {} as CtrlData // Assign a default value that matches CtrlData type
    };
    export const position: BaseNodeProps['position'] = { x: 0, y: 0 };
    export const selected: boolean = false;
    export const width: string = 'fit-content';
    export const height: number = 100;
    export const variant: TVariant = 'accent1'; // Assuming TVariant is defined
    export const showLabel: boolean = true;
    export const className: string = '!border-none !p-0';
    export const labelPosition: 'left' | 'right' | 'center' = 'center';
    export const sourcePosition: string = '';
    export const targetPosition: string = '';
    export const dragHandle: string = '';
    export const selectable: boolean = false;
    export const deconstable: boolean = false;
    export const draggable: boolean = false;
    export const parentId: string = '';
    export const zIndex: number = 0;
    export const isConnectable: boolean = false;
    export const positionAbsoluteX: number = 0;
    export const positionAbsoluteY: number = 0;
    export const dragging: boolean = false;

    // Destructure colorStore from data and ensure it's a writable store
    const { colorStore: initialColor } = data;
    const colorStore = writable(initialColor || '#000000'); // Default to black if undefined
</script>

<div class="colorpickernode">
    <Handle type="target" position={Position.Left} />
    <div>
        Custom Color Picker Node: <strong>{$colorStore}</strong>
    </div>
    <input
        class="nodrag"
        type="color"
        on:input={(evt) => colorStore?.set(evt.currentTarget.value)}
        bind:value={$colorStore}
    />
    <Handle type="source" position={Position.Right} id="a" style="top: 20px;" />
    <Handle type="source" position={Position.Right} id="b" style="top: auto; bottom: 10px;" />
</div>

<style>
    .colorpickernode {
        background-color: white;
        padding: 10px;
        border: 1px solid #777;
        border-radius: 20px;
    }
</style>