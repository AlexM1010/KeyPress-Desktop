<script lang="ts">
    import { Position } from '@xyflow/svelte';
    import { Palette } from 'lucide-svelte';
    import { writable } from 'svelte/store';
    import NodeWrapper from './NodeWrapper.svelte';
    import type { BaseNodeProps } from '$lib/types/nodeProps';
    import type { TVariant } from '$lib/types/tailwind';
    import type { CtrlData } from '$lib/types/block';
    import type { HandleConfig } from './types';

    // Node Props
    export const id: BaseNodeProps['id'] = '';
    export const type: BaseNodeProps['type'] = '';
    export const data: BaseNodeProps['data'] = {
        id: '',
        label: '',
        type: '',
        func: '',
        path: '',
        ctrls: {} as CtrlData
    };

    // Node connection point configuration
    const handles: HandleConfig[] = [
        { id: 'right', type: 'source', position: Position.Right, offsetY: 50 },
    ];

    export const position: BaseNodeProps['position'] = { x: 0, y: 0 };
    export const selected: boolean = false;
    export const width: string = 'fit-content';
    export const height: number = 100;
    export const variant: TVariant = 'accent1';
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

    // Color store setup
    const { colorStore: initialColor } = data;
    const colorStore = writable(initialColor || '#000000');
</script>

<NodeWrapper
    icon={Palette}
    title="Color Picker"
    color="bg-gradient-to-r from-violet-500 to-purple-500"
    {handles}
    {isConnectable}
    {...$$restProps}
>
    <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Selected Color:</span>
            <span class="font-mono text-sm">{$colorStore}</span>
        </div>
        
        <input
            type="color"
            class="nodrag w-full h-12 cursor-pointer rounded-lg border border-gray-200 bg-white/50 transition-all duration-200 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            on:input={(evt) => colorStore?.set(evt.currentTarget.value)}
            bind:value={$colorStore}
        />
    </div>
</NodeWrapper>
