<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import CommonPage from './CommonPage.svelte';
    import Input from './Input/Input.svelte';
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    import { replaceState } from '$app/navigation';

    export let search = '';
    let searchInput: Input;

    const dispatch = createEventDispatcher();

    let mounted = false;

    $: {
        dispatch('search', { search: search.trim().toLowerCase() });
    }

    $: {
        if (browser && mounted) {
            const url = new URL($page.url);
            const trimmedSearch = search.trim();
            
            if (trimmedSearch) {
                url.searchParams.set('q', trimmedSearch);
            } else {
                url.searchParams.delete('q');
            }
            
            replaceState(url, '');
            
            if ($page.url.pathname.startsWith(`${base}/search`)) {
                if (searchInput) {
                    searchInput.focus();
                }
            }
        }
    }

    onMount(() => {
        const queryParam = $page.url.searchParams.get('q');
        search = queryParam ? queryParam.trim() : '';
        mounted = true;
    });
</script>

<CommonPage>
    <div class="w-100% row">
        <Input bind:this={searchInput} bind:value={search} placeholder={'Search...'} />
    </div>
    <div class="w-100% col flex-1">
        <slot />
    </div>
</CommonPage>