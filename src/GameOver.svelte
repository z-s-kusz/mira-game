<script lang="ts">
    import { getGameOverState, getResolvedAnomalies, reset } from './GameState.svelte';
</script>

{#if getGameOverState() === 'win'}
    <h2>Your Shift Is Over</h2>
    <p>You resolved {getResolvedAnomalies().length} anomalies.</p>
{:else if getGameOverState() === 'lose'}
    <h2>Game Over</h2>
    <p>The anomalies took over.</p>
    <button type="button" onclick={() => reset(true)}>Retry</button>
{:else}
    <h2>What are you doing here?</h2>
    <p>/unknown error/</p>
    <p>error.message = '';</p>
{/if}
<button type="button" onclick={() => reset(false)}>Continue</button>
