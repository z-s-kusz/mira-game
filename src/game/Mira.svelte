<script lang="ts">
    import ClockAndName from '../Clock&Name.svelte';
    import { getActiveRoom } from '../GameState.svelte';
    import Arrows from './Arrows.svelte';
    import FixingBufferOverlay from './FixingBufferOverlay.svelte';
    import Notifications from './Notifications.svelte';
    import ReportControls from './ReportControls.svelte';
    let img = $derived(getActiveRoom().activeImageUrl);
</script>

<section class="main-window">
    <img class="main" src={img} alt="main" />
    <img class="static" src="noise.png" alt="static" />
    <div class="info-container">
        <ClockAndName />
        <Notifications />
    </div>
    <ReportControls />
    <FixingBufferOverlay />
</section>
<Arrows />
