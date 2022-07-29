<script lang="ts">
  import {flip} from 'svelte/animate';

  import Player from '../Player.svelte';
  import InitiativeList from '../InitiativeList.svelte'
  import NameInput from "../NameInput.svelte";
  import {actors} from "../stores.js";

  let hovering = false;
  const drop = (event, target) => {
    event.dataTransfer.dropEffect = 'move';
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTrackList = $actors;

    if (start < target) {
      newTrackList.splice(target + 1, 0, newTrackList[start]);
      newTrackList.splice(start, 1);
    } else {
      newTrackList.splice(target, 0, newTrackList[start]);
      newTrackList.splice(start + 1, 1);
    }
    $actors = newTrackList;
    hovering = null;
  }
  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    const start = i;
    event.dataTransfer.setData('text/plain', start);
  }
</script>

<h1 class="text-3xl font-bold">
  Combat Tracker
</h1>

<NameInput />
<InitiativeList>
  {#each $actors.filter(x => x.visible === true) as n, index (n.name)}
    <div
            animate:flip
            draggable={true}
            on:dragstart={event => dragstart(event, index)}
            on:drop|preventDefault={event => drop(event, index)}
            ondragover="return false"
            on:dragenter={() => hovering = index}
            class:is-active={hovering === index}
    >
      <Player name={n.name} rank={index} canDelete={n.canBeDeleted} slot={index} />
    </div>

  {/each}
</InitiativeList>
