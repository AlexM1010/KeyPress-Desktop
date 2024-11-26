<!-- localhost:5173/ -->
<script lang="ts">
  import '../app.css';
  import { Button } from "$lib/components/ui/button";
  import type { PageData } from "./$types.js";
  //import Register from "./register/Register.svelte"; 

  //export let data: PageData;
</script>

<!--<Register data={data?.form ?? undefined}/>-->

<div class="flex items-center justify-center min-h-screen bg-[--background] text-black dark:text-white">
  <div class="text-center space-y-6">
    <h1 class="text-4xl font-bold ">Welcome to Keypress</h1>
    <p class="text-muted-foreground">Create an account to make your own Keypress projects</p>
    <Button href="/register" class="bg-primary rounded-md px-4 py-2 hover:bg-primary-dark">
      Create An Account
    </Button>
  </div>
</div>