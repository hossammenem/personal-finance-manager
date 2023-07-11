<script lang="ts">
  import Container from "$components/Container.svelte";
  import type { IBills } from "$types/types";
  import { toggleModal } from "./Modal.svelte";
  import { clickedDate, billId } from "$lib/store";

  export let bills: IBills[];

  let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'The', 'Fri', 'Sat']
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  let date = new Date();

  let currMonth = date.getMonth();
  let currYear = date.getFullYear();
  $: firstDay = new Date(currYear, currMonth, 1).getDay();


  const billsMap: any = {};

  const trimZero = (arg: string) => arg.replace(/^0/, "");

  bills.map(({ dueDate, name, paied })=> {
    let [_, month, day, year] = new Date(dueDate).toString().split(" ");

    month = new Date(`${month}, 2, 2048`).getMonth()+1 as unknown as string;
    day = trimZero(day);

    if(!billsMap[year]) billsMap[year] = {};
    if(!billsMap[year][month]) billsMap[year][month] = {};
    if(!billsMap[year][month][day]) billsMap[year][month][day] = {};
    if(!billsMap[year][month][day][name]) billsMap[year][month][day][name] = paied;
  }
  );

  const paied = (day: number): boolean => {
    return Object.values(billsMap[currYear][currMonth+1][day])[0] as boolean;
  }

  function lenOfMonth(month: number): number {
    const year = date.getFullYear();
    const isLeap : boolean = (year % 4 == 0) && (year % 100 != 0) ? true : (year % 400 == 0) ? true : false;

    if(month == 1) return (isLeap ? 29 : 28);
    if(month == 7) return 31;
    if(month % 2 == 0) return 31;
    return 30;
  }

  function monthToggle(action: string){
    switch (action){ 
      case "prev":
        if(currMonth == 0){
          currYear -= 1;
          currMonth = 11;
        } else {
          currMonth -= 1;
        }
        break;
      case "next":
        if(currMonth == 11){
          currYear += 1;
          currMonth = 0;
        } else {
          currMonth += 1;
        }
        break;
      case "curr":
        currMonth = date.getMonth();
        currYear = date.getFullYear();
        break;
      default:
        return;
    }
  }


  function handleDateClick(modalId: string, date: string) {
    clickedDate.set(date);
    toggleModal(modalId);
  }

  function handleBillPay(modalId: string, billName: string){
    let bid: string | null = null;
    bills.map(({ name, id })=> {
      if(name == billName)
      bid = id;
    });
    $billId = bid;
    toggleModal(modalId);
  }

</script>

<Container>
  <div class="flex flex-col sm:flex-row justify-between">
    <div class="font-semibold">
      {months[currMonth]} {currYear}
    </div>
    <div class="flex flex-row ml-auto">
      <button on:click={()=> monthToggle("prev")} class="hover:bg-gray-300 rounded-md transition-colors w-7 flex justify-center items-center gap-1">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      </button>
      <button on:click={()=> monthToggle("curr")} class="font-medium hover:bg-gray-300 py-1 px-2 rounded-md transition-colors">current month</button>
      <button on:click={()=> monthToggle("next")} class="hover:bg-gray-300 rounded-md transition-colors w-7 flex justify-center items-center">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
  </div>
  <div class="overflow-x-auto">
    <div class="w-[max(100%,700px)] grid grid-cols-7 justify-items-center my-3">
      {#each weekDays as day}
        <div class="col-span-1 row-span-1">
          <h1 class="">{day}</h1>
        </div>
      {/each}
    </div>
    <div class="w-[max(100%,700px)] p-1 mx-auto grid grid-cols-7 grid-rows-5 gap-2 mb-3">
      {#each {length: firstDay} as _, i}
        <div class="col-span-1 row-span-1 w-full h-32 bg-gray-300 rounded-md shadow-gray-400 shadow-sm p-3">{(lenOfMonth(currMonth-1)-firstDay)+i+1}</div>
      {/each}
      {#each {length: lenOfMonth(currMonth)} as _, i}
        {#if billsMap[currYear] && billsMap[currYear][currMonth+1] && billsMap[currYear][currMonth+1][i+1]}
          {#if paied(i+1)}
            <button
              on:click={()=> handleBillPay("payBillsModal", Object.keys(billsMap[currYear][currMonth+1][i+1])[0])}
              disabled={true}
              class="flex bg-green-500 flex-col justify-start items-start col-span-1 row-span-1 w-full h-32 rounded-md shadow-gray-400 shadow-sm transition-colors duration-300 p-3">
              <p>{i+1}<p>
              <p>{Object.keys(billsMap[currYear][currMonth+1][i+1])[0]}</p>
            </button>
          {:else}
            <button
              on:click={()=> handleBillPay("payBillsModal", Object.keys(billsMap[currYear][currMonth+1][i+1])[0])}
              class="flex flex-col bg-gray-400 justify-start items-start col-span-1 row-span-1 w-full h-32 rounded-md shadow-gray-400 shadow-sm transition-colors duration-300 hover:bg-gray-300 cursor-pointer p-3">
              <p>{i+1}<p>
              <p>{Object.keys(billsMap[currYear][currMonth+1][i+1])[0]}</p>
            </button>
          {/if}
        {:else}
          <button
            on:click={()=> handleDateClick("billsModal", `${currYear}-${currMonth+1}-${i+1}`)}
            class="flex justify-start items-start col-span-1 row-span-1 w-full h-32 rounded-md shadow-gray-400 shadow-sm transition-colors duration-300 hover:bg-gray-200 cursor-pointer p-3">
            {i+1}
          </button>
        {/if}
      {/each}
    </div>
  </div>
</Container>
