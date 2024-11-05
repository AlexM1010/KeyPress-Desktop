<script lang="ts">
    export let label: string;
    export let defaultValue: number = 50;
    export let value: number = defaultValue; // Add this line
  </script>
  
  <div class="space-y-1.5">
    <div class="flex justify-between">
      <label for="slider-input" class="text-xs font-medium text-gray-500">{label}</label>
      <span class="text-xs text-gray-400">{value}%</span>
    </div>
    <input 
      id="slider-input"
      type="range" 
      bind:value  
      class="w-full h-2 bg-gray-100 rounded-lg accent-blue-500 cursor-pointer"
    />
  </div>
  