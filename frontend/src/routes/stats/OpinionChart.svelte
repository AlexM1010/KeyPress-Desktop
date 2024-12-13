<script lang="ts">
    import { derived } from 'svelte/store';
    import { ColorType, CrosshairMode } from 'lightweight-charts';
    import { Chart, LineSeries } from 'svelte-lightweight-charts';
    import { opinionHistory } from '$lib/stores/stats';

    interface LineData {
        time: string;
        value: number;
    }

    const combinedLineDataStore = derived<typeof opinionHistory, LineData[]>(opinionHistory, ($opinionHistory, set) => {
        if ($opinionHistory.length === 0) {
            set([]);
            return;
        }

        const lines: LineData[] = $opinionHistory.map(entry => ({
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
            data={$combinedLineDataStore}
            color="rgba(0, 0, 255, 1)"
            lineWidth={2}
        />
    </Chart>
</div>

<svelte:window on:resize={handleResize} />
