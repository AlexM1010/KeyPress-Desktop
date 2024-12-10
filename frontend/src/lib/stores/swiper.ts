import { writable } from 'svelte/store';

export interface Card {
    title: string;
    description: string;
    image: string;
    stats: { name: string; effect: number }[];
}

const initialCards: Card[] = [
    {
        title: 'Expand Refinery Capacity',
        description: 'Invest £1M to boost production. This reduces bottlenecks and increases long-term profitability.',
        image: 'https://loremflickr.com/600/800/factory',
        stats: [
            { name: 'Money', effect: -1000000 },
            { name: 'Supply Chain Efficiency', effect: +10 }
        ]
    },
    {
        title: 'Upgrade Emission Filters',
        description: 'Spend £700k to install advanced emission filters, improving environmental performance.',
        image: 'https://loremflickr.com/600/800/smokestack',
        stats: [
            { name: 'Money', effect: -700000 },
            { name: 'Environmental Impact Score', effect: +10 }
        ]
    },
    {
        title: 'Trade Carbon Credits',
        description: 'Purchase 2 carbon credits (min) at £300k each to improve your Environmental Impact Score.',
        image: 'https://loremflickr.com/600/800/forest',
        stats: [
            { name: 'Money', effect: -600000 },
            { name: 'Environmental Impact Score', effect: +20 }
        ]
    },
    {
        title: 'Invest in Hydrogen Tech',
        description: 'Spend £600k in R&D to boost Environmental Impact Score and Patent Portfolio Value.',
        image: 'https://loremflickr.com/600/800/windmill',
        stats: [
            { name: 'Money', effect: -600000 },
            { name: 'Environmental Impact Score', effect: +15 },
            { name: 'Patent Portfolio Value', effect: +10 }
        ]
    }
];

export const cards = writable<Card[]>(initialCards);
