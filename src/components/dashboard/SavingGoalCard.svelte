<script lang="ts">
 import Container from "$components/Container.svelte";
 import type { ISavings } from "$types/types";
 import { toggleModal } from "./Modal.svelte";
 import { goalStore } from "$lib/store";

 export let savings: ISavings[];

 const calcRemaining = (minPerMonth: number, progress: number, goal: number)=> {
   const remainingInNumbers = goal - progress;
   const remainingInMonths = Math.floor((remainingInNumbers)/minPerMonth);
   return `${remainingInNumbers}$ Reamining / ${remainingInMonths} Months`;
 }
 
  function handlePayBillsClick(goalName: string, minPerMonth: number) {
   let goalId: string | null;
   savings.map(({ name, id })=> {
     if(name == goalName) goalId = id;
   });
   $goalStore[goalId] = minPerMonth;
   toggleModal("paySavingsModal");
  }
</script>

<Container>
  {#each savings as goal}
    <button on:click={()=> handlePayBillsClick(goal.name, goal.monthlyMinimum)} 
      class="w-full max-w-[850px] mx-auto p-4 shadow-gray-400 shadow-md  flex flex-col items-center rounded-xl gap-2 transition-colors hover:bg-gray-100 cursor-pointer">
      <h3 class="font-semibold text-2xl text-gray-700">{goal.name}</h3>
      <span class="text-gray-500 text-xs font-medium">Monthly minimum: {goal.monthlyMinimum}$</span>
      <div class="space-x-1">
        <span class="text-xs sm:text-base">{goal.progress}$</span>
        <progress class="w-16 sm:w-72 md:w-[400px] h-3 rounded-md bg-white border-[1px] border-gra-400" max={goal.goal} value={goal.progress} />
        <span class="text-xs sm:text-base">{goal.goal}$</span>
      </div>
      <span class="text-gray-500 text-sm font-medium">{calcRemaining(goal.monthlyMinimum, goal.progress, goal.goal)}</span>
    </button>
  {/each}

  <button on:click={()=> toggleModal("savingsModal")} 
    class="block w-full my-16 max-w-[850px] mx-auto border-dashed border-[1px] border-gray-400 rounded-xl text-center py-3 hover:bg-gray-100 transition-colors cursor-pointer">
    <p class="font-semibold text-xl sm:text-3xl text-gray-500">+ Add a new saving goal</p>
  </button>
</Container>

