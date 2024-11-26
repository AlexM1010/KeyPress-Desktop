<script lang="ts">
    import "./login.scss";
    import { z } from "zod";
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

<div class="login-container">
    <div class="login-image-wrapper">
        <img
            class="login-image"
            src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5"
            alt="Login background"
        />
    </div>
    <div class="login-form-wrapper glass-effect">
        <h1 class="login-title">Welcome Back!</h1>
        <p class="login-desc">Please log in to continue to your workspace.</p>

        <form on:submit={handleSubmit} class="login-form">
            {#if $message}
                <div class="alert {$message.includes('successful') ? 'alert-success' : 'alert-error'} mb-4">
                    {$message}
                </div>
            {/if}

            <div class="input-block">
                <label for="email" class="input-label">Email address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="input"
                    placeholder="Email"
                    bind:value={$form.email}
                    disabled={$isLoading}
                />
                {#if $errors.email}
                    <div class="error-text">{$errors.email}</div>
                {/if}
            </div>

            <div class="input-block">
                <label for="password" class="input-label">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="input"
                    placeholder="Password"
                    bind:value={$form.password}
                    disabled={$isLoading}
                />
                {#if $errors.password}
                    <div class="error-text">{$errors.password}</div>
                {/if}
            </div>

            <div class="form-actions">
                <a href="/forgot-password" class="forgot-password-link">Forgot your password?</a>
                <button
                    type="submit"
                    class="input-button"
                    disabled={$isLoading}
                >
                    {$isLoading ? 'Logging in...' : 'Login'}
                </button>
            </div>

            <button type="button" class="input-button social-login-button">Sign In With GitHub</button>
        </form>

        <p class="sign-up">
            Don't have an account? <a href="/register" class="sign-up-link">Sign up now</a>
        </p>
    </div>
</div>
