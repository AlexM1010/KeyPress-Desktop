<!--StartNode.svelte - A customizable macro recording node component for flow-based interfaces -->
<!--
 * 
 * This component provides a UI for recording keyboard macros with support for:
 * - OS-specific special key detection and display
 * - Real-time macro recording
 * - Visual feedback during recording
 * - Customizable node appearance
 * 
 * @component
-->
<script lang="ts">
    import { Play } from 'lucide-svelte';
    import { Position } from '@xyflow/svelte';
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { slide, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import type { ComponentType } from 'svelte';
    import type { HandleConfig } from './types';
    import '$lib/index.scss';

    // Type definitions for OS-specific key mappings
    type OperatingSystem = 'windows' | 'macos' | 'linux';
    type SpecialKey = { key: string; label: string };

    // Configuration for special keys based on operating system
    const specialKeysByOS: Record<OperatingSystem, SpecialKey[]> = {
        windows: [
            { key: 'Control', label: 'Ctrl' },
            { key: 'Alt', label: 'Alt' },
            { key: 'Shift', label: 'Shift' },
            { key: 'Meta', label: 'Win' },
        ],
        macos: [
            { key: 'Meta', label: 'Cmd' },
            { key: 'Option', label: 'Option' },
            { key: 'Control', label: 'Ctrl' },
            { key: 'Shift', label: 'Shift' },
        ],
        linux: [
            { key: 'Control', label: 'Ctrl' },
            { key: 'Alt', label: 'Alt' },
            { key: 'Shift', label: 'Shift' },
            { key: 'Meta', label: 'Super' },
        ],
    };

    // Node connection point configuration
    const handles: HandleConfig[] = [
        { id: 'right', type: 'source', position: Position.Right, offsetY: 50 },
    ];

    // Props with default values
    export let id: string;
    export let title: string = 'Start';
    export let icon: ComponentType = Play;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600';
    export let isConnectable: boolean = true;

    // Component state
    let macroKeys: string[] = [];
    let isRecording: boolean = false;
    let osDetectionFailed: boolean = false;
    let currentOS: OperatingSystem;
    let selectedSpecialKeys = new Set<string>();

    const dispatch = createEventDispatcher();

    /**
     * Detects the user's operating system based on user agent
     * @returns {OperatingSystem} Detected operating system or 'windows' as fallback
     */
    function detectOS(): OperatingSystem {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('win')) return 'windows';
        if (userAgent.includes('mac')) return 'macos';
        if (userAgent.includes('linux')) return 'linux';
        osDetectionFailed = true;
        return 'windows'; // Fallback
    }

    currentOS = detectOS();

    // Event handlers
    const handleDuplicate = () => dispatch('duplicate');
    const handleDelete = () => dispatch('delete');

    /**
     * Toggles a special key's selected state
     * @param {string} key - The key to toggle
     */
    function toggleSpecialKey(key: string) {
        selectedSpecialKeys = new Set(selectedSpecialKeys);
        if (selectedSpecialKeys.has(key)) {
            selectedSpecialKeys.delete(key);
        } else {
            selectedSpecialKeys.add(key);
        }
    }

    // Macro recording functions
    function startRecording() {
        macroKeys = Array.from(selectedSpecialKeys);
        isRecording = true;
    }

    function stopRecording() {
        isRecording = false;
    }

    /**
     * Handles keydown events during macro recording
     * @param {KeyboardEvent} event - The keyboard event
     */
    function handleKeyDown(event: KeyboardEvent) {
        if (!isRecording) return;
        event.preventDefault();

        const key = event.key;
        if (!macroKeys.includes(key)) {
            macroKeys = [...macroKeys, key];
        }
    }

    /**
     * Handles keyup events during macro recording
     * @param {KeyboardEvent} event - The keyboard event
     */
    function handleKeyUp(event: KeyboardEvent) {
        if (!isRecording) return;
        
        if (!event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
            stopRecording();
        }
    }

    // Lifecycle hooks
    onMount(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    });

    onDestroy(() => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    });

    // Reactive declarations
    $: macroDisplay = macroKeys.join('+');

    $$restProps
</script>

<!-- Template remains unchanged but with improved class organization TODO: Link up data to input fields -->
<NodeWrapper 
    {icon} 
    {title} 
    {color}
    handles={handles}
    {isConnectable}
    id={id}
    type="start"
    data={{ macroKeys, isRecording, currentOS }} 
    on:duplicate={handleDuplicate} 
    on:delete={handleDelete}
>
    <div class="space-y-4" transition:slide|local={{duration: 300, easing: cubicOut}}>
        <!-- OS Selection -->
        {#if osDetectionFailed}
            <div class="flex flex-col" transition:slide|local={{duration: 300}}>
                <label for="os-select" class="text-sm font-medium text-[--secondary-text]">
                    Select Operating System:
                </label>
                <select
                    id="os-select"
                    bind:value={currentOS}
                    class="mt-1 block w-full px-3 py-2 bg-[--secondary-hover] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 transition-all duration-200"
                >
                    <option value="windows">Windows</option>
                    <option value="macos">macOS</option>
                    <option value="linux">Linux</option>
                </select>
            </div>
        {/if}

        <!-- Special Keys Selection -->
        <div class="flex flex-col">
            <label for="special-keys-group" class="text-sm font-medium text-[--secondary-text] mb-2">
                Special Keys:
            </label>
            <div id="special-keys-group" role="group" class="flex flex-wrap gap-2">
                {#each specialKeysByOS[currentOS] as specialKey}
                    <button
                        type="button"
                        on:click={() => toggleSpecialKey(specialKey.key)}
                        class={`px-3 py-1 rounded-md transition-all duration-200
                            ${selectedSpecialKeys.has(specialKey.key)
                            ? 'bg-[--secondary] text-[--secondary-text] transform scale-105'
                            : 'bg-[--secondary] hover:bg-[--secondary-hover] text-[--secondary-text] hover:scale-105'}
                            active:bg-[--accent] focus:outline-none`}
                    >
                        {specialKey.label}
                    </button>
                {/each}
            </div>
        </div>

        <!-- Macro Recording Controls -->
        <div class="flex flex-col">
            <label for="macro-controls" class="text-sm font-medium text-[--secondary-text] mb-2">
                Macro Keys:
            </label>
            <div id="macro-controls" class="flex items-center space-x-2">
                <button
                    on:click={isRecording ? stopRecording : startRecording}
                    class={`px-3 py-2 rounded-md shadow-sm focus:outline-none transition-all duration-300 ${
                        isRecording 
                            ? 'bg-red-500 text-[--main-text] animate-pulse' 
                            : 'bg-[--secondary] text-[--secondary-text] hover:bg-[--secondary-hover]'
                    }`}
                >
                    {isRecording ? 'Recording...' : 'Record Macro'}
                </button>
                <span 
                    class="px-3 py-2 bg-[--secondary-hover] rounded-md shadow-sm transition-all duration-200"
                    in:fade={{duration: 200}}
                >
                    {macroKeys.length ? macroDisplay : 'No macro'}
                </span>
            </div>
        </div>
    </div>
</NodeWrapper>

<style>
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    :global(.animate-pulse) {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
</style>