<script lang="ts">
    let menuIsOpen = $state(false);
</script>

{#if menuIsOpen}
    <div class="blocking-overlay"></div>
    <section>
        <span> Game is paused.</span>
    </section>
{:else}
    <button type="button">Pause</button>
{/if}

<style>
    .blocking-overlay {
        /* TODO make the parent game thing position relative */
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
    }
</style>
