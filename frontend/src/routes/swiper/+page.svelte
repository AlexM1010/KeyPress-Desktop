<script lang="ts">
    import { CardSwiper } from '$lib/CardSwiper';
    import { cards, type Card } from '$lib/stores/swiper';
    import { get } from 'svelte/store';

    const data = (index: number): Card => {
        const currentCards = get(cards);
        return currentCards[index] || {
            title: 'Default Title',
            description: 'Default Description',
            image: 'https://loremflickr.com/600/800/Default'
        };
    };
</script>

<div class="h-screen w-screen overflow-hidden flex items-center justify-center">
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
</style>