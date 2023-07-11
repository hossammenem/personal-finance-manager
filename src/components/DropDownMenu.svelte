<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";
</script>

<div id="dropDownMenu" class="sm:hidden text-white font-semibold absolute -top-28 right-10 w-52 bg-black z-10 rounded-b-md transition-all ease-in-out duration-300 border-t-[1px] border-t-gray-500 p-4"> 
  <div class="flex flex-col gap-4">
    <a href="/" class="hover:text-blue-400 transition-colors delay-400 ease-out w-fit mx-auto">Home</a>
    <a href="/dashboard" class="hover:text-blue-400 transition-colors delay-400 ease-out w-fit mx-auto">Dashboard</a>
    <button on:click={() => signOut()} class="hover:text-blue-400 transition-colors delay-400 ease-out w-fit mx-auto">Log out</button>
  </div>
</div>
