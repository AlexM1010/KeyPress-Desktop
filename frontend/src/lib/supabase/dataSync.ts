import { money, opinion, risk, numIPs, ipValue } from '$lib/stores/stats';
import { onMount } from 'svelte';
import runtime from '@wailsapp/runtime';

onMount(() => {
    const cleanup = runtime.Events.On("stats:updated", (data) => {
        data.money !== undefined && money.set(data.money);
        data.opinion !== undefined && opinion.set(data.opinion);
        data.risk !== undefined && risk.set(data.risk);
        data.num_ips !== undefined && numIPs.set(data.num_ips);
        data.ip_value !== undefined && ipValue.set(data.ip_value);
    });

    return cleanup;
});