<script lang="ts">
  import Container from '$components/Container.svelte';
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';

  let ready = false;
  onMount(() => ready = true);

  function fadeIn(node: HTMLElement) {
    return {
      delay: 0,
      duration: 600,
      easing: cubicOut,
      css: (t: number, u:number) => `opacity: ${t}; transform: translateY(${u*2}rem);`
    };
  }

  import test from "$lib/images/landingpage.svg"
</script>

{#if ready}
<Container styles="overflow-hidden">
<div class="grid grid-cols-9 grid-rows-2 mt-32 mb-4 p-2 gap-4" transition:fadeIn>
  <div class="sm:col-[1/6] col-[1/-1] row-span-4">
    <img src={test} alt="Finance Img" />
  </div>
  <div class="text-3xl sm:text-4xl md:text-6xl sm:col-[2/-1] font-bold col-[1/-1] row-span-2">
    Sign in and start tracking your Financials Now.
  </div>
</div>
</Container>
{/if}
