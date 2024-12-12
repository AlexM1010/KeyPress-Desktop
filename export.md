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
    lib/
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
    app.html
    global.d.ts
    hooks.client.ts
    routes.ts
    wails.d.ts
  static/
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
export const money = writable<number>(10000);
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

/**
 * Example Usage
 * Uncomment the following lines to initialize and update stats for testing purposes.
 */

// Initialize history with the starting turn
// initializeStatsHistory('2024-01-01');

// Example Card 1: "Invest in Green Tech - £500 upfront"
// const card1: CardEffects = {
//     moneyChangeFromCard: -500,
//     opinionChangeFromCard: +2,
//     riskChangeFromCard: -5,
//     numIPsFromCard: +1,
//     ipValueChangeFromCard: +1000
// };
// updateStats(card1, '2024-01-02');

// Example Card 2: "Skip Safety Check to Save £300"
// const card2: CardEffects = {
//     moneyChangeFromCard: +300,
//     opinionChangeFromCard: -3,
//     riskChangeFromCard: +10,
//     numIPsFromCard: +0,
//     ipValueChangeFromCard: +0
// };
// updateStats(card2, '2024-01-03');
```


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
}

const initialCards: CardData[] = [
    {
        title: 'Expand Refinery Capacity',
        description: 'Invest £1M to boost production. This reduces bottlenecks and increases long-term profitability.',
        image: 'https://loremflickr.com/600/800/factory',
        effects: {
            moneyChangeFromCard: 1000000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Upgrade Emission Filters',
        description: 'Spend £700k to install advanced emission filters, improving environmental performance.',
        image: 'https://loremflickr.com/600/800/smokestack',
        effects: {
            moneyChangeFromCard: 700000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Trade Carbon Credits',
        description: 'Purchase 2 carbon credits (min) at £300k each to improve your Environmental Impact Score.',
        image: 'https://loremflickr.com/600/800/forest',
        effects: {
            moneyChangeFromCard: 600000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    },
    {
        title: 'Invest in Hydrogen Tech',
        description: 'Spend £600k in R&D to boost Environmental Impact Score and Patent Portfolio Value.',
        image: 'https://loremflickr.com/600/800/windmill',
        effects: {
            moneyChangeFromCard: 600000,
            opinionChangeFromCard: 0,
            riskChangeFromCard: 0,
            numIPsFromCard: 0,
            ipValueChangeFromCard: 0
        }
    }
];

export const cards = writable<CardData[]>(initialCards);
```


## frontend\src\routes\stats\+page.svelte

```svelte
<!-- frontend\src\routes\stats\+page.svelte -->

<script>
    import { ColorType, CrosshairMode } from 'lightweight-charts';
    import { Chart, CandlestickSeries } from 'svelte-lightweight-charts';
    import { candlestickDataStore } from '$lib/stores/stats';

    let windowWidth = window.innerWidth;

    function handleResize() {
        windowWidth = window.innerWidth;
    }

    $: options = {
        width: windowWidth,
        height: 300,
        layout: {
            background: {
                type: ColorType.Solid,
                color: '#000000',
            },
            textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
            vertLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
            horzLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
    };
</script>

<div style="width: 100%">
    <Chart {...options}>
        <CandlestickSeries
            data={$candlestickDataStore}
            upColor="rgba(255, 144, 0, 1)"
            downColor="#000"
            borderDownColor="rgba(255, 144, 0, 1)"
            borderUpColor="rgba(255, 144, 0, 1)"
            wickDownColor="rgba(255, 144, 0, 1)"
            wickUpColor="rgba(255, 144, 0, 1)"
        />
    </Chart>
</div>

<svelte:window on:resize={handleResize} />
```

