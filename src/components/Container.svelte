<script lang="ts">
  export let styles: string = "";
</script>

<div class={`mx-auto w-[min(100%-4rem,1100px)] ${styles}`}>
 <slot /> 
</div>
