<script lang="ts">
    import LevelSelect from './LevelSelect.svelte';

    let view: 'start' | 'levels' | 'options' = $state('start');
</script>

<section class="main-menu">
    {#if view === 'start'}
        <button type="button" onclick={() => view = 'levels'}>New Game</button>
        <button type="button" onclick={() => view = 'options'}>Options</button>
    {:else if view === 'levels'}
        <button type="button" onclick={() => view = 'start'}>Back</button>
        <LevelSelect />
    {:else if view === 'options'}
        <span>some options stuff...</span>
        <button type="button" onclick={() => view = 'start'}>Back</button>
    {:else}
        <span>Unhandled view option</span>
    {/if}
</section>

<style>
    .main-menu {
        display: flex;
        flex-direction: column;
    }
</style>
