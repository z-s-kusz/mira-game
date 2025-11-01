<script lang="ts">
    import { getClockSeconds } from './State.svelte';
    let clockDisplay = $derived.by(() => {
        const clockSeconds = getClockSeconds();
        const hours = Math.floor(clockSeconds / 60);
        const minutes = clockSeconds % 60;
        const minutesFormatted = minutes <= 9 ? `0${minutes}` : minutes;
        return `0${hours}:${minutesFormatted}`;
    });
</script>

<span class="clock">{clockDisplay}</span>

<style>
    .clock {
        color: crimson;
    }
</style>
