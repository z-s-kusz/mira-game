<script lang="ts">
    import { getActiveRoom, getRooms } from '../GameState.svelte';

    let open = $state(false);
    let showRoomOptions = $state(false);

    const report = (type: string, roomId?: string) => {
        if (!roomId) roomId = getActiveRoom().id;

        // if room with id = roomId has an active anomaly of reported type
            // show fixing screen
            // if 2 are active handle removing only correct one
            // else remove and go back to main image
        // else show no anomoly message

        // finally hide messages
    };

    const toggleReportMenu = () => {
        if (open) cancel();
        else open = true;
    };

    const cancel = () => {
        open = false;
        showRoomOptions = false;
    };
</script>

<button type="button" onclick={toggleReportMenu}>Report</button>
{#if open}
    <div class="reports">
        <button type="button" onclick={() => report('obj-dpr')}>Object Dissapeared</button>
        <button type="button" onclick={() => report('obj-apr')}>Object Appeared</button>
        <button type="button" onclick={() => report('obj-mov')}>Object Moved</button>
        <button type="button" onclick={() => report('img-aly')}>Image Anomaly</button>
        <button type="button" onclick={() => report('dor-aly')}>Door Anomaly</button>
        <button type="button" onclick={() => report('lit-aly')}>Light Anomaly</button>
        <button type="button" onclick={() => showRoomOptions = true}>Camera Malfunction</button>
        <button type="button" onclick={() => report('crp-apr')}>Corpse</button>
        <button type="button" onclick={() => report('itr-apr')}>Intruder</button>
        <button type="button" onclick={cancel}>Cancel</button>
    </div>
{/if}

{#if showRoomOptions}
    <div>
        {#each getRooms() as room}
            <button type="button" onclick={() => report('cam-mal', room.id)}>{room.label}</button>
        {/each}
    </div>
{/if}

<style>
    button {
        background-color: rgba(0, 0, 0, 0.356);
        padding: 0.25rem;
    }
    .reports {
        display: flex;
        flex-direction: column;
        gap: 0.5rem
    }
</style>
