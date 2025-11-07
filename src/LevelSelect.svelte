<script lang="ts">
    import levels from './levels';
    import { startGame } from './State.svelte';
</script>

<ul>
    {#each levels as level}
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_click_events_have_key_events -->
        <li class="thumbnail" onclick={() => startGame(level)}>
            <img src={level.rooms[0].imageUrl} alt={level.name} />
            <h3 class="label">{level.name}</h3>
        </li>
    {/each}
</ul>

<style>
    ul {
        margin: 0;
        padding: 0;
    }

    .thumbnail {
        list-style-type: none;
        position: relative;

        img {
            width: 380px;
            height: 260px;
        }

        .label {
            background-color: rgba(0,0,0, 0.5);
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 0.5rem;
            margin: 0;
        }
    }
</style>
