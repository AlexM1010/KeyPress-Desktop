<script lang="ts">
	import { CardSwiper } from '$lib/CardSwiper';
	// function that returns the data for each card, by default has title, description and image
	let data = (index: number) => {
		return {
			title: 'Card ' + index,
			description: 'Description ' + index,
		};
	};
    //let swipe: (direction?: 'left' | 'right') => void;
    //<button on:click={() => swipe('left')}>No</button>
	//<button on:click={() => swipe('right')}>Yes</button>
</script>

<div class="h-3/5 w-3/5">
	<CardSwiper cardData={data} anchor={6000}/>
</div>