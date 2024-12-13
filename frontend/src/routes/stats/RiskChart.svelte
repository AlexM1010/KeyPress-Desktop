<!-- frontend\src\routes\stats\RiskChart.svelte -->
<script lang="ts">
    import { get } from 'svelte/store';
    import { ColorType, CrosshairMode } from 'lightweight-charts';
    import { Chart, LineSeries } from 'svelte-lightweight-charts';
    import { allPlayersRiskHistory } from '$lib/stores/stats';
    
    /*
    allPlayersRiskHistory.set({
        "player-1-uuid": [
            { time: "2023-10-01T12:00:00Z", value: 45, player_id: "player-1-uuid" },
            { time: "2023-10-02T12:00:00Z", value: 50, player_id: "player-1-uuid" }
        ],
        "player-2-uuid": [
            { time: "2023-10-01T12:00:00Z", value: 30, player_id: "player-2-uuid" },
            { time: "2023-10-02T12:00:00Z", value: 35, player_id: "player-2-uuid" }
        ]
    });*/

    let windowWidth = window.innerWidth;

    function handleResize() {
        windowWidth = window.innerWidth;
    }

    const lineColors = [
        'rgba(255, 0, 0, 1)',   // Player 1: Red
        'rgba(0, 255, 0, 1)',   // Player 2: Green
        'rgba(0, 0, 255, 1)',   // Player 3: Blue
        'rgba(255, 165, 0, 1)', // Player 4: Orange
    ];

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

    // Debug: Log whenever allPlayersRiskHistory changes
    $: console.log("allPlayersRiskHistory:", $allPlayersRiskHistory);

    interface RiskDataEntry {
        time: string;
        value: number;
    }

    function simplifyData(data: RiskDataEntry[]) {
        // Debug: Log the incoming data before transforming
        console.log("Incoming player data:", data);

        const transformed = data.map(entry => ({
            time: entry.time.split('T')[0],
            value: entry.value
        }));

        // Debug: Log after transformation
        console.log("Transformed player data:", transformed);
        return transformed;
    }
</script>

<div>
    <Chart {...options}>
        {#each Object.entries($allPlayersRiskHistory) as [playerID, data], i}
            <!-- Debug: Log playerID and index -->
            {#if $allPlayersRiskHistory}
                {console.log(`Rendering line for playerID=${playerID}, index=${i}`)}
            {/if}
            
            <LineSeries
                data={simplifyData(data)}
                color={lineColors[i] || 'rgba(255, 255, 255, 1)'}
                lineWidth={2}
            />
        {/each}
    </Chart>
</div>

<svelte:window on:resize={handleResize} />
