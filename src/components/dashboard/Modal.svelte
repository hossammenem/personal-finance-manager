<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { clickedDate, goalStore, billId } from "$lib/store";

  interface IField {
    type: "text" | "number" | "range" | "radio" | "checkbox";
    placeholder: string;
    name: string;
  }
  export let action: string;

  export let fields: IField[] = []; 
  export let title: string;
  export let description: string | null = null;
  export let modalId : string;
  export let yesNoBtns: boolean = false;
  export let paySavings: boolean = false;


  function initModal(){
    modalWrapper = document.querySelector(`.modalWrapper-${modalId}`);
    modal = document.querySelector(`.modal-${modalId}`);

    if (modalWrapper && modal) {
      modalWrapper.addEventListener("click", ()=> toggleModal(modalId));
      modal.addEventListener("click", preventPropagation);
    }
  };

  let clickedDateVar: string | null = null;

  const unsubscribe = clickedDate.subscribe((value) => {
    clickedDateVar = value;
  });

  onMount(()=> initModal());
  onDestroy(unsubscribe)
</script>

<script lang="ts" context="module">
  let modalWrapper: HTMLElement | null;
  let modalForm: HTMLFormElement | null;
  let modal: HTMLElement | null;

  const preventPropagation = (e: Event) => {
    e.stopPropagation();
  };

  export function toggleModal(modalId: string) {
    modalWrapper = document.querySelector(`.modalWrapper-${modalId}`);
    modalForm = document.querySelector(`.modalForm-${modalId}`);
    modalWrapper && modalWrapper.classList.toggle("toggle-modal");
    modalForm && modalForm.reset()
  };
</script>


<div class={`modalWrapper-${modalId} pointer-events-none fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/40 opacity-0 transition-all duration-200 ease-in-out z-30`}>
  <div class={`modal-${modalId} flex w-[min(100%-4rem,500px)] flex-col gap-4 rounded-md bg-white p-4 shadow-md`}>
    <h2 class="text-3xl font-bold text-center text-gray-600">
      {title}
    </h2>
    {#if description}
      <p class="text-gray-500 text-center">{description}</p>
    {/if}
    <form class={`modalForm-${modalId} flex flex-col gap-2 mt-6`} method="POST" {action}>
      <div class="flex flex-wrap mx-auto justify-center gap-2 w-full">
        {#each fields as field}
          {#if field.type == "number"}
            <input name={field.name} class="bg-gray-300 text-black px-2 py-0.5 rounded-md w-28" type={field.type} placeholder={field.placeholder} min="0" />
          {:else}
            <input name={field.name} class="bg-gray-300 text-black px-2 py-0.5 rounded-md w-[min(100%-2rem,16rem)]" type={field.type} placeholder={field.placeholder} />
          {/if}
        {/each}
        {#if clickedDateVar}
          <input type="hidden" name="dueDate" bind:value={clickedDateVar} />
        {:else if paySavings}
          <input type="hidden" name="goalId" value={Object.keys($goalStore)[0]} />
          <input type="number" name="amount" value={Object.values($goalStore)[0]} min={Object.values($goalStore)[0]} class="bg-gray-300 text-black px-2 py-0.5 rounded-md w-[min(100%-2rem,16rem)]" />
        {/if}
      </div>
      <div class="flex ml-auto gap-3 mt-5">
        {#if yesNoBtns}
          <input type="hidden" name="billId" bind:value={$billId} />
          <button on:click|preventDefault={()=>toggleModal(modalId)} 
            class="rounded-md px-3 py-1 font-semibold transition-colors duration-200 ease-in-out bg-red-600 text-white">no</button>
          <button class="rounded-md px-3 py-1 font-semibold transition-colors duration-200 ease-in-out bg-green-600 text-white">yes</button>
        {:else}
          <button on:click|preventDefault={()=>toggleModal(modalId)} class="rounded-md px-3 py-1 font-semibold transition-colors duration-200 ease-in-out bg-black text-white">
            Cancel
          </button>
          <button class="rounded-md px-3 py-1 font-semibold transition-colors duration-200 ease-in-out bg-blue-600 text-white">
            Submit
          </button>
        {/if}
      </div>
    </form>
  </div>
</div>
