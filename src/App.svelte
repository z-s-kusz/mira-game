<script lang="ts">
    import GameOver from './GameOver.svelte';
    import MainMenu from './MainMenu.svelte';
    import { getGameView } from './State.svelte';
    import Mira from './game/Mira.svelte';
</script>

<main>
    {#if getGameView() === 'MainMenu'}
        <MainMenu />
    {:else if getGameView() === 'GameOver'}
        <GameOver />
    {:else if getGameView() === 'Playing'}
        <Mira />
    {:else}
        <div>This aint a valid view.</div>
    {/if}
</main>
