<script lang="ts">
  import { actors } from "./stores";
  import { fade } from 'svelte/transition';

  export let name;
  export let rank;
  export let canDelete = false;

  let rankPlusOne = rank;
  let isDeleting = false;
  $: rankPlusOne = rank + 1;

  function handleDelete() {
    isDeleting = true;
    $actors = $actors.filter(x => x.name !== name);
  }

  function handleFinishedTurn() {
    // Add all the actors that aren't this one
    // THEN add this actor at the end
    $actors = [
      ...$actors.filter(x => x.name !== name),
      ...$actors.filter(x => x.name === name)
    ]
  }
</script>

<div class="flex flex-row bg-slate-800 m-1 rounded-xl p-1 pl-4"
     class:bg-slate-800={!isDeleting}
     class:bg-red-800={isDeleting}
     transition:fade={{ duration: 500 }}
>
  <div class="font-bold">{name}</div>
  <div class="ml-2">You are a rank {rankPlusOne} llama.</div>
  <div class="bg-green-500 rounded-full pl-4 pr-4 font-bold text-green-800" on:click={handleFinishedTurn}>Done</div>
  <div class="bg-yellow-500 rounded-full pl-4 pr-4 font-bold text-yellow-800">Top</div>
  {#if canDelete}
  <div class="text-right bg-red-900 rounded-full pl-4 pr-4 font-bold text-red-500" on:click={handleDelete}>Delete</div>
  {/if}
</div>
