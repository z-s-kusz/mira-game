<script lang="ts">
  let open = $state(false);
</script>

<button type="button" onclick={() => open = true}>Report</button>
{#if open}
  <div class="reports">
    <button type="button">Object Dissapeared</button>
    <button type="button">Object Appeared</button>
    <button type="button">Object Moved</button>
    <button type="button">Image Anomaly</button>
    <button type="button">Door Anomaly</button>
    <button type="button">Light Anomaly</button>
    <button type="button">Camera Malfunction</button>
    <button type="button">Corpse</button>
    <button type="button">Intruder</button>
    <button type="button" onclick={() => open = false}>Cancel Report</button>
  </div>
{/if}

<style>
.reports {
  display: flex;
  flex-direction: column;
  gap: 0.5rem
}
</style>
