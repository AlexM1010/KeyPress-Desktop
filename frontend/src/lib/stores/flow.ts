// frontend/src/lib/stores/flow.ts
import { writable, type Writable } from 'svelte/store';
import type { Position, Node, Edge } from '@xyflow/svelte';

export type HandleConfig = {
    type: 'source' | 'target';
    position: Position;
    id?: string;
    offsetX?: number;
    offsetY?: number;
  };

export interface NodeData extends Node{
    id: string;
    type: string;
    data: Record<string, any>;
}

export interface MouseClickNodeData extends NodeData {
    data: {
        buttonType: 'left' | 'middle' | 'right';
        numberOfClicks: number;
        clickDelay: number;
        pressReleaseDelay: number;
        releaseAfterPress: boolean;
        scrollDirection: ('Vertical' | 'Horizontal')[];
        scrollLines: number;
    }
}

export interface DelayNodeData extends NodeData {
    data: {
        delayType: 'Fixed' | 'Random';
        time: number;
        minTime: number;
        maxTime: number;
    }
}

// Initialize writable stores with the correct types
export const nodesData: Writable<NodeData[]> = writable([]);
export const edgesData: Writable<Edge[]> = writable([]);
