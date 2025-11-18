<script lang="ts">
    import { fade } from 'svelte/transition';
    import { decrementWarnings, getActiveAnomaliesCount, getCenterMessage, getWarning } from '../GameState.svelte';

    // uses of decrement warnings here assumes only 1 is available, wont work with more warnings perk
    let message = $derived.by(() => {
        const message = {
            text: '',
            class: '',
        };
        if (getCenterMessage()) {
            message.text = getCenterMessage();
            message.class = '';
        } else if (getActiveAnomaliesCount() === getWarning().threshhold && getWarning().remainingWarnings > 0) {
            message.class = 'warn';
            message.text = 'WARNING: Readings indicate anomalies are appraoching critical volume.';
            setTimeout(() => {
                decrementWarnings();
            }, 5000);
        }
        // else if motion sensor has been activated
        return message;
    });
</script>

{#if message.text}
    <h3 in:fade out:fade class={`message ${message.class}`}>{message.text}</h3>
    {#if message.class === 'warn'}
        <button in:fade out:fade type="button" onclick={decrementWarnings}>Dismiss</button>
    {/if}
{/if}
