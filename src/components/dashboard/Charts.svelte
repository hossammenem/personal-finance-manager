<script lang="ts">
  import Container from "$components/Container.svelte";
  import StatementChart from "$components/dashboard/StatementChart.svelte";
  import StatementTable from "$components/dashboard/StatementTable.svelte";
  import { onMount } from "svelte";
  import type { IMoneyInMoneyOut } from "$types/types";

  export let income: IMoneyInMoneyOut[];
  export let expenses: IMoneyInMoneyOut[];
  export let totalIncome: number;
  export let totalExpenses: number;

  function toggelIncomeChart(){
    let incomeTable: HTMLElement | null = document.getElementById("incomeTable");
    let expensesTable: HTMLElement | null = document.getElementById("expensesTable");

    if(incomeTable && expensesTable){
      if(expensesTable.classList.contains("active-collapse")) expensesTable.classList.remove("active-collapse");
      incomeTable.classList.toggle("active-collapse")
    }
  }

  function toggelExpensesChart(){
    let incomeTable: HTMLElement | null = document.getElementById("incomeTable");
    let expensesTable: HTMLElement | null = document.getElementById("expensesTable");

    if(incomeTable && expensesTable){
      if(incomeTable.classList.contains("active-collapse")) incomeTable.classList.remove("active-collapse");
      expensesTable.classList.toggle("active-collapse")
    }
  }

  function initCharts(){
    let incomeChart: HTMLElement | null = document.getElementById("incomeChart");
    let expensisChart: HTMLElement | null = document.getElementById("expensesChart");

    incomeChart && incomeChart.addEventListener("click", toggelIncomeChart);
    expensisChart && expensisChart.addEventListener("click", toggelExpensesChart);
  }

  onMount(()=>initCharts());
  
</script>


<Container>
  <div class="grid grid-cols-1 auto-rows-[minmax(auto,max-content)] md:grid-cols-2 gap-3 py-2 w-full">
    <div class="cols-[1/2] row-[1/2] md:row-span-1 rounded-md shadow-md shadow-gray-400 p-2 sm:p-6 cursor-pointer transition-colors hover:bg-gray-100" id="incomeChart">
      <h4 class="mb-4 pl-2 sm:pl-0 font-semibold text-lg">Income</h4>
        <StatementChart data={income} />
    </div>
    <div class="cols-[2/-1] row-[3/4] md:row-span-1 rounded-md shadow-md shadow-gray-400 p-2 sm:p-6 cursor-pointer transition-colors hover:bg-gray-100" id="expensesChart">
      <h4 class="mb-4 pl-2 sm:pl-0 font-semibold text-lg">Expenses</h4>
      <StatementChart data={expenses} />
    </div>
    <StatementTable total={totalIncome} data={income} id="incomeTable" gridLayout="col-[1/-1] row-[2/3] md:row-[2]" />
    <StatementTable total={totalExpenses} data={expenses} id="expensesTable" gridLayout="col-[1/-1] row-[4/5] md:row-[2]" />
  </div>
</Container>
