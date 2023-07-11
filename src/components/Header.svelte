<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client";
  import Container from "$components/Container.svelte";
  import CollapseBtn from "./CollapseBtn.svelte";
  import DropDownMenu from "./DropDownMenu.svelte";
  import AuthBtn from "./AuthBtn.svelte";

  export let authed: boolean;
  export let user: any;
</script>

<div class="flex w-full h-16 p-2 bg-black text-white font-semibold items-center z-20 relative">
  <Container>
  {#if authed}
    <div class="justify-between flex flex-row w-full items-center">
      <p class="font-bold text-md md:text-lg">{user.name}</p>
      <div class="gap-7 sm:flex hidden">
        <a href="/" class="hover:text-blue-400 transition-colors delay-400 ease-out">Home</a>
        <a href="/dashboard" class="hover:text-blue-400 transition-colors delay-400 ease-out">Dashboard</a>
        <AuthBtn name="Logout" on:authMethod={signOut} />
      </div>
      <CollapseBtn />
    </div>
  {:else}
    <AuthBtn name="Login with Google" on:authMethod={()=> signIn('google')} />
  {/if}
  </Container>
</div>
<DropDownMenu />
