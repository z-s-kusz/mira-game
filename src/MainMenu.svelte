<script lang="ts">
    import { startGame } from './State.svelte';
</script>

<section class="main-menu">
    <button type="button" onclick={startGame}>Start Game</button>
    <button type="button">Options</button>
</section>

<style>
    .main-menu {
        display: flex;
        flex-direction: column;
    }
</style>
