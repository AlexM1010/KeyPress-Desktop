<script lang="ts">
    import { CardSwiper } from '$lib/CardSwiper';

    let data = (index: number) => {
        return {
            title: 'Card ' + index,
            description: 'Description ' + index,
            image: `https://picsum.photos/600/800?random=${index}`
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