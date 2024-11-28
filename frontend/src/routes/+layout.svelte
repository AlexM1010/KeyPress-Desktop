<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores'; 
    import { Button } from '$lib/components/ui/button';
    import { ModeWatcher } from "mode-watcher";
    import ThemeToggle from './ThemeToggle.svelte';
    import Logo from './Logo.svelte';
    import { onMount } from 'svelte';
    import { auth, isAuthenticated, user, isInitialized } from '$lib/stores/auth';
    import '$lib/index.scss';
    import { ChevronDown } from 'lucide-svelte';
    import './navbar.css';
    import { isExpanded } from '$lib/stores/navbar';

    //TODO background is above button hover color somehow maybe

    let isReady = false;

    function toggleLayout() {
        isExpanded.update(value => !value);
    }

    onMount(() => {
        if (!window.runtime) {
            console.log('Running in dev mode');
            isReady = true;
            return;
        }

        const init = async () => {
            try {
                await auth.init();
            } catch (error) {
                console.error('Auth initialization failed:', error);
            } finally {
                isReady = true;
            }
        };

        init();
    });

    async function handleLogout() {
        try {
            await auth.signOut();
            await goto('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    $: console.log('isAuthenticated:', $isAuthenticated);
    $: console.log('currentUser:', $user);
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
    <div class="w-full px-6 flex justify-between items-center h-[4rem]">
        <!-- Left side of navbar -->
        <div class="flex items-center fixed">
            <Logo />
            <Button on:click={() => goto('/')} variant="ghost">
                Workspace
            </Button>
            {#if $isAuthenticated && $user}
                <Button on:click={() => goto('/projects')} variant="ghost">
                    Projects
                </Button>
            {/if}
        </div>
        <!-- Right side of navbar -->
        <div class="flex items-center space-x-4 fixed right-6">
            {#if $isAuthenticated && $user}
                <span class="text-foreground">{$user.email}</span>
                <Button on:click={handleLogout} variant="ghost">
                    Logout
                </Button>
            {:else}
                <Button on:click={() => goto('/register')} variant="ghost">
                    Register
                </Button>
                <Button on:click={() => goto('/login')} variant="ghost">
                    Login
                </Button>
            {/if}
            <ThemeToggle />
        </div>
    </div>
</div>

{#if !($isInitialized && isReady)}
    <div class="flex items-center justify-center h-screen">
        <div class="animate-spin rounded-full h-8 w-8"></div>
    </div>
{:else}
    <slot />
{/if}