// src/stores/nodesStore.ts
import { writable } from 'svelte/store';

export interface NodeData {
    id: string;
    type: string;
    data: any; // Replace `any` with a more specific type if possible
}

const nodesStore = writable<NodeData[]>([]);

export default nodesStore;
