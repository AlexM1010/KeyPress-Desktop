<script lang="ts">
    import { CardSwiper } from '$lib/CardSwiper';

    interface Card {
        title: string;
        description: string;
        image: string;
    }

    const customCards: Card[] = [
        { 
            title: 'Dog', 
            description: 'This is the first card.', 
            image: 'https://loremflickr.com/600/800/Dog'
        },
        { 
            title: 'Cat', 
            description: 'This is the second card.', 
            image: 'https://loremflickr.com/600/800/Cat'
        },
        { 
            title: 'Tree', 
            description: 'This is the third card.', 
            image: 'https://loremflickr.com/600/800/Tree'
        },
		{ 
            title: 'Oil', 
            description: 'This is the third card.', 
            image: 'https://loremflickr.com/600/800/Evil'
        },
        // Add more custom cards as needed
    ];

    const data = (index: number): Card => {
        return customCards[index] || {
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