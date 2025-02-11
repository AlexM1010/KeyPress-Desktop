<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores'; 
    import { ModeWatcher } from "mode-watcher";
    import ThemeToggle from './ThemeToggle.svelte';
    import Logo from './Logo.svelte';
    import '$lib/index.scss';
    import { ChevronDown } from 'lucide-svelte';
    import './navbar.css';
    import { isExpanded } from '$lib/stores/navbar';

    function toggleLayout() {
        isExpanded.update(value => !value);
    }
</script>

<ModeWatcher />

<!-- Toggle Button -->
{#if $page.url.pathname === '/'}
<div class="transition-all duration-300">
    <button
        class="navbar-toggle-button"
        class:expanded={$isExpanded}
        class:collapsed={!$isExpanded}
        on:click={toggleLayout}
        aria-label={$isExpanded ? "Collapse layout" : "Expand layout"}
    >
        <ChevronDown class={`w-5 h-5 transition-transform ${$isExpanded ? 'rotate-180' : ''}`} />
    </button>
</div>
{/if}

<!-- Navbar -->
<div class="navbar-container text-white" class:collapsed={!$isExpanded}>
    <!-- Left side of navbar -->
    <div class="navbar-left">
        <Logo customClass="logo" />
        <button class="nav-btn" on:click={() => goto('/')}>
            Workspace
        </button>
        <button class="nav-btn" on:click={() => goto('/projects')}>
            Projects
        </button>
    </div>
    <!-- Right side of navbar -->
    <div class="flex items-center">
        <ThemeToggle />
    </div>
</div>

<slot />
