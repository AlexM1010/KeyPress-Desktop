<!-- frontend\src\routes\stats\IpsChart.svelte -->

<script lang="ts">
    import { derived } from 'svelte/store';
    import { ColorType, CrosshairMode } from 'lightweight-charts';
    import { Chart, LineSeries } from 'svelte-lightweight-charts';
    import { numIPsHistory, ipValueHistory } from '$lib/stores/stats';

    interface LineData {
        time: string;
        value: number;
    }

    const numIPsLineDataStore = derived<typeof numIPsHistory, LineData[]>(numIPsHistory, ($numIPsHistory, set) => {
        if ($numIPsHistory.length === 0) {
            set([]);
            return;
        }

        const lines: LineData[] = $numIPsHistory.map(entry => ({
            time: entry.time.split('T')[0],
            value: entry.value
        }));

        set(lines);
    }, []);

    const ipValueLineDataStore = derived<typeof ipValueHistory, LineData[]>(ipValueHistory, ($ipValueHistory, set) => {
        if ($ipValueHistory.length === 0) {
            set([]);
            return;
        }

        const lines: LineData[] = $ipValueHistory.map(entry => ({
            time: entry.time.split('T')[0],
            value: entry.value
        }));

        set(lines);
    }, []);

    let windowWidth = window.innerWidth;

    function handleResize() {
        windowWidth = window.innerWidth;
    }

    $: options = {
        width: windowWidth,
        height: 300,
        layout: {
            background: { type: ColorType.Solid, color: '#000000' },
            textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
            vertLines: { color: 'rgba(197, 203, 206, 0.5)' },
            horzLines: { color: 'rgba(197, 203, 206, 0.5)' },
        },
        crosshair: { mode: CrosshairMode.Normal },
        rightPriceScale: { borderColor: 'rgba(197, 203, 206, 0.8)' },
        timeScale: { borderColor: 'rgba(197, 203, 206, 0.8)' },
    };
</script>

<div>
    <Chart {...options}>
        <LineSeries
            data={$numIPsLineDataStore}
            color="rgba(0, 255, 255, 1)"
            lineWidth={2}
        />
        <LineSeries
            data={$ipValueLineDataStore}
            color="rgba(255, 165, 0, 1)"
            lineWidth={2}
        />
    </Chart>
</div>

<svelte:window on:resize={handleResize} />
