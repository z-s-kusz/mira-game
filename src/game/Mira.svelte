<script lang="ts">
    import Clock from '../Clock.svelte';
    import Arrows from './Arrows.svelte';
    import ReportControls from './ReportControls.svelte';
    let img = $state('cam.jpg');

    const cycleImages = () => {
        img = img === 'cam.jpg' ? 'cam2.jpg' : 'cam.jpg';
    };
</script>

    <section class="main-window">
            <img class="main" src={img} alt="main" />
            <img class="static" src="noise.png" alt="static" />
            <div class="info-container">
                <ReportControls />
                <Clock />
            </div>
    </section>
    <Arrows />

  <style>
    .main-window {
        position: relative;
        overflow: hidden;
    }

    .main {
        z-index: 1;
    }

    .static {
        z-index: 2;
        position: absolute;
        height: 200%;
        width: 200%;
        top: -50%;
        left: -50%;
        opacity: 2%;
        animation: shift 500ms steps(5) infinite;
    }
    @keyframes shift {
        8% {
            transform: translateX(6%);
        }
        26% {
            transform: translateX(-10%);
        }
        42% {
            transform: translateX(4%);
        }
        64% {
            transform: translateX(-20%);
        }
        100% {
            transform: translateY(-20%);
        }
    }

    .info-container {
        z-index: 3;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
