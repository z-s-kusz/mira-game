<script lang="ts">
    import { getActiveAnomaliesCount, getWarning } from '../GameState.svelte';

    let message = $derived.by(() => {
        const message = {
            text: '',
            class: '',
        };
        if (getActiveAnomaliesCount() === getWarning().threshhold && getWarning().remainingWarnings > 0) {
            message.class = 'warn';
            message.text = 'WARNING: Readings indicate anomalies are appraoching critical volume.';
        }
        // else if motion sensor has been activated
        return message;
    });
</script>

{#if message.text}
    <h3 class={`message ${message.class}`}>{message.text}</h3>
{/if}
