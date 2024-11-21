// src/stores/nodes.ts
import { writable } from 'svelte/store';

export interface NodeData {
    id: string;
    type: string;
    data: any; // Replace `any` with a more specific type if possible
}

const nodes = writable<NodeData[]>([]);

export default nodes;
