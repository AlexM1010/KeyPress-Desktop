<script lang="ts">
    import { CardSwiper } from '$lib/CardSwiper';
    import { cards, type Card } from '$lib/stores/swiper';
    import { get } from 'svelte/store';
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';

    const data = (index: number): Card => {
        const currentCards = get(cards);
        return currentCards[index] || {
            title: 'Default Title',
            description: 'Default Description',
            image: 'https://loremflickr.com/600/800/Default'
        };
    };

    let leftGlowOpacity = 0.2;
    let rightGlowOpacity = 0.2;
    let showNo = false;
    let showYes = false;

    const handleMouseMove = (event: MouseEvent) => {
        const { clientX } = event;
        const width = window.innerWidth;
        const threshold = width / 2;

        // Left glow
        if (clientX < threshold) {
            leftGlowOpacity = 0.3 + (1 - clientX / threshold) * 0.8;
            showNo = clientX < threshold * 0.5;
        } else {
            leftGlowOpacity = 0.3;
            showNo = false;
        }

        // Right glow
        if (clientX > width - threshold) {
            rightGlowOpacity = 0.3 + ((clientX - (width - threshold)) / threshold) * 0.8;
            showYes = clientX > width - threshold * 0.5;
        } else {
            rightGlowOpacity = 0.3;
            showYes = false;
        }
    };

    onMount(() => {
        window.addEventListener('mousemove', handleMouseMove);
    });

    onDestroy(() => {
        window.removeEventListener('mousemove', handleMouseMove);
    });
</script>

<div class="background"></div>

<div class="content h-screen w-screen overflow-hidden flex items-center justify-center relative z-10">
    <div class="glow left" style="opacity: {leftGlowOpacity}"></div>
    <div class="glow right" style="opacity: {rightGlowOpacity}"></div>

    {#if showNo}
        <div class="edge-text left-text" transition:fade> No </div>
    {/if}
    {#if showYes}
        <div class="edge-text right-text" transition:fade> Yes </div>
    {/if}

    <div class="w-full max-w-sm mx-auto px-4">
        <div class="aspect-[2/3] relative">
            <CardSwiper cardData={data} anchor={10000}/>
        </div>
    </div>
</div>

<style>
    :global(.card-swiper) {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('/card-bg.png');
        background-size: cover;
        background-position: center;
        filter: blur(8px);
        z-index: 0;
    }

    .content {
        position: relative;
        z-index: 1;
    }

    .glow {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100px;
        pointer-events: none;
        transition: opacity 0.3s;
    }

    .left {
        left: 0;
        background: linear-gradient(to right, rgba(255,0,0,0.5), transparent);
    }

    .right {
        right: 0;
        background: linear-gradient(to left, rgba(0,255,0,0.5), transparent);
    }

    .edge-text {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
        font-weight: bold;
        color: white;
        pointer-events: none;
    }

    .left-text {
        left: 20px;
    }

    .right-text {
        right: 20px;
    }
</style>