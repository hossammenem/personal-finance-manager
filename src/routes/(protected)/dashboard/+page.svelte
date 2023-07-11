<script lang="ts">
  import Container from "$components/Container.svelte";
  import BillsCalendar from "$components/dashboard/BillsCalendar.svelte";
  import SavingGoalCard from "$components/dashboard/SavingGoalCard.svelte";
  import Charts from "$components/dashboard/Charts.svelte";
  import Modals from "$components/dashboard/Modals.svelte";
  import SectionTitle from "$components/dashboard/SectionTitle.svelte";

  export let data;
  let accountBalance: number;
  $: income = data.income;
  $: expenses = data.expenses;
  let bills = data.bills;
  let savings = data.savings;

  if(data?.session?.user){
    accountBalance = data.session.user.accountBalance;
  }
</script>

<Container>
  <h2 class="font-bold text-xl sm:text-3xl after:content-[''] after:block after:h-0.5 after:mt-3 after:w-3/5 my-16 after:bg-gray-200">Account Balance: {accountBalance} </h2>
</Container>

<SectionTitle>Income And Expenses</SectionTitle>
<Charts {income} {expenses} />

<SectionTitle>Bills Calendar</SectionTitle>
<BillsCalendar {bills} />


<SectionTitle>Saving Goals</SectionTitle>
<SavingGoalCard {savings} />

<Modals />
