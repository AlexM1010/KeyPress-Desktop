<script lang="ts">
    import { goto } from '$app/navigation';
    import { Button } from '$lib/components/ui/button';
    import { ModeWatcher } from "mode-watcher";
    import ThemeToggle from './ThemeToggle.svelte';
    import { onMount } from 'svelte';
    import { auth, isAuthenticated, user, isInitialized } from '$lib/stores/auth';
    import "../app.css";
    import '$lib/index.scss';

    // No need for manual store subscriptions since we're using the derived stores
    let isReady = false;
    
    onMount(() => {
        // Check if we're in dev mode (no Wails)
        if (!window.runtime) {
            console.log('Running in dev mode');
            isReady = true;
            return;
        }

        // Initialize if Wails is available
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

    // Handle logout
    async function handleLogout() {
        try {
            await auth.signOut();
            await goto('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally show an error notification
        }
    }

    // Debug logging (you can remove these in production)
    $: console.log('isAuthenticated:', $isAuthenticated);
    $: console.log('currentUser:', $user);
</script>

<ModeWatcher />

<!-- Navbar -->
<div class="bg-background text-black dark:text-white">
    <div class="max-w-3xl mx-auto flex justify-between items-center py-4 px-4">
        <!-- Left side of navbar -->
        <div class="flex items-center space-x-4">
            <button on:click={() => goto('/')} class="flex items-center">
                <img 
                    src="/Keypress-Logo.svg" 
                    alt="Keypress Logo" 
                    class="h-10 w-auto max-w-full object-contain" 
                />
                <span class="h1 --text-main font-bold text-xl">eypress</span>
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