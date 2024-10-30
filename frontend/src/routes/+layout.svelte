<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { ModeWatcher } from "mode-watcher";
    import { generateUserId } from '$lib/utils';
    import ThemeToggle from './ThemeToggle.svelte';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type { LoginResponse, LogoutResponse, GetSessionResponse } from '../types'; // Adjust the path as needed
    import {push, link} from 'svelte-spa-router' // added use:link to <button> component

    // Initialize Svelte stores
    const session = writable<GetSessionResponse>({
        userEmail: "",
        isLoggedIn: false
    });
    const message = writable<string>("");

    let modal: HTMLElement;
    let modalButton: HTMLElement;
    let closeButton: HTMLElement;
    let scrollDown: HTMLElement;
    let isOpened = false;

    // Reactive variables
    $: userEmail = $session.userEmail || "user@example.com"; // Default email if user is not set
    $: userId = $session.isLoggedIn ? generateUserId(userEmail) : ""; // Generate unique user ID

    /**
     * Fetch the current session from the backend
     */
    async function fetchSession() {
        try {
            const currentSession: GetSessionResponse = await window.backend.GetSession();
            session.set({
                userEmail: currentSession.userEmail,
                isLoggedIn: currentSession.isLoggedIn
            });
        } catch (error) {
            console.error("Error fetching session:", error);
            session.set({
                userEmail: "",
                isLoggedIn: false
            });
        }
    }

    /**
     * Handle user logout by calling the backend's Logout method
     */
    async function handleLogout() {
        console.log("Logout button clicked");
        try {
            const response: LogoutResponse = await window.backend.Logout();
            if (response.success) {
                message.set(response.message);
                // Update session state
                session.set({
                    userEmail: "",
                    isLoggedIn: false
                });
            } else {
                message.set(response.message);
            }
        } catch (error) {
            console.error("Error logging out:", error);
            message.set("An error occurred during logout.");
        }
    }

    /**
     * Setup event listeners for authentication state changes
     * Assumes the backend emits an 'authStateChange' event with session data
     */
    function setupAuthListeners() {
        window.runtime.EventsOn("authStateChange", (newSession: GetSessionResponse) => {
            session.set({
                userEmail: newSession.userEmail,
                isLoggedIn: newSession.isLoggedIn
            });
        });
    }

    onMount(() => {
        // Initial session fetch
        fetchSession();

        // Setup auth state change listeners
        setupAuthListeners();

        // Modal scroll and keydown event listeners
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("keydown", handleKeydown);
            window.runtime.EventsOff("authStateChange");
        };
    });

    /**
     * Modal control functions
     */
    const openModal = () => {
        if (modal) {
            modal.classList.add("is-open");
            document.body.style.overflow = "hidden";
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.remove("is-open");
            document.body.style.overflow = "initial";
        }
    };

    const handleScroll = () => {
        if (window.scrollY > window.innerHeight / 3 && !isOpened) {
            isOpened = true;
            if (scrollDown) {
                scrollDown.style.display = "none";
            }
            openModal();
        }
    };

    const handleKeydown = (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
            closeModal();
        }
    };
</script>

<ModeWatcher /> <!-- Automatically detect user preference for dark mode -->

<!-- Navbar -->
<div class="bg-background border-b text-black dark:text-white">
    <div class="max-w-3xl mx-auto flex justify-between items-center py-4 px-4">
        <!-- Left side of navbar -->
        <div class="flex items-center space-x-4">
            <a href="/" use:link>
                <img src="/src/lib/assets/logo-no-background.png" alt="KeyPress Logo" class="h-10 w-auto max-w-full object-contain" />
            </a>
            {#if $session.isLoggedIn}
                <Button on:click={() => push('/workspace')} variant="ghost">
                    Workspace
                </Button>
            {/if}
        </div>
        <!-- Right side of navbar -->
        <div class="flex items-center space-x-4">
            {#if $session.isLoggedIn}
                <span class="text-foreground">{userEmail}</span>
                <Button on:click={handleLogout} variant="ghost">
                    Logout
                </Button>
            {:else}
                <Button on:click={() => push('/register')} variant="ghost">
                    Register
                </Button>
                <Button on:click={() => push('/login')} variant="ghost">
                    Login
                </Button>
            {/if}
            <ThemeToggle />
        </div>
    </div>
</div>

<!-- Display messages -->
{#if $message}
    <div class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded">
        {$message}
    </div>
{/if}

<!-- Modal (optional) -->
<div bind:this={modal} class="modal hidden">
    <div class="modal-content">
        <button bind:this={closeButton} on:click={closeModal} class="close-button">×</button>
        <h2>Welcome!</h2>
        <p>This is a modal that appears after scrolling.</p>
    </div>
</div>

<slot></slot>
