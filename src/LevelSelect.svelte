<script lang="ts">
    import levels from './levels';
</script>

<ul>
    {#each levels as level}
        <li>
            <img src={level.rooms[0].imageUrl} alt={level.name} />
            <span>{level.name}</span>
        </li>
    {/each}
</ul>

<style>
</style>
