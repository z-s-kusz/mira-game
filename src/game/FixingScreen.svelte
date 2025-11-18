<script lang="ts">
    import { getShowFixingView } from '../GameState.svelte';
</script>

{#if getShowFixingView()}
    <div class="fixing">
        <span>Fixing Anomaly Please Wait...</span>
    </div>
{/if}

<style>
    .fixing {
        background-color: black;
    }
</style>
