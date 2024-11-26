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

    let isReady = false;
    let isExpanded = true;
    $: isWorkspacePage = $page.url.pathname === '/workspace';

    function toggleLayout() {
        isExpanded = !isExpanded;
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

<style>
    .navbar-toggle-button {
        position: fixed;
        left: 10%;
        background-color: var(--tertiary);
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        padding: 0.25rem;
        cursor: pointer;
        z-index: 20;
        transition: all 0.3s ease;
    }

    /* Position when navbar is expanded */
    .navbar-toggle-button.expanded {
        top: 72px; /* Match navbar height */
    }

    /* Position when navbar is collapsed */
    .navbar-toggle-button.collapsed {
        top: 0;
    }

    .navbar-toggle-button:hover {
        background-color: var(--tertiary-hover);
    }

    /* Add navbar animation styles */
    .navbar-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 72px; /* Adjust based on your navbar height */
        transform-origin: top;
        transition: transform 0.3s ease;
        z-index: 10;
    }

    .navbar-container.collapsed {
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }
</style>

<ModeWatcher />

<!-- Toggle Button -->
{#if isWorkspacePage}
<div
    class="transition-all duration-300"
>
    <button
        class="navbar-toggle-button"
        on:click={toggleLayout}
        class:expanded={isExpanded}
        class:collapsed={!isExpanded}
        on:click={toggleLayout}
        aria-label={isExpanded ? "Collapse layout" : "Expand layout"}
    >
        <ChevronDown class={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
    </button>
</div>
{/if}

    <!-- Navbar -->
    <div class="bg-background navbar-container text-black dark:text-white" class:collapsed={!isExpanded}>
        <div class="max-w-3xl mx-auto flex justify-between items-center py-4 px-4">
            <!-- Left side of navbar -->
            <div class="flex items-center space-x-4">
                <button on:click={() => goto('/')} class="flex items-center">
                    <Logo />
                </button>
                <Button on:click={() => goto('/workspace')} variant="ghost">
                    Workspace
                </Button>
                {#if $isAuthenticated && $user}
                    <Button on:click={() => goto('/projects')} variant="ghost">
                        Projects
                    </Button>
                {/if}
            </div>
            <!-- Right side of navbar -->
            <div class="flex items-center space-x-4">
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