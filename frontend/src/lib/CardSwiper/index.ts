/**
 * change this to your own data structure, that each card will use
 * then change the Card.svelte file to use your data structure
 */

import type { CardData } from '$lib/stores/swiper';

export type SwipeEventData = {
	direction: Direction;
	data: CardData;
	index: number;
	element: HTMLElement;
};

export type Direction = 'left' | 'right';

export { default as CardSwiper } from './CardSwiper.svelte';
