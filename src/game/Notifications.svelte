<script lang="ts">
    import { getActiveAnomaliesCount, getWarning } from '../State.svelte';

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
    <div class={`message ${message.class}`}>{message}</div>
{/if}

<style>
    .message {
        padding: 0;
        margin: 0;
        background-color: rgba(0, 0, 0, 0.36);
    }
    .warn {
        color: rgb(252, 184, 39);
    }
</style>
