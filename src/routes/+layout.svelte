<script lang="ts">
  import "../app.css";
  import Header from "$components/Header.svelte";
  export let data
  let authed = true ? data.session?.user != null : false;
</script>

<Header {authed} user={data.session?.user} />
<slot />
