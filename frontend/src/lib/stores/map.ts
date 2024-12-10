// frontend/src/lib/stores/map.ts

import { writable } from 'svelte/store';

export type Location = {
    name: string;
    label: string;
    details: string;
};

const locations: Location[] = [
    {
        name: 'Seria, Brunei',
        label: 'Crude & Co.',
        details: `Founded: 1973 | Net Worth: BND 9.8B`
    },
    {
        name: 'Muscat, Oman',
        label: 'Deep Drill Dynamics',
        details: `Founded: 1981 | Net Worth: OMR 7.5B`
    },
    {
        name: 'Aberdeen, Scotland',
        label: 'Petro Pioneers',
        details: `Founded: 1901 | Net Worth: £12.2B`
    },
    {
        name: 'Baku, Azerbaijan',
        label: 'Pipeline Pros',
        details: `Founded: 1995 | Net Worth: AZN 8.1B`
    }
];

export const locationStore = writable<Location[]>(locations);