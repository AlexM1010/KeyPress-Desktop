<!-- src/routes/login/+page.svelte -->
<script lang="ts">
    import Login from "./Login.svelte";
    import { onMount } from "svelte";
    import { authStore } from "$lib/stores/authStore";
    import { goto } from "$app/navigation";

    onMount(async () => {
        // Check if user is already authenticated
        await authStore.init();
        if (authStore.subscribe(state => state.isAuthenticated)) {
            goto('/workspace');
        }
    });
</script>

<Login />