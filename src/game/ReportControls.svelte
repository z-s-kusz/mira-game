<script lang="ts">
    import { fade } from 'svelte/transition';
    import { getRooms, report } from '../GameState.svelte';

    let open = $state(false);
    let showRoomOptions = $state(false);

    const toggleReportMenu = () => {
        if (open) closeAll();
        else open = true;
    };

    const closeAll = () => {
        open = false;
        showRoomOptions = false;
    };

    const submitReport = (type: string, roomId?: string) => {
        closeAll();
        report(type, roomId);
    };
    const options = {
        duration: 200,
    };
</script>

<!-- controls appear 'reverse' starting at bottom right corner and popping up further left -->
<div class="report-controls">
    {#if showRoomOptions}
        <div class="reports" in:fade={options} out:fade={options}>
            <div class="header">Cam Malfunction Location</div>
            {#each getRooms() as room}
                <button type="button" onclick={() => submitReport('cam-mal', room.id)}>{room.label}</button>
            {/each}
            <button type="button" onclick={() => showRoomOptions = false}>Cancel</button>
        </div>
    {/if}

    {#if open}
        <div class="reports" in:fade={options} out:fade={options}>
            <button type="button" onclick={() => submitReport('obj-dpr')}>Object Dissapeared</button>
            <button type="button" onclick={() => submitReport('obj-apr')}>Object Appeared</button>
            <button type="button" onclick={() => submitReport('obj-mov')}>Object Moved</button>
            <button type="button" onclick={() => submitReport('img-aly')}>Image Anomaly</button>
            <button type="button" onclick={() => submitReport('dor-aly')}>Door Anomaly</button>
            <button type="button" onclick={() => submitReport('lit-aly')}>Light Anomaly</button>
            <button type="button" onclick={() => showRoomOptions = true}>Camera Malfunction</button>
            <button type="button" onclick={() => submitReport('crp-apr')}>Corpse</button>
            <button type="button" onclick={() => submitReport('itr-apr')}>Intruder</button>
            <button type="button" onclick={closeAll}>Cancel</button>
        </div>
    {/if}

    <button type="button" onclick={toggleReportMenu}>Report</button>
</div>

<style>
    button, .header {
        background-color: rgba(0, 0, 0, 0.356);
        padding: 0.25rem;
        border-radius: 0;
    }
    button:focus,
    button:focus-visible {
        outline: 0 auto -webkit-focus-ring-color;
    }
</style>
