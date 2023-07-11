<script lang="ts">
  import { redirect } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  function authHandel() {
    dispatch('authMethod');
  }
  
  export let name: string;

  let loading = false;
</script>

<button on:click={function authFunc(){
  loading = true;
  authHandel();
  }} 
  disabled={loading}
  class="hover:text-blue-400 transition-colors delay-400 ease-out block ml-auto">
  {#if loading}
    Loadding...
  {:else}
    {name}
  {/if}
</button>
