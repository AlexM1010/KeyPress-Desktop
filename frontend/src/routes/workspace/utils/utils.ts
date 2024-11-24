// 1 - save Utils 
// 2 - flow Utils
// 3 - sidebar Utils

// =================================================================================================================
//                                                  save Utils 
// =================================================================================================================

import type { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';

// Function to check if the user is authenticated
function isUserAuthenticated(session: Session | null): boolean {
    return session !== null && session.user !== null;
}

// Store to keep track of the last saved flow data
export const lastSavedFlowData: Writable<string> = writable('');

// Store to keep track of the current flow ID
export const currentFlowId: Writable<string | null> = writable(null);

// Function to save or update flow data in Supabase
export async function saveOrUpdateFlow(
    supabase: SupabaseClient,
    session: Session | null,
    flowData: any,
    flowName: string
) {
    if (!isUserAuthenticated(session)) {
        console.error("User not authenticated");
        return { success: false, error: 'User not authenticated' };
    }

    const lastSaved = get(lastSavedFlowData);
    const currentFlowString = JSON.stringify(flowData);

    if (currentFlowString === lastSaved) {
        console.log("Flow has not changed; skipping save.");
        return { success: false, error: 'No changes detected in the flow.' };
    }

    // Determine if we're inserting a new flow or updating an existing one
    const currentId = get(currentFlowId);
    let result;

    if (currentId) {
        // Update existing flow
        const { data, error } = await supabase
            .from('user_flows')
            .update({ flow_data: flowData, flow_name: flowName, updated_at: new Date() })
            .eq('id', currentId)
            .eq('user_id', session?.user?.id);

        result = { data, error };
    } else {
        // Insert new flow
        const { data, error } = await supabase
            .from('user_flows')
            .insert([{ user_id: session?.user?.id, flow_data: flowData, flow_name: flowName }])
            .select();

        if (data && data.length > 0) currentFlowId.set(data[0]?.id); // Set current flow ID if insert is successful
        result = { data, error };
    }

    if (result.error) {
        console.error("Error saving flow:", result.error.message);
        return { success: false, error: result.error };
    }

    console.log("Flow saved:", result.data);
    lastSavedFlowData.set(currentFlowString); // Update last saved flow data after a successful save
    return { success: true, data: result.data };
}

// Function to load all flows for the authenticated user
export async function loadFlows(
    supabase: SupabaseClient,
    user: { id: string }
) {
    if (!user) {
        return { success: false, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
        .from('user_flows')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        console.error('Error loading flows:', error);
        return { success: false, error };
    }

    return { success: true, data };
}

// Function to check if the flow has changed
export function hasFlowChanged(
    currentFlow: any,
    lastSavedFlow: string
): boolean {
    const currentFlowString = JSON.stringify(currentFlow);
    return currentFlowString !== lastSavedFlow;
}

// Function to start auto-saving
export function startAutoSave(
    supabase: SupabaseClient,
    session: Session | null,
    flowData: Writable<any>,
    flowName: string,
    interval: number = 60000
) {
    const autoSaveInterval = setInterval(async () => {
        const lastSaved = get(lastSavedFlowData);
        const currentFlow = get(flowData);

        if (hasFlowChanged(currentFlow, lastSaved)) {
            const response = await saveOrUpdateFlow(supabase, session, currentFlow, flowName);
            if (response.success) {
                console.log('Flow auto-saved successfully!');
            } else {
                console.error('Failed to auto-save flow:', response.error);
            }
        }
    }, interval);

    return autoSaveInterval;
}

// Function to stop auto-saving
export function stopAutoSave(autoSaveInterval: any) {
    clearInterval(autoSaveInterval);
}


// =================================================================================================================
//                                                  flow Utils 
// =================================================================================================================

import dagre from "@dagrejs/dagre";
import "../../app.css";
import {
    Position,
    type Node,
    type Edge,
} from "@xyflow/svelte";
import "@xyflow/svelte/dist/style.css";
import { initialNodes, initialEdges } from "$lib/components/customNodes/nodes-and-edges";
import type { PageData } from '../$types';

export let data: PageData;

// Auto rearrange constants
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 172;
const nodeHeight = 36;

// Auto rearrange functions
function getLayoutedElements(
    nodes: Node[],
    edges: Edge[],
    direction = "TB",
) {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: nodeWidth,
            height: nodeHeight,
        });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? Position.Left : Position.Top;
        node.sourcePosition = isHorizontal
            ? Position.Right
            : Position.Bottom;

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };
    });

    return { nodes, edges };
}

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges,
);

const nodes = writable<Node[]>(layoutedNodes);
const edges = writable<Edge[]>(layoutedEdges);

// Proximity connect functions
const MIN_DISTANCE = 50;

function getClosestEdge(node: Node, nodes: Node[]) {
    const closestNode = nodes.reduce(
        (res, n) => {
            if (n.id !== node.id) {
                const dx = n.position.x - node.position.x;
                const dy = n.position.y - node.position.y;
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d < res.distance && d < MIN_DISTANCE) {
                    res.distance = d;
                    res.node = n;
                }
            }

            return res;
        },
        { distance: Number.MAX_VALUE, node: null } as { distance: number; node: Node | null },
    );

    if (!closestNode.node) {
        return null;
    }

    const closeNodeIsSource = closestNode.node.position.x < node.position.x;

    return {
        id: closeNodeIsSource
            ? `${node.id}-${closestNode.node.id}`
            : `${closestNode.node.id}-${node.id}`,
        source: closeNodeIsSource ? closestNode.node.id : node.id,
        target: closeNodeIsSource ? node.id : closestNode.node.id,
        class: "temp",
    };
}

function onNodeDrag({ detail: { targetNode: node } }: { detail: { targetNode: Node | null } }) {
    if (node === null) { // handle the case where node is null
        return;
    }

    const closestEdge = getClosestEdge(node, get(nodes));

    let edgeAlreadyExists = false;
    const edgesValue = get(edges);
    edgesValue.forEach((edge, i) => {
        if (edgeAlreadyExists) {
            return;
        }

        if (closestEdge) {
            // non-temporary edge already exists
            if (
                edge.source === closestEdge.source &&
                edge.target === closestEdge.target
            ) {
                edgeAlreadyExists = true;
                return;
            }

            if (edge.class !== "temp") {
                return;
            }

            if (
                edge.source !== closestEdge.source ||
                edge.target !== closestEdge.target
            ) {
                edgesValue[i] = closestEdge; // replace the edge
                edgeAlreadyExists = true;
            }
        } else if (edge.class === "temp") {
            edgesValue.splice(i, 1); // remove edge
        }
    });

    if (closestEdge && !edgeAlreadyExists) {
        edgesValue.push(closestEdge);
    }

    edges.set(edgesValue);
}

function onNodeDragStop() {
    const edgesValue = get(edges);
    edgesValue.forEach((edge) => {
        if (edge.class === "temp") {
            edge.class = "";
        }
    });
    edges.set(edgesValue);
}

function onLayout(direction: string) {
    const layoutedElements = getLayoutedElements(get(nodes), get(edges), direction);
    nodes.set(layoutedElements.nodes);
    edges.set(layoutedElements.edges);
}

export { nodes, edges, onNodeDrag, onNodeDragStop, onLayout };

// =================================================================================================================
//                                                  sidebar Utils 
// =================================================================================================================

// Create a single store instance
const createDndStore = () => {
  const { subscribe, set } = writable<string | null>(null);
  return {
    subscribe,
    set: (value: string | null) => set(value),
  };
};

// Export a single instance
export const dndStore = createDndStore();

// Export a hook that returns the store
export const useDnD = () => dndStore;