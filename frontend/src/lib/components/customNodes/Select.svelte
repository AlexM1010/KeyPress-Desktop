<script lang="ts">
    import type { SvelteComponent } from 'svelte';
  
    export let label: string;
    export let options: string[];
    export let icon: typeof SvelteComponent<any> | null = null;
</script>
  
<div class="space-y-1.5">
    <label for="select-input" class="block text-xs font-medium text-gray-500">{label}</label>
    <div class="relative">
        {#if icon}
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svelte:component this={icon} class="w-4 h-4" />
            </div>
        {/if}
        <select id="select-input" class="w-full pr-3 py-2 pl-10 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent">
            {#each options as opt}
                <option>{opt}</option>
            {/each}
        </select>
    </div>
</div>