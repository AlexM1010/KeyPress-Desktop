# Project Structure

```
.github/
  workflows/
    main.yml
app/
backend/
  tagui_scripts/
    sample.tag
frontend/
  .svelte-kit/
    generated/
      client/
        nodes/
          0.js
          1.js
          2.js
          3.js
          4.js
          5.js
          6.js
          7.js
          8.js
          9.js
          10.js
        app.js
        matchers.js
      client-optimized/
        nodes/
          0.js
          1.js
          2.js
          3.js
          4.js
          5.js
          6.js
          7.js
          8.js
          9.js
          10.js
        app.js
        matchers.js
      server/
        internal.js
      root.js
      root.svelte
    output/
      client/
        _app/
          immutable/
            assets/
              _layout.DbiAIqBz.css
              _page.B96OpU7q.css
              _page.BbvuC-Oi.css
              _page.BNycyc62.css
              _page.BX53_g87.css
              _page.C-O9c8IL.css
              _page.RX2Oo92H.css
              0.DbiAIqBz.css
              3.B96OpU7q.css
              4.Bh3qCG6L.css
              6.C-O9c8IL.css
              7.BNycyc62.css
              9.CXQnTD1z.css
              10.DKiCvSgt.css
              index.B0IJmGxv.css
              index.CXtDGdkI.css
              TabTitle.DkLMgb21.css
            chunks/
              _commonjsHelpers.Cpj98o6Y.js
              auth.BJbIxYOa.js
              each.BpC6mI_G.js
              entry.ugnHh8dn.js
              globals.D0QH3NT1.js
              Icon.u7eYbDI3.js
              index.9CHE0Tmk.js
              index.B55eCyYw.js
              index.CtLx7J6d.js
              index.DKbIBCAO.js
              navbar.h-EKyfhH.js
              paths.BFJCjVQp.js
              runtime.DFsPlJ2T.js
              scheduler.CzjpHdD6.js
              spread.CgU5AtxT.js
              stats.yeHW1xXO.js
              stores.CeOmJydy.js
              TabTitle.D5i7HQTr.js
            entry/
              app.DQxKp_h7.js
              start.D1IlVyET.js
            nodes/
              0.DjI_NrVT.js
              1.C5xgW3Uh.js
              2.BtKGtllL.js
              3.Be649ANU.js
              4.CkgLoCnJ.js
              5.oo7ltAHw.js
              6.DbsXg0H0.js
              7.BNQsIWgt.js
              8.ClPDaUdT.js
              9.B7LzwVd4.js
              10.CU0JFPss.js
          version.json
        .vite/
          manifest.json
        cardImages/
          oil-rig.jpg
        logos/
          adonis.png
          after-effects.svg
          android.png
          angular.png
          aws.svg
          bootstrap.svg
          c.svg
          celery.svg
          cpp.svg
          csharp.svg
          css.svg
          dart.png
          deno.png
          django.svg
          docker.svg
          electron.png
          express.png
          fastify.svg
          firebase.png
          flask.svg
          flutter.svg
          go.svg
          herke-ict-group.svg
          html.svg
          illustrator.svg
          java.png
          jest.png
          js.png
          kafka.svg
          kotlin.png
          kubernetes.svg
          mongodb.svg
          neo4j.svg
          nest.svg
          nginx.svg
          no-img.svg
          node.png
          numpy.svg
          nuxt.png
          pandas.svg
          photoshop.svg
          postcss.svg
          postgres.png
          premiere.svg
          python.png
          quasar.svg
          rabbitmq.svg
          react.svg
          redis.svg
          rust.svg
          ruvy.svg
          sass.png
          scrapy.png
          selenium.svg
          solid.svg
          svelte.png
          tailwind.svg
          ts.png
          unocss.svg
          vite.png
          vitest.svg
          vue.png
          xamarin.svg
        card-bg.png
        favicon.png
        Keypress-Logo.svg
      prerendered/
        dependencies/
          _app/
            env.js
        pages/
          index.html
          login.html
          map.html
          profile.html
          projects.html
          stats.html
          swiper.html
          workspace.html
      server/
        _app/
          immutable/
            assets/
              _layout.DbiAIqBz.css
              _page.B96OpU7q.css
              _page.BbvuC-Oi.css
              _page.BNycyc62.css
              _page.BX53_g87.css
              _page.C-O9c8IL.css
              _page.RX2Oo92H.css
              index.B0IJmGxv.css
              TabTitle.DkLMgb21.css
        .vite/
          manifest.json
        chunks/
          auth.js
          client.js
          exports.js
          Icon.js
          index.js
          internal.js
          names.js
          navbar.js
          paths.js
          projects.js
          ssr.js
          stats.js
          stores.js
          TabTitle.js
          theme.js
          utils.js
          x.js
        entries/
          fallbacks/
            error.svelte.js
          pages/
            login/
              _page.svelte.js
            map/
              _page.svelte.js
            profile/
              _page.svelte.js
            projects/
              _slug_/
                _page.svelte.js
                _page.ts.js
              _page.svelte.js
            stats/
              _page.svelte.js
            swiper/
              _page.svelte.js
            workspace/
              _page.svelte.js
            _layout.svelte.js
            _layout.ts.js
            _page.svelte.js
        nodes/
          0.js
          1.js
          2.js
          3.js
          4.js
          5.js
          6.js
          7.js
          8.js
          9.js
          10.js
        stylesheets/
        index.js
        internal.js
        manifest-full.js
        manifest.js
    types/
      src/
        routes/
          (workspace)/
            [userId]/
          [email]/
          [userId]/
          auth/
            confirm/
            error/
          cardSwiper/
          design/
          login/
            $types.d.ts
          map/
            $types.d.ts
          private/
            [userId]/
          profile/
            $types.d.ts
          projects/
            [slug]/
              $types.d.ts
            $types.d.ts
          register/
          stats/
            $types.d.ts
          swiper/
            $types.d.ts
          workspace/
            [userId]/
            $types.d.ts
          $types.d.ts
      route_meta_data.json
    ambient.d.ts
    non-ambient.d.ts
    tsconfig.json
  src/
    assets/
      cached/
    lib/
      assets/
        cached/
      CardSwiper/
        Card.svelte
        CardSwiper.svelte
        index.ts
      components/
        Banner/
          Banner.svelte
        Card/
          Card.svelte
          CardDivider.svelte
          CardLink.svelte
          CardLogo.svelte
          CardTitle.svelte
        Carrousel/
          Carrousel.svelte
        Chip/
          Chip.svelte
          ChipIcon.svelte
        customNodes/
          nodeComponents/
            ButtonGroup.svelte
            ButtonGroupItem.svelte
            Checkbox.svelte
            ContextMenu.svelte
            Input.svelte
            NodeWrapper.svelte
            NumberInput.svelte
            Select.svelte
            Slider.svelte
            TimeInput.svelte
          ColorPickerNode.svelte
          DelayNode.svelte
          KeyPressNode.svelte
          MouseClickNode.svelte
          MouseMoveNode.svelte
          nodes-and-edges.ts
          NodeSVGStore.ts
          nodeTypes.ts
          StartNode.svelte
          SVGNode.svelte
          types.ts
        ExperienceCard/
          ExperienceCard.svelte
        Icon/
          Icon.svelte
          Icons.ts
          UIcon.svelte
        Input/
          Input.svelte
        MainTitle/
          MainTitle.svelte
        NavMenu/
          NavMenu.svelte
        ProjectCard/
          ProjectCard.svelte
        Screenshot/
          Screenshot.svelte
        CommonPage.svelte
        Markdown.svelte
        SearchPage.svelte
        TabTitle.svelte
      data/
        app.ts
        assets.ts
        home.ts
        navbar.ts
        projects.ts
        skills.ts
      md/
        svelte.md
      stores/
        auth.ts
        map.ts
        navbar.ts
        nodes.ts
        stats.ts
        swiper.ts
        theme.ts
      supabase/
        dataSync.ts
      theme/
      types/
        block.ts
        edge.ts
        manifest.ts
        nodeProps.ts
        tailwind.ts
      utils/
        helpers.ts
        tailwind.ts
        textWrap.ts
        util.ts
      wailsjs/
        go/
          main/
            App.d.ts
            App.js
          models.ts
        runtime/
          package.json
          runtime.d.ts
          runtime.js
      index.scss
      index.ts
      types.ts
      utils.ts
    routes/
      login/
        +page.svelte
        login.scss
        Login.svelte
        schema.ts
      map/
        +page.svelte
        Marker.svelte
        Popup.svelte
      profile/
        +page.svelte
      projects/
        [slug]/
          +page.svelte
          +page.ts
        +page.svelte
      stats/
        +page.svelte
        CandlestickChart.svelte
      swiper/
        +page.svelte
      workspace/
        utils/
          utils.ts
        +page.svelte
        ConnectionLine.svelte
        CustomEdge.svelte
        DnDProvider.svelte
        Flow.svelte
        FlowStyle.css
      +layout.svelte
      +layout.ts
      +page.svelte
      Logo.svelte
      navbar.css
      ThemeToggle.svelte
    wailsjs/
      go/
        main/
      runtime/
    app.html
    global.d.ts
    hooks.client.ts
    routes.ts
    wails.d.ts
  static/
    cardImages/
      green.jpg
      law.jpg
      oilrig.jpg
      science.jpg
      shipping.jpg
      smokestack.jpg
    logos/
      adonis.png
      after-effects.svg
      android.png
      angular.png
      aws.svg
      bootstrap.svg
      c.svg
      celery.svg
      cpp.svg
      csharp.svg
      css.svg
      dart.png
      deno.png
      django.svg
      docker.svg
      electron.png
      express.png
      fastify.svg
      firebase.png
      flask.svg
      flutter.svg
      go.svg
      herke-ict-group.svg
      html.svg
      illustrator.svg
      java.png
      jest.png
      js.png
      kafka.svg
      kotlin.png
      kubernetes.svg
      mongodb.svg
      neo4j.svg
      nest.svg
      nginx.svg
      no-img.svg
      node.png
      numpy.svg
      nuxt.png
      pandas.svg
      photoshop.svg
      postcss.svg
      postgres.png
      premiere.svg
      python.png
      quasar.svg
      rabbitmq.svg
      react.svg
      redis.svg
      rust.svg
      ruvy.svg
      sass.png
      scrapy.png
      selenium.svg
      solid.svg
      svelte.png
      tailwind.svg
      ts.png
      unocss.svg
      vite.png
      vitest.svg
      vue.png
      xamarin.svg
    card-bg.png
    favicon.png
    Keypress-Logo.svg
  supabase/
    .branches/
      _current_branch
    .temp/
      cli-latest
    migrations/
      init.sql
    .gitignore
    config.toml
  wailsjs/
    go/
      main/
        App.d.ts
        App.js
      models.ts
    runtime/
      package.json
      runtime.d.ts
      runtime.js
  .env
  .env.local
  .gitignore
  .npmrc
  components.json
  package-lock.json
  package.json
  package.json.md5
  postcss.config.cjs
  postcss.config.js
  README.md
  svelte.config.js
  tailwind.config.js
  tsconfig.json
  vite.config.ts
  vite.config.ts.timestamp-1730831269469-9ff243167fcad.mjs
.gitignore
app.go
go.mod
go.sum
main.go
package-lock.json
package.json
README.md
wails.json
```


# Active Tabs Content


## frontend\src\lib\stores\swiper.ts

```ts
// frontend\src\lib\stores\swiper.ts

import { writable } from 'svelte/store';
import { type CardEffects } from '$lib/stores/stats';

export interface CardData {
    title?: string;
    description?: string;
    image?: string;
    effects?: CardEffects;
    categories?: string[];
}

const initialCards: CardData[] = [
    {
        title: 'Expand Refinery Capacity',
        description: 'Invest £1M to boost production. This reduces bottlenecks and increases long-term profitability.',
        image: '../../cardImages/oilrig.jpg',
        effects: {
            moneyChangeFromCard: -1000000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Production', '+OilRig']
    },
    {
        title: 'Upgrade Emission Filters',
        description: 'Spend £700k to install advanced emission filters, improving environmental performance.',
        image: '../../cardImages/smokestack.jpg',
        effects: {
            moneyChangeFromCard: -700000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Environmental']
    },
    {
        title: 'Trade Carbon Credits',
        description: 'Purchase 2 carbon credits (min) at £300k each to improve your Environmental Impact Score.',
        image: '../../cardImages/green.jpg',
        effects: {
            moneyChangeFromCard: -600000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Environmental']
    },
    {
        title: 'Invest in Hydrogen Tech',
        description: 'Spend £600k in R&D to boost Environmental Impact Score and Patent Portfolio Value.',
        image: '../../cardImages/green.jpg',
        effects: {
            moneyChangeFromCard: -600000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Environmental', '+Patents']
    },
    {
        title: 'Launch New Product Line',
        description: 'Invest £800k to develop and launch a new product line, increasing revenue streams.',
        image: '../../cardImages/science.jpg',
        effects: {
            moneyChangeFromCard: 800000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Production', '+Expansion']
    },
    {
        title: 'Optimize Supply Chain',
        description: 'Allocate £500k to streamline supply chain operations, reducing costs and enhancing profitability.',
        image: '../../cardImages/shipping.jpg',
        effects: {
            moneyChangeFromCard: 500000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        },
        categories: ['+Production']
    }
];

export const cards = writable<CardData[]>(initialCards);
```


## frontend\src\lib\stores\stats.ts

```ts
// frontend/src/lib/stores/stats.ts

import { writable, get } from 'svelte/store';

/**
 * Interface for Card Effects
 */
export interface CardEffects {
    moneyChangeFromCard: number;
    opinionChangeFromCard: number;
    riskChangeFromCard: number;
    numIPsFromCard: number;
    ipValueChangeFromCard: number;
}

/**
 * Interface for History Data (suitable for lightweight-charts LineSeries)
 */
export interface StatHistoryData {
    time: string;
    value: number;
}

/**
 * Current Stat Stores
 */
export const money = writable<number>(1000000);
export const opinion = writable<number>(5);
export const risk = writable<number>(50);
export const numIPs = writable<number>(0);
export const ipValue = writable<number>(0);

// New Store to Track Accepted Cards
export const acceptedCards = writable<number>(0);

/**
 * History Stores for Each Stat
 */
export const moneyHistory = writable<StatHistoryData[]>([]);
export const opinionHistory = writable<StatHistoryData[]>([]);
export const riskHistory = writable<StatHistoryData[]>([]);
export const numIPsHistory = writable<StatHistoryData[]>([]);
export const ipValueHistory = writable<StatHistoryData[]>([]);

/**
 * Current Time Store
 */
export const currentTime = writable<string>(new Date().toISOString());

/**
 * Constants for Stat Calculations
 */
const ipValueFactor = 1000;
const riskCostFactor = 50;
const opinionFactor = 0.1;
const riskIncreaseFactor = 0.5;
const ipValueGrowthFactor = 500;

/**
 * Initialize Stats History
 */
export function initializeStatsHistory(initialTime: string) {
    const initialMoney = get(money);
    const initialOpinion = get(opinion);
    const initialRisk = get(risk);
    const initialNumIPs = get(numIPs);
    const initialIPValue = get(ipValue);

    moneyHistory.update(history => [...history, { time: initialTime, value: initialMoney }]);
    opinionHistory.update(history => [...history, { time: initialTime, value: initialOpinion }]);
    riskHistory.update(history => [...history, { time: initialTime, value: initialRisk }]);
    numIPsHistory.update(history => [...history, { time: initialTime, value: initialNumIPs }]);
    ipValueHistory.update(history => [...history, { time: initialTime, value: initialIPValue }]);
}

/**
 * Update Stats Based on Card Decision
 */
export function updateStats(cardEffects: CardEffects) {
    // Increment accepted cards
    acceptedCards.update(count => count + 1);

    // Get and update current time
    let newTime: string;
    currentTime.update(time => {
        const date = new Date(time);
        date.setDate(date.getDate() + 7);
        newTime = date.toISOString();
        return newTime;
    });

    const {
        moneyChangeFromCard,
        opinionChangeFromCard,
        riskChangeFromCard,
        numIPsFromCard,
        ipValueChangeFromCard
    } = cardEffects;

    // Update Money
    money.update(currentMoney => {
        const revenueFromIPs = get(numIPs) * ipValueFactor;
        const penaltyFromRisk = get(risk) * riskCostFactor;
        const newMoney = currentMoney + revenueFromIPs - penaltyFromRisk + moneyChangeFromCard;
        return newMoney;
    });

    // Update Public Opinion
    opinion.update(currentOpinion => {
        const currentRisk = get(risk);
        const opinionImprovement = opinionFactor * (10 - currentRisk);
        let newOpinion = currentOpinion + opinionImprovement + opinionChangeFromCard;
        newOpinion = Math.min(Math.max(newOpinion, 0), 10); // Clamp between 0 and 10
        return newOpinion;
    });

    // Update Environmental Risk
    risk.update(currentRisk => {
        const currentOpinion = get(opinion);
        const riskIncrease = riskIncreaseFactor * (10 - currentOpinion);
        let newRisk = currentRisk + riskIncrease + riskChangeFromCard;
        newRisk = Math.min(Math.max(newRisk, 0), 100); // Clamp between 0% and 100%
        return newRisk;
    });

    // Update Number of IPs
    numIPs.update(currentNumIPs => currentNumIPs + numIPsFromCard);

    // Update Value of IPs
    ipValue.update(currentIPValue => {
        const growthFromIPs = get(numIPs) * ipValueGrowthFactor;
        const newIPValue = currentIPValue + growthFromIPs + ipValueChangeFromCard;
        return newIPValue;
    });

    // Log Updated Stats to History
    const updatedMoney = get(money);
    const updatedOpinion = get(opinion);
    const updatedRisk = get(risk);
    const updatedNumIPs = get(numIPs);
    const updatedIPValue = get(ipValue);

    moneyHistory.update(history => [...history, { time: newTime, value: updatedMoney }]);
    opinionHistory.update(history => [...history, { time: newTime, value: updatedOpinion }]);
    riskHistory.update(history => [...history, { time: newTime, value: updatedRisk }]);
    numIPsHistory.update(history => [...history, { time: newTime, value: updatedNumIPs }]);
    ipValueHistory.update(history => [...history, { time: newTime, value: updatedIPValue }]);
}
```


## frontend\src\routes\stats\CandlestickChart.svelte

```svelte
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

<div style="width: 100%">
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
```


## frontend\src\routes\stats\+page.svelte

```svelte
<script lang="ts">
    import CandlestickChart from './CandlestickChart.svelte';
</script>

<CandlestickChart />
```

