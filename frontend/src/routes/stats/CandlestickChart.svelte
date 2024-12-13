<script lang="ts">
    import { derived } from 'svelte/store';
    import { ColorType, CrosshairMode } from 'lightweight-charts';
    import { Chart, CandlestickSeries } from 'svelte-lightweight-charts';
    import { money, moneyHistory } from '$lib/stores/stats';

    interface CandlestickData {
        time: string;
        open: number;
        high: number;
        low: number;
        close: number;
    }

    const VARIATION_PERCENT = 0.05;
    const INCREASE_FACTOR = 1 / 100000; //100,000

    function createCandle(value: number, time: string): CandlestickData {
        const base = value * INCREASE_FACTOR;
        const variation = base * VARIATION_PERCENT;
        const open = base * (1 + (Math.random() - 0.5) * 0.02);
        const close = base;
        let high = base + Math.random() * variation;
        let low = base - Math.random() * variation;

        high = Math.max(high, open, close);
        low = Math.min(low, open, close);

        return { time: time.split('T')[0], open, close, high, low };
    }

    const combinedCandlestickDataStore = derived<[typeof money, typeof moneyHistory], CandlestickData[]>([money, moneyHistory], ([$money, $moneyHistory], set) => {
        if ($moneyHistory.length === 0) return;

        let candles: CandlestickData[] = $moneyHistory.slice(-30).map(entry => createCandle(entry.value, entry.time));

        for (let i = 0; i < $moneyHistory.length - 1; i++) {
            const current = $moneyHistory[i];
            const next = $moneyHistory[i + 1];
            const daysBetween = 7;

            for (let d = 1; d < daysBetween; d++) {
                const interpolatedTime = new Date(new Date(current.time).getTime() + d * 86400000).toISOString().split('T')[0];
                const interpolatedValue = current.value + ((next.value - current.value) / daysBetween) * d;
                candles.push(createCandle(interpolatedValue, interpolatedTime));
            }
        }

        candles.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        set(candles);
    });

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
        <CandlestickSeries
            data={$combinedCandlestickDataStore}
            upColor="rgba(0, 255, 0, 1)"
            downColor="rgba(255, 0, 0, 1)"
            borderDownColor="rgba(255, 0, 0, 1)"
            borderUpColor="rgba(0, 255, 0, 1)"
            wickDownColor="rgba(255, 0, 0, 1)"
            wickUpColor="rgba(0, 255, 0, 1)"
        />
    </Chart>
</div>

<svelte:window on:resize={handleResize} />