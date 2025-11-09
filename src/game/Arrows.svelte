<script lang="ts">
    import { goToNextRoom, goToPreviousRoom } from '../GameState.svelte';

    const keyDown = (event: any) => {
        event.preventDefault();

        if (event.code === 'ArrowRight') {
            goToNextRoom();
        } else if (event.code === 'ArrowLeft') {
            goToPreviousRoom();
        }
    };

    $effect(() => {
        document.addEventListener('keydown', keyDown);

        return () => {
            document.removeEventListener('keydown', keyDown);
        };
    });
</script>

<div class="arrows">
    <button type="button" onclick={() => goToPreviousRoom()}>Prev Cam</button>
    <button type="button" onclick={() => goToNextRoom()}>Next Cam</button>
</div>

<style>
    .arrows {
        display: flex;
        justify-content: space-between;
    }
</style>
