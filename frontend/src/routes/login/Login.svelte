<!-- src/routes/login/Login.svelte -->
<script lang="ts">
    import "./login.scss";
    import { z } from "zod";
    import { CircleX } from "lucide-svelte";
    import { onMount } from "svelte";
    import { writable, get } from "svelte/store";
    import { auth, isAuthenticated } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    
    // Form Schema
    const formSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" })
    });

    type FormData = z.infer<typeof formSchema>;
    type ErrorsData = Partial<Record<keyof FormData, string>>;

    // Form state
    const form = writable<FormData>({ email: '', password: '' });
    const errors = writable<ErrorsData>({});
    const message = writable<string>('');
    const isLoading = writable<boolean>(false);

    // Redirect if already authenticated
    $: if ($isAuthenticated) {
        goto('/workspace');
    }

    // Modal elements
    let modal: HTMLElement;
    let modalButton: HTMLElement;
    let closeButton: HTMLElement;
    let scrollDown: HTMLElement;
    let isOpened = false;

    // Modal control functions
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

    onMount(() => {
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("keydown", handleKeydown);
        openModal(); // Open modal immediately for desktop app

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("keydown", handleKeydown);
        };
    });

    // Form submission handler
    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const currentForm = get(form);
        
        // Validate form
        const result = formSchema.safeParse(currentForm);
        if (!result.success) {
            const formattedErrors: ErrorsData = {};
            result.error.errors.forEach(err => {
                const field = err.path[0] as keyof FormData;
                formattedErrors[field] = err.message;
            });
            errors.set(formattedErrors);
            return;
        }

        isLoading.set(true);
        message.set('');

        try {
            await auth.signIn(currentForm.email, currentForm.password);
            message.set('Login successful');
            closeModal();
            await goto('/workspace');
        } catch (error) {
            console.error('Login error:', error);
            message.set(error instanceof Error ? error.message : 'An error occurred during login');
            errors.set({});
        } finally {
            isLoading.set(false);
        }
    };
</script>

<div class="modal" bind:this={modal}>
    <div class="modal-container">
        <div class="modal-left">
            <h1 class="modal-title">Welcome Back!</h1>
            <p class="modal-desc">
                Please log in to continue to your workspace.
            </p>

            <form on:submit={handleSubmit}>
                {#if $message}
                    <div class="alert {$message.includes('successful') ? 'alert-success' : 'alert-error'} mb-4">
                        {$message}
                    </div>
                {/if}

                <div class="input-block">
                    <label class="input-label" for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        class="input"
                        placeholder="Email"
                        bind:value={$form.email}
                        disabled={$isLoading}
                    />
                    {#if $errors.email}
                        <div class="text-red-500 text-sm mt-1">{$errors.email}</div>
                    {/if}
                </div>

                <div class="input-block">
                    <label class="input-label" for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        class="input"
                        placeholder="Password"
                        bind:value={$form.password}
                        disabled={$isLoading}
                    />
                    {#if $errors.password}
                        <div class="text-red-500 text-sm mt-1">{$errors.password}</div>
                    {/if}
                </div>

                <div class="modal-buttons">
                    <a href="/forgot-password">Forgot your password?</a>
                    <button
                        type="submit"
                        class="input-button"
                        disabled={$isLoading}
                    >
                        {$isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
                <button class="input-button">Sign In With GitHub</button>
            </form>

            <p class="sign-up">
                Don't have an account? <a href="/register">Sign up now</a>
            </p>
        </div>

        <div class="modal-right">
            <img
                src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5"
                alt="Login background"
            />
        </div>

        <button
            class="icon-button close-button"
            aria-label="Close"
            on:click={closeModal}
            bind:this={closeButton}
        >
            <CircleX strokeWidth="1.5" size="32" />
        </button>
    </div>
    <button class="modal-button" on:click={openModal} bind:this={modalButton}>
        Click here to login
    </button>
</div>