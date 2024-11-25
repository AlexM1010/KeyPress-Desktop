# Project Structure

```
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
              _layout.BV1eDtrG.css
              _page.36-9_pK0.css
              _page.BJBHtx96.css
              _page.BNycyc62.css
              _page.m_pLI9GB.css
              0.BV1eDtrG.css
              3.BJBHtx96.css
              5.m_pLI9GB.css
              6.BNycyc62.css
              7.Co9-7YXI.css
              app.D_aG9ZOu.css
              app.WwPxDZCr.css
              index.ClDAMRJ0.css
              index.QFJUY_zM.css
              TabTitle.DkLMgb21.css
            chunks/
              _commonjsHelpers.Cpj98o6Y.js
              app.Dh-y9kT8.js
              auth.B8Ak1aWU.js
              each.D0XyKZab.js
              entry.CS5qv4qk.js
              Icon.BNpoi0Xt.js
              index.C7zrzFyH.js
              index.Dj6IOiTi.js
              index.DnNGxOjv.js
              index.DzKBWKP6.js
              paths.nmOmiXfw.js
              scheduler.CFCdHd8R.js
              spread.CgU5AtxT.js
              stores.BRkO09KX.js
              TabTitle.BLPg-KCE.js
            entry/
              app.DZ_iyto1.js
              start.CfdtWq5N.js
            nodes/
              0.n68oQEqQ.js
              1.DSDNDxzg.js
              2.BHWytcdy.js
              3.CrVu5mMq.js
              4.B37gbcxi.js
              5.3m0LKCqm.js
              6.BXtrRJFo.js
              7.t3amok5R.js
          version.json
        .vite/
          manifest.json
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
        favicon.png
      prerendered/
        dependencies/
          _app/
            env.js
        pages/
          index.html
          login.html
          profile.html
          projects.html
          workspace.html
      server/
        _app/
          immutable/
            assets/
              _layout.BV1eDtrG.css
              _page.36-9_pK0.css
              _page.BJBHtx96.css
              _page.BNycyc62.css
              _page.m_pLI9GB.css
              app.WwPxDZCr.css
              index.QFJUY_zM.css
              TabTitle.DkLMgb21.css
        .vite/
          manifest.json
        chunks/
          app.js
          auth.js
          client.js
          exports.js
          Icon.js
          index.js
          index2.js
          internal.js
          names.js
          paths.js
          projects.js
          ssr.js
          stores.js
          TabTitle.js
          theme.js
          utils.js
        entries/
          fallbacks/
            error.svelte.js
          pages/
            login/
              _page.svelte.js
            profile/
              _page.svelte.js
            projects/
              _slug_/
                _page.svelte.js
                _page.ts.js
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
          design/
          login/
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
          workspace/
            [userId]/
            $types.d.ts
          $types.d.ts
      route_meta_data.json
    ambient.d.ts
    non-ambient.d.ts
    tsconfig.json
  src/
    Data/
    lib/
      assets/
        logo-no-background.png
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
            Button.svelte
            ButtonGroup.svelte
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
        ui/
          button/
            button.svelte
            index.ts
          checkbox/
            checkbox.svelte
            index.ts
          form/
            form-button.svelte
            form-description.svelte
            form-element-field.svelte
            form-field-errors.svelte
            form-field.svelte
            form-fieldset.svelte
            form-label.svelte
            form-legend.svelte
            index.ts
          input/
            index.ts
            input.svelte
          label/
            index.ts
            label.svelte
          slider/
            index.ts
            slider.svelte
          toggle/
            index.ts
            toggle.svelte
          toggle-group/
            index.ts
            toggle-group-item.svelte
            toggle-group.svelte
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
        nodes.ts
        theme.ts
      theme/
      types/
        block.ts
        edge.ts
        manifest.ts
        nodeProps.ts
        tailwind.ts
      utils/
        colors.ts
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
      profile/
        +page.svelte
      projects/
        [slug]/
          +page.svelte
          +page.ts
        +page.svelte
      workspace/
        utils/
          utils.ts
        +page.svelte
        ConnectionLine.svelte
        CustomEdge.svelte
        DnDProvider.svelte
        Flow.svelte
        Sidebar.svelte
      +layout.svelte
      +layout.ts
      +page.svelte
      ThemeToggle.svelte
    app.css
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
    favicon.png
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


## frontend\src\lib\components\customNodes\MouseClickNode.svelte

```svelte
<!-- MouseClickNode.svelte -->
<script lang="ts">
    import { Position } from "@xyflow/svelte";
    import type { ComponentType } from 'svelte';
    import { MousePointer, ChevronDown } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import Checkbox from "./nodeComponents/Checkbox.svelte";
    import ButtonGroup from "./nodeComponents/ButtonGroup.svelte";
    import TimeInput from "./nodeComponents/TimeInput.svelte";
    import NumberInput from './nodeComponents/NumberInput.svelte';
    import type { HandleConfig } from './types';
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";

    // Move types inside main script
    type ButtonType = 'left' | 'middle' | 'right';
    type ScrollDirection = 'Vertical' | 'Horizontal';

    interface MouseClickTaskData {
        buttonType: ButtonType;
        numberOfClicks: number;
        clickDelay: number;
        pressReleaseDelay: number;
        releaseAfterPress: boolean;
        scrollDirection: ScrollDirection[];
        scrollLines: number;
    }

    export let id: string;
    export let title: string = 'Mouse Click';
    export let icon: ComponentType = MousePointer;
    export let color: string = 'bg-gradient-to-r from-blue-500 to-blue-600 bg-opacity-75'; // Custom header color 
    export let highlightColor: string = 'bg-blue-500 bg-opacity-75'; // Custom highlight color with partial transparency

    const BUTTON_TYPES: ButtonType[] = ['left', 'middle', 'right'];
    const SCROLL_DIRECTIONS: ScrollDirection[] = ['Vertical', 'Horizontal'];

    // Simplified data initialization
    export let data: MouseClickTaskData = {
        buttonType: 'left',
        numberOfClicks: 1,
        clickDelay: 0.1,
        pressReleaseDelay: 100,
        releaseAfterPress: true,
        scrollDirection: ['Vertical'],
        scrollLines: 0
    };

    // Add reactive statement for data consistency
    $: {
        if (data?.buttonType == null) data.buttonType = 'left';
        if (data?.numberOfClicks == null) data.numberOfClicks = 1;
        if (data?.clickDelay == null) data.clickDelay = 0.1;
        if (data?.pressReleaseDelay == null) data.pressReleaseDelay = 100;
        if (data?.releaseAfterPress == null) data.releaseAfterPress = true;
        if (data?.scrollDirection == null || !Array.isArray(data.scrollDirection)) {
            data.scrollDirection = ['Vertical'];
        }
        if (data?.scrollLines == null) data.scrollLines = 0;
    }

    // Local UI state
    let showAdvanced = false;

    // Debug logging for data changes
    $: console.log('MouseClickNode data:', JSON.stringify(data));

    const NODE_HANDLES: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    // Event Handlers
    function handleDuplicate(): void {
        console.log("Duplicate action triggered", JSON.stringify(data));
    }

    function handleDelete(): void {
        console.log("Delete action triggered", JSON.stringify(data));
    }

    /**
     * Toggles a scroll direction in the configuration
     * @param direction - The scroll direction to toggle
     */
    function toggleDirection(direction: ScrollDirection): void {
        data.scrollDirection = data.scrollDirection ?? [];
        if (data.scrollDirection.includes(direction)) {
            data.scrollDirection = data.scrollDirection.filter(d => d !== direction);
        } else {
            data.scrollDirection.push(direction);
        }
    }

    /**
     * Updates the button type in the configuration
     * @param newType - The new button type to set
     */
    function updateButtonType(newType: ButtonType): void {
        data.buttonType = newType;
    }

    /**
     * Toggles the advanced options visibility
     */
    function toggleAdvancedOptions(): void {
        showAdvanced = !showAdvanced;
    }
</script>

<NodeWrapper
    {id}
    {icon}
    {title}
    {color}
    type="Click"
    handles={NODE_HANDLES}
    bind:data
    on:duplicate={handleDuplicate}
    on:delete={handleDelete}
>
    <div class="grid gap-6">
        <!-- Button Type Selection -->
        <ToggleGroup.Root size="lg" type="multiple">
            <ToggleGroup.Item value="bg-blue-500" aria-label="Toggle bold">
              Left
            </ToggleGroup.Item>
            <ToggleGroup.Item value="italic" aria-label="Toggle italic">
              Middle
            </ToggleGroup.Item>
            <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
              Right
            </ToggleGroup.Item>
          </ToggleGroup.Root>
    
        <ButtonGroup 
            labels={["left","middle","right"]}
            variant="default"
            highlightColor={highlightColor}
            active={data.buttonType === data.buttonType}
            onClick={() => updateButtonType(data.buttonType)}
            disabled={false}
        />

        <!-- Click Configuration -->
        <div class="grid gap-6 auto-rows-min">
            <!-- Click Count and Delay Configuration -->
            <div class="flex justify-between items-center gap-2">
                <NumberInput
                    label="Clicks"
                    bind:value={data.numberOfClicks}
                    minValue={0} 
                    maxValue={1000}
                />
                {#if data?.numberOfClicks > 1}
                    <TimeInput 
                        label="delay" 
                        bind:value={data.clickDelay}
                        defaultValue={0.1}
                    />
                {/if}
            </div>
        
            <div class="flex justify-between items-center gap-2">
                <Checkbox
                    label="Release"
                    bind:checked={data.releaseAfterPress}
                />
                {#if data?.releaseAfterPress}
                    <TimeInput 
                        label="after" 
                        bind:value={data.pressReleaseDelay}
                        defaultValue={0.1}
                    />
                {/if}
            </div>
        </div>
        
        <!-- Advanced Options Section -->
        <div class="pt-4">
            <button
                class="flex items-center justify-between w-full text-sm text-[--secondary-text] hover:text-[--secondary-text-hover] transition-colors"
                on:click={toggleAdvancedOptions}
                aria-expanded={showAdvanced}
            >
                <span>Scroll Options</span>
                <ChevronDown
                    class="w-4 h-4 transition-transform duration-200"
                    style={showAdvanced ? "transform: rotate(180deg)" : ""}
                />
            </button>

            {#if showAdvanced}
                <div class="mt-4 grid gap-6">
                    <!-- Scroll Direction Selection add default={data.scrollDirection}}-->
                    <ButtonGroup 
                        labels={['Vertical','Horizontal']}
                        variant="default"
                        highlightColor={highlightColor}
                        active={data.scrollDirection === data.scrollDirection}
                        onClick={() => toggleDirection('Vertical')}
                        disabled={false}
                    />
                    
                    <!-- Scroll Lines Input -->
                    <NumberInput
                        label="Lines"
                        bind:value={data.scrollLines}
                        minValue={-100000}
                        maxValue={100000}
                    />
                </div>
            {/if}
        </div>
    </div>
</NodeWrapper>
```


## frontend\src\lib\components\ui\toggle-group\toggle-group-item.svelte

```svelte
<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
	import { type ToggleVariants, getToggleGroupCtx } from "./index.js";
	import { cn } from "$lib/utils.js";
	import { toggleVariants } from "$lib/components/ui/toggle/index.js";

	type $$Props = ToggleGroupPrimitive.ItemProps & ToggleVariants;

	let className: string | undefined | null = undefined;

	export { className as class };
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let value: $$Props["value"];

	const ctx = getToggleGroupCtx();
</script>

<ToggleGroupPrimitive.Item
	class={cn(
		toggleVariants({
			variant: ctx.variant || variant,
			size: ctx.size || size,
		}),
		className
	)}
	{value}
	{...$$restProps}
>
	<slot />
</ToggleGroupPrimitive.Item>
```


## frontend\src\lib\components\ui\toggle-group\toggle-group.svelte

```svelte
<script lang="ts">
	import type { VariantProps } from "tailwind-variants";
	import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
	import { setToggleGroupCtx } from "./index.js";
	import type { toggleVariants } from "$lib/components/ui/toggle/index.js";
	import { cn } from "$lib/utils.js";

	type T = $$Generic<"single" | "multiple">;
	type $$Props = ToggleGroupPrimitive.Props<T> & VariantProps<typeof toggleVariants>;

	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let value: $$Props["value"] = undefined;

	setToggleGroupCtx({
		variant,
		size,
	});
</script>

<ToggleGroupPrimitive.Root
	class={cn("flex items-center justify-center gap-1", className)}
	bind:value
	{...$$restProps}
	let:builder
>
	<slot {builder} />
</ToggleGroupPrimitive.Root>
```


## frontend\src\lib\components\ui\toggle\toggle.svelte

```svelte
<script lang="ts">
	import { Toggle as TogglePrimitive } from "bits-ui";
	import { type Size, type Variant, toggleVariants } from "./index.js";
	import { cn } from "$lib/utils.js";

	type $$Props = TogglePrimitive.Props & {
		variant?: Variant;
		size?: Size;
	};
	type $$Events = TogglePrimitive.Events;

	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let pressed: $$Props["pressed"] = undefined;
	export { className as class };
</script>

<TogglePrimitive.Root
	bind:pressed
	class={cn(toggleVariants({ variant, size, className }))}
	{...$$restProps}
	on:click
>
	<slot />
</TogglePrimitive.Root>
```

