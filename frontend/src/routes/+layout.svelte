<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { ModeWatcher } from "mode-watcher";
    import { generateUserId } from '$lib/utils';
    import ThemeToggle from './ThemeToggle.svelte';
    import { onMount } from 'svelte';
    import { authStore } from '$lib/stores/authStore';
    import type { User } from '../global';
    import "../app.css";

    let isReady = false;
    
    // Use the $ prefix to automatically subscribe to the store
    $: isAuthenticated = $authStore.isAuthenticated;
    $: currentUser = $authStore.user;

    onMount(() => {
        // Check if we're in dev mode (no Wails)
        if (!window.runtime) {
            console.log('Running in dev mode');
            isReady = true;
            return;
        }

        // Initialize if Wails is available
        if (window.backend) {
            const init = async () => {
                await authStore.init();
                isReady = true;
            };
            init();
        } else {
            // Fallback for when backend isn't available
            console.log('No backend available');
            isReady = true;
        }
    });

    // Handle logout
    async function handleLogout() {
        await authStore.clearAuth();
    }
</script>

<ModeWatcher />

<!-- Navbar -->
<div class="bg-background border-b text-black dark:text-white">
    <div class="max-w-3xl mx-auto flex justify-between items-center py-4 px-4">
        <!-- Left side of navbar -->
        <div class="flex items-center space-x-4">
            <a href="/">
                <img 
                    src="/src/lib/assets/logo-no-background.png" 
                    alt="KeyPress Logo" 
                    class="h-10 w-auto max-w-full object-contain" 
                />
            </a>
            {#if isAuthenticated && currentUser}
                <Button href={`/workspace`} variant="ghost">
                    Workspace
                </Button>
            {/if}
        </div>
        <!-- Right side of navbar -->
        <div class="flex items-center space-x-4">
            {#if isAuthenticated && currentUser}
                <span class="text-foreground">{currentUser.email}</span>
                <Button on:click={handleLogout} variant="ghost">
                    Logout
                </Button>
            {:else}
                <Button href="/register" variant="ghost">
                    Register
                </Button>
                <Button href="/login" variant="ghost">
                    Login
                </Button>
            {/if}
            <ThemeToggle />
        </div>
    </div>
</div>

{#if !isReady}
    <div class="flex items-center justify-center h-screen">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
{:else}
    <slot />
{/if}