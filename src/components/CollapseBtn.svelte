<script lang="ts">
    import { onMount } from "svelte";

  function toggleMenu(e: Event){
    const menu = document.getElementById("dropDownMenu");
    if(menu && menu.classList.contains("-top-28")){
      menu.classList.remove("-top-28");
      menu.classList.add("top-16");
    } else {
      menu?.classList.remove("top-16");
      menu?.classList.add("-top-28");
    } 
  }

  function initDropDown(){
    const menu = document.getElementById("dropDownMenu");
    const btn = document.getElementById("dropDownBtn");
    btn && btn.addEventListener('click', toggleMenu);
    menu && menu.addEventListener('click', toggleMenu);
  }
  onMount(()=> initDropDown());
</script>

<button id="dropDownBtn" class="inline-flex sm:hidden items-center p-2 text-sm font-medium text-center rounded-lg focus:outline-none text-white focus:ring-gray-50 bg-gray-900 hover:bg-gray-700" on:click={toggleMenu}> 
  <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
</button>
