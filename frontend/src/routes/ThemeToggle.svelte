<!-- src/routes/ThemeToggle.svelte -->
<script lang="ts">
    import Sun from 'lucide-svelte/icons/sun';
    import Moon from 'lucide-svelte/icons/moon';
    import { setMode } from "mode-watcher";
    import { Button } from '$lib/components/ui/button';
    import { theme } from '$lib/stores/theme';

    let spin = false;

    function toggleColorScheme() {
        setMode($theme ? 'light' : 'dark');
        triggerSpin(300);
    }

    function triggerSpin(duration: number) {
        spin = true;
        setTimeout(() => (spin = false), duration);
    }
</script>

<style>
    .spin {
        animation: spin 0.3s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<Button on:click={toggleColorScheme} variant="ghost" size="icon">
    <div class:spin={spin} class="relative flex items-center justify-center">
        <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="color: stroke-white absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
    </div>
</Button>