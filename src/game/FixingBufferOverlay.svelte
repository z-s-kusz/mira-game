<script lang="ts">
    import { fade } from 'svelte/transition';
    import { getShowFixingView } from '../GameState.svelte';
</script>

{#if getShowFixingView()}
    <div class="fixing" out:fade>
        <h2>Fixing Anomaly, Please Wait...</h2>
    </div>
{/if}
