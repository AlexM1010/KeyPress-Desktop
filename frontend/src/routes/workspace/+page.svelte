<script lang="ts">
  import { SvelteFlowProvider } from '@xyflow/svelte';
  import Flow from './Flow.svelte';

  export let data; // Receive session and user data
</script>

<SvelteFlowProvider>
  <Flow data={data}/> <!--{data} --> 
</SvelteFlowProvider>
