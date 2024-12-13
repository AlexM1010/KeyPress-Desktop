// frontend\src\lib\stores\swiper.ts

import { writable } from 'svelte/store';
import { type CardEffects } from '$lib/stores/stats';

export interface CardData {
    title?: string;
    description?: string;
    image?: string;
    effects?: CardEffects;
    categories?: string[];
}

const initialCards: CardData[] = [
    {
        title: 'Expand Refinery Capacity',
        description: 'Invest £1M to boost production. This reduces bottlenecks and increases long-term profitability.',
        image: '../../cardImages/oilrig.jpg',
        effects: {
            moneyChangeFromCard: -1000000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Production', '+OilRig']
    },
    {
        title: 'Upgrade Emission Filters',
        description: 'Spend £700k to install advanced emission filters, improving environmental performance.',
        image: '../../cardImages/smokestack.jpg',
        effects: {
            moneyChangeFromCard: -700000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Environmental']
    },
    {
        title: 'Trade Carbon Credits',
        description: 'Purchase 2 carbon credits (min) at £300k each to improve your Environmental Impact Score.',
        image: '../../cardImages/green.jpg',
        effects: {
            moneyChangeFromCard: -600000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Environmental']
    },
    {
        title: 'Invest in Hydrogen Tech',
        description: 'Spend £600k in R&D to boost Environmental Impact Score and Patent Portfolio Value.',
        image: '../../cardImages/green.jpg',
        effects: {
            moneyChangeFromCard: -600000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Environmental', '+Patents']
    },
    {
        title: 'Launch New Product Line',
        description: 'Invest £800k to develop and launch a new product line, increasing revenue streams.',
        image: '../../cardImages/science.jpg',
        effects: {
            moneyChangeFromCard: 800000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Production', '+Expansion']
    },
    {
        title: 'Optimize Supply Chain',
        description: 'Allocate £500k to streamline supply chain operations, reducing costs and enhancing profitability.',
        image: '../../cardImages/shipping.jpg',
        effects: {
            moneyChangeFromCard: 500000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Production']
    }
];

export const cards = writable<CardData[]>(initialCards);