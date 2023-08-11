<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from '$app/navigation';

  export let total: number;
  export let type: "expenses" | "income";

  let currPage = Number($page.url.searchParams.get(`${type}page`)) || 1;
  let totalPages = Math.ceil(total / 7);

  function paginate(action: "next" | "previous") {
    if(action == "next" && currPage != totalPages){
      currPage++;
    } else if (action == "previous" && currPage != 1) {
      currPage--;
    }
    const searchParams = new URLSearchParams($page.url.searchParams);
    searchParams.set(`${type}page`, currPage.toString());
    const url = "".concat($page.url.pathname, "?", searchParams.toString());
    goto(url);
  }
</script>

{#if currPage > 1}
  <button on:click={()=> paginate("previous")}
    class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
    <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
    </svg>
    Previous
  </button>
{/if}

{#if currPage < totalPages}
  <button on:click={()=> paginate("next")}
    class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
    Next
    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </button>
{/if}
