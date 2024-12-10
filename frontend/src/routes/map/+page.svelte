<script lang="ts">
  import { MapLibre, Marker, Popup } from 'svelte-maplibre';
  import { writable } from 'svelte/store';
  import { locationStore } from '$lib/stores/map';

  let clickedName = writable('');

  let markers: { lngLat: [number, number]; label: string; name: string }[] = [];

  // Function to fetch geocoding data from Nominatim
  async function fetchCoordinates(location: string) {
      const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              location
          )}&format=json&addressdetails=1&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
          const { lat, lon } = data[0];
          return [parseFloat(lon), parseFloat(lat)] as [number, number];
      }
      throw new Error(`Could not find coordinates for location: ${location}`);
  }

  // Function to populate markers array
  async function loadMarkers() {
      for (const location of $locationStore) {
          try {
              const lngLat = await fetchCoordinates(location.name);
              markers = [
                  ...markers,
                  { lngLat, label: location.label, name: location.details },
              ];
          } catch (err) {
              console.error(err);
          }
      }
  }

  $: loadMarkers();
</script>

<MapLibre 
  center={[50, 20]}
  zoom={2}
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

<p>
  {#if $clickedName}
      You clicked {$clickedName}
  {:else}
      Click a marker to see the airport's name.
  {/if}
</p>

<style>
  :global(.map) {
      height: 100vh;
  }

  :global(.marker) {
      background-color: #ff0000;
      border-radius: 50%;
      cursor: pointer;
      padding: 0.5rem;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
  }
</style>