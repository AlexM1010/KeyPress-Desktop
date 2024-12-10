<script lang="ts">
    import { MapLibre, Marker, Popup } from 'svelte-maplibre';
    import { writable } from 'svelte/store';

    let clickedName = writable('');

    interface MarkerData {
        lngLat: [number, number];
        label: string;
        name: string;
    }

    const markers: MarkerData[] = [
        { lngLat: [-122.2993, 47.4464], label: 'SEA', name: 'Seattle' },
        { lngLat: [-159.3438, 21.9788], label: 'LIH', name: 'Lihue' },
        { lngLat: [2.5479, 49.0097], label: 'CDG', name: 'Paris Charles de Gaulle' },
        { lngLat: [-58.5348, -34.82], label: 'EZE', name: 'Ministro Pistarini' },
        { lngLat: [18.6021, -33.9715], label: 'CPT', name: 'Cape Town' },
        { lngLat: [121.0165, 14.5123], label: 'MNL', name: 'Ninoy Aquino' },
    ];
</script>

<p>
    {#if $clickedName}
        You clicked {$clickedName}
    {:else}
        Click a marker to see the airport's name.
    {/if}
</p>

<MapLibre 
    center={[50, 20]}
    zoom={7}
    class="map"
    standardControls
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json">
    
    {#each markers as { lngLat, label, name }}
        <Marker {lngLat} on:click={() => clickedName.set(name)} class="marker">
            <span>{label}</span>
            <Popup openOn="hover" offset={[0, -10]}>
                <div>{name}</div>
            </Popup>
        </Marker>
    {/each}
</MapLibre>

<style>
    :global(.map) {
        height: 100vh;
    }
    :global(.marker) {
        background-color: #ff0000;
        border-radius: 50%;
        cursor: pointer;
        padding: 0.5rem;
    }
</style>