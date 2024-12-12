// frontend\src\lib\stores\swiper.ts

import { writable } from 'svelte/store';
import { type CardEffects } from '$lib/stores/stats';

export interface CardData {
    title?: string;
    description?: string;
    image?: string;
    effects?: CardEffects;
}

const initialCards: CardData[] = [
    {
        title: 'Expand Refinery Capacity',
        description: 'Invest £1M to boost production. This reduces bottlenecks and increases long-term profitability.',
        image: 'https://loremflickr.com/600/800/factory',
        effects: {
            moneyChangeFromCard: -1000000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Upgrade Emission Filters',
        description: 'Spend £700k to install advanced emission filters, improving environmental performance.',
        image: 'https://loremflickr.com/600/800/smokestack',
        effects: {
            moneyChangeFromCard: -700000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Trade Carbon Credits',
        description: 'Purchase 2 carbon credits (min) at £300k each to improve your Environmental Impact Score.',
        image: 'https://loremflickr.com/600/800/forest',
        effects: {
            moneyChangeFromCard: -600000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Invest in Hydrogen Tech',
        description: 'Spend £600k in R&D to boost Environmental Impact Score and Patent Portfolio Value.',
        image: 'https://loremflickr.com/600/800/windmill',
        effects: {
            moneyChangeFromCard: -600000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Launch New Product Line',
        description: 'Invest £800k to develop and launch a new product line, increasing revenue streams.',
        image: 'https://loremflickr.com/600/800/product',
        effects: {
            moneyChangeFromCard: 800000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Optimize Supply Chain',
        description: 'Allocate £500k to streamline supply chain operations, reducing costs and enhancing profitability.',
        image: 'https://loremflickr.com/600/800/supplychain',
        effects: {
            moneyChangeFromCard: 500000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Expand Market Reach',
        description: 'Invest £900k in marketing and sales to enter new markets and boost sales.',
        image: 'https://loremflickr.com/600/800/marketing',
        effects: {
            moneyChangeFromCard: 900000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Enhance Customer Support',
        description: 'Spend £400k to improve customer support services, increasing customer satisfaction and retention.',
        image: 'https://loremflickr.com/600/800/customersupport',
        effects: {
            moneyChangeFromCard: 400000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    }
];

export const cards = writable<CardData[]>(initialCards);