<script lang="ts">
    import { getActiveRoom, getClockSeconds } from './GameState.svelte';
    let clockDisplay = $derived.by(() => {
        const clockSeconds = getClockSeconds();
        const hours = Math.floor(clockSeconds / 60);
        const minutes = clockSeconds % 60;
        const minutesFormatted = minutes <= 9 ? `0${minutes}` : minutes;
        return `0${hours}:${minutesFormatted}`;
    });
</script>

<div class="info">
    <span>{getActiveRoom().label}</span>
    <span>{clockDisplay}</span>
</div>
