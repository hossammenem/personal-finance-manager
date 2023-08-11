<script lang="ts">
  import type { IMoneyInMoneyOut } from "$types/types";
  import { toggleModal } from "./Modal.svelte";
  import PaginationBtns from "./PaginationBtns.svelte";

  export let id: string;
  export let gridLayout: string;
  export let data: IMoneyInMoneyOut[];
  export let total: number;
  let isIncome: boolean = id.includes("income");

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
        + Add New Expenses Entry
    </button>
    {/if}

    <div class="flex w-fit ml-auto">
      {#if isIncome}
        <PaginationBtns type="income" total={total} />
      {:else}
        <PaginationBtns type="expenses" total={total} />
      {/if}
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
