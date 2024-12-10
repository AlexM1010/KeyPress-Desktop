// frontend/src/lib/stores/map.ts

import { writable } from 'svelte/store';

export type Location = {
    name: string;
    label: string;
    details: string;
};

const locations: Location[] = [
    { name: 'Seattle', label: 'SEA', details: 'Seattle-Tacoma International Airport' },
    { name: 'Lihue', label: 'LIH', details: 'Lihue Airport' },
    { name: 'Paris', label: 'CDG', details: 'Paris Charles de Gaulle Airport' },
    { name: 'Buenos Aires', label: 'EZE', details: 'Ministro Pistarini International Airport' },
    { name: 'Cape Town', label: 'CPT', details: 'Cape Town International Airport' },
    { name: 'Manila', label: 'MNL', details: 'Ninoy Aquino International Airport' },
];

export const locationStore = writable<Location[]>(locations);