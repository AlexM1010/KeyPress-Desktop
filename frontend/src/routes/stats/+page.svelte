<script lang="ts">
    import CandlestickChart from './CandlestickChart.svelte';
    import OpinionChart from './OpinionChart.svelte';
    import RiskChart from './RiskChart.svelte';
    import IPsChart from './IPsChart.svelte';
</script>

<div style="transform: translateX(-40);">
    <div style="width: 100%; overflow-y: auto;">
        <section class="chart-section">
            <h2 class="chart-title">Company Market Price</h2>
            <CandlestickChart />
        </section>

        <section class="chart-section">
            <h2 class="chart-title">Public Opinion</h2>
            <OpinionChart />
        </section>

        <section class="chart-section">
            <h2 class="chart-title">Company Risk</h2>
            <RiskChart />
        </section>

        <section class="chart-section">
            <h2 class="chart-title">Intellectual Property</h2>
            <IPsChart />
        </section>
    </div>
</div>

<style>
    .chart-section {
        position: relative;
        margin: 0;
        padding: 0.2rem 0;
        border-bottom: 0.2rem solid rgba(255, 255, 255, 0.9);
    }
    
    .chart-title {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 1.5rem;
        margin: 0;
        color: #FFF;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 4px 8px;
        border-radius: 4px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
</style>