<script lang="ts">
  import type { IMoneyInMoneyOut } from "$types/types";
  import { goto } from '$app/navigation';
  import { toggleModal } from "./Modal.svelte";
  import { page } from "$app/stores";

  export let id: string;
  export let gridLayout: string;
  export let data: IMoneyInMoneyOut[];
  let isIncome: boolean = id.includes("income");

  let clicked = ((Number($page.url.searchParams.get("take")) || 0) / 7)-1;
  if (clicked < 0) clicked = 0;
  let take = 7;
  let skip = 7;

  async function paginate(action: string){
    if(action == "next"){
      clicked+=1;
    } else {
      clicked-=1;
    }
    const url = `/dashboard?take=${take*(clicked+1)}&skip=${skip*clicked}`;
    await goto(url);
    location.reload();
  }


  const formattedDate = (dateObj: string) => {
    const regex = dateObj.match(/[a-zA-Z]/);
    if(regex != undefined){
      const [year, month, day ] = dateObj.substring(0, dateObj.indexOf(regex.pop() as string)).split("-");
      return `${year}-${month}-${day}`;
    }
  }
</script>

<div class={`${gridLayout} w-full max-h-0 overflow-hidden p-0 shadow-md shadow-gray-400 rounded-md space-y-8 transition-all ease-in-out`} {id}>
  <div class="flex flex-col gap-y-2 sm:flex-row mt-3">
    {#if isIncome}
    <button on:click={()=> toggleModal("incomeModal")} class="flex items-center justify-center w-52 px-3 h-8 mr-3 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
        + Add  New Income Entry
    </button>
    {:else}
    <button on:click={()=> toggleModal("expensesModal")} 
        class="flex items-center justify-center w-52 px-3 h-8 mr-3 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"> 
        + Add New Expense Entry
    </button>
    {/if}
    <div class="flex w-fit ml-auto">
      <button on:click={()=> paginate("preivous")}
        class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
        <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        Previous
      </button>
      <button on:click={()=> paginate("next")}
        class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
        Next
        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </button>
    </div>
  </div>

  <div class="w-full mx-auto overflow-x-auto shadow-md sm:rounded-lg">
    <table class=" w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">
            Title
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">
              Date
            </div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">
              Amount
            </div>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        {#each data as obj}
        <tr class="bg-white border-b">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {obj.source}
            </th>
            <td class="px-6 py-4">
              {formattedDate(obj.date)}
            </td>
            <td class="px-6 py-4">
              {obj.amount}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
