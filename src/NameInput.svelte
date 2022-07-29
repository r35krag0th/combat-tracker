<script lang="ts">
    import { actorInput } from "./stores";
    import {actorInputDeleteFlag, actors} from "./stores.js";
    import {ActorDetails} from "./ActorDetails.js";

    function handleAddName(event) {
        event.preventDefault();

        console.log("Handling submit");
        console.log("Matching Actors", $actors.filter(e => e.name === $actorInput));
        console.log("Non-Matching Actors", $actors.filter(e => e.name !== $actorInput));

        if ($actors.filter(e => e.name === $actorInput).length > 0) {
            console.log(`SKIP: ${$actorInput} already exists`);
            return;
        }

        const newActor = new ActorDetails($actorInput, true, $actorInputDeleteFlag);
        // You have to do it this way in order to trigger reactive updates
        $actors = [...$actors, newActor];
        console.log(`ADDED: ${$actorInput}`, newActor);

        $actorInput = "";
    }
</script>

<div>
    <form on:submit={handleAddName} >
        <input bind:value={$actorInput}/>
        <label for="deleteFlag">Deletable?</label>
        <input type="checkbox" id="deleteFlag" bind:checked={$actorInputDeleteFlag}/>
    </form>

</div>