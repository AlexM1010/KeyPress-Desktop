# Project Structure

```
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
              _page.BJBHtx96.css
              _page.DaQuEYxn.css
              0.BV1eDtrG.css
              3.BJBHtx96.css
              5.Cs6M6ujV.css
              app.BTluaUof.css
            chunks/
              app.Q1xerR2v.js
              authStore.DTqfI7D6.js
              entry.6jmqBCzA.js
              index.C79tyDXt.js
              index.CgJ4Vtcs.js
              index.fj6TnTDp.js
              scheduler.DWEMLbLY.js
              spread.CgU5AtxT.js
              themeStore.CaMUHd6Z.js
            entry/
              app.DxIk16P2.js
              start.DBJXlKPd.js
            nodes/
              0.4fMiI712.js
              1.Cf7hLTaq.js
              2.BFDTnsxr.js
              3.BP9jKv59.js
              4.CYfhxk-s.js
              5.Vj3NDM0P.js
          version.json
        .vite/
          manifest.json
        favicon.png
      prerendered/
        dependencies/
          _app/
            env.js
        pages/
          index.html
          login.html
          profile.html
          workspace.html
      server/
        _app/
          immutable/
            assets/
              _layout.BV1eDtrG.css
              _page.BJBHtx96.css
              _page.DaQuEYxn.css
              app.BTluaUof.css
        .vite/
          manifest.json
        chunks/
          authStore.js
          client.js
          exports.js
          index.js
          index2.js
          internal.js
          names.js
          ssr.js
          themeStore.js
        entries/
          fallbacks/
            error.svelte.js
          pages/
            login/
              _page.svelte.js
            profile/
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
      stores/
        authStore.ts
        nodesStore.ts
        themeStore.ts
      theme/
      types/
        block.ts
        edge.ts
        manifest.ts
        nodeProps.ts
        tailwind.ts
      utils/
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
      index.ts
      utils.ts
    routes/
      login/
        +page.svelte
        login.scss
        Login.svelte
        schema.ts
      profile/
        +page.svelte
      workspace/
        +page.svelte
        ConnectionLine.svelte
        CustomEdge.svelte
        DnDProvider.svelte
        Flow.svelte
        Sidebar.svelte
        utils.ts
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


## frontend\src\lib\components\customNodes\MouseMoveNode.svelte

```svelte
<!-- MouseMoveNode.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { Position } from "@xyflow/svelte";
    import type { ComponentType } from 'svelte';

    // UI Component imports
    import { MousePointer2, ChevronDown } from 'lucide-svelte';
    import NodeWrapper from './nodeComponents/NodeWrapper.svelte';
    import Checkbox from "./nodeComponents/Checkbox.svelte";
    import NumberInput from './nodeComponents/NumberInput.svelte';

    // Type imports
    import type { HandleConfig } from './types';

    // Default configuration constants
    const DEFAULT_MOVE_SPEED = 500; // milliseconds
    const DEFAULT_VARIANCE = 20; // percentage
    const MIN_COORDINATE = -10000;
    const MAX_COORDINATE = 10000;
    const MIN_SPEED = 100;
    const MAX_SPEED = 5000;
    const MIN_VARIANCE = 0;
    const MAX_VARIANCE = 100;

    type PositionType = 'Current Cursor' | 'Fixed Position';
    type PathType = 'Straight Line' | 'Human-like' | 'Custom Recorded';
    type SpeedType = 'Instant' | 'Human-like';

    interface Coordinates {
        x: number;
        y: number;
    }

    interface Data {
        startPosition: {
            type: PositionType;
            coordinates: Coordinates;
        };
        endPosition: {
            type: PositionType;
            coordinates: Coordinates;
        };
        showMovementSettings: boolean;
        dragWhileMoving: boolean;
        speed: {
            type: SpeedType;
            value: number;
            randomize: boolean;
            variance: number;
        };
        pathType: PathType;
        customPath: Coordinates[];
        isRecording: boolean;
    }

    // Default data structure
    const defaultData: Data = {
        startPosition: {
            type: 'Current Cursor' as PositionType,
            coordinates: { x: 0, y: 0 }
        },
        endPosition: {
            type: 'Fixed Position' as PositionType,
            coordinates: { x: 0, y: 0 }
        },
        showMovementSettings: false,
        dragWhileMoving: false,
        speed: {
            type: 'Human-like' as SpeedType,
            value: DEFAULT_MOVE_SPEED,
            randomize: false,
            variance: DEFAULT_VARIANCE
        },
        pathType: 'Straight Line' as PathType,
        customPath: [],
        isRecording: false
    };

    // Component props
    export let id: string;
    export let title: string = 'Mouse Move';
    export let icon: ComponentType = MousePointer2;
    export let color: string = 'bg-gradient-to-r from-green-500 to-green-600';
    export let data: Data = {
        startPosition: {
            type: 'Current Cursor',
            coordinates: { x: 0, y: 0 }
        },
        endPosition: {
            type: 'Fixed Position',
            coordinates: { x: 0, y: 0 }
        },
        showMovementSettings: false,
        dragWhileMoving: false,
        speed: {
            type: 'Human-like',
            value: DEFAULT_MOVE_SPEED,
            randomize: false,
            variance: DEFAULT_VARIANCE
        },
        pathType: 'Straight Line',
        customPath: [],
        isRecording: false
    };

    // Handle configurations
    const handles: HandleConfig[] = [
        { id: "right", type: "source", position: Position.Right, offsetY: 50 },
        { id: "left", type: "target", position: Position.Left, offsetY: 50 },
    ];

    function handleDuplicate() {
        console.log("Duplicate action triggered");
    }

    function handleDelete() {
        console.log("Delete action triggered");
    }

    function toggleRecording() {
        if (!data?.isRecording) {
            data.customPath = [];
            data.pathType = 'Custom Recorded';
        }
        data.isRecording = !data?.isRecording;
    }

    const pathTypes: PathType[] = ['Straight Line', 'Human-like', 'Custom Recorded'];
    const speedTypes: SpeedType[] = ['Instant', 'Human-like'];
</script>

<NodeWrapper
    id={id}
    {icon}
    {title}
    {color}
    type="Move"
    {handles}
    bind:data
    on:duplicate={handleDuplicate}
    on:delete={handleDelete}
>
    <div class="grid gap-6">
        <!-- Start Position Configuration -->
        <div class="grid gap-4">
            <h3 class="text-sm font-medium text-gray-700">Start Position</h3>
            <div class="flex border rounded-lg overflow-hidden">
                <button
                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                        {data?.startPosition?.type === 'Current Cursor' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        first:rounded-l-lg"
                    on:click={() => data.startPosition.type = 'Current Cursor'}
                >
                    Current Cursor
                </button>
                <button 
                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                        {data?.startPosition?.type === 'Fixed Position' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        border-l last:rounded-r-lg"
                    on:click={() => data.startPosition.type = 'Fixed Position'}
                >
                    Fixed Position
                </button>
            </div>
            
            {#if data?.startPosition?.type === 'Fixed Position'}
                <div class="grid grid-cols-2 gap-4">
                    <NumberInput
                        label="X Coordinate"
                        bind:value={data.startPosition.coordinates.x}
                        minValue={MIN_COORDINATE}
                        maxValue={MAX_COORDINATE}
                    />
                    <NumberInput
                        label="Y Coordinate"
                        bind:value={data.startPosition.coordinates.y}
                        minValue={MIN_COORDINATE}
                        maxValue={MAX_COORDINATE}
                    />
                </div>
            {/if}
        </div>

        <!-- End Position Configuration -->
        <div class="grid gap-4">
            <h3 class="text-sm font-medium text-gray-700">End Position</h3>
            <div class="flex border rounded-lg overflow-hidden">
                <button
                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                        {data?.endPosition?.type === 'Fixed Position' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        first:rounded-l-lg"
                    on:click={() => data.endPosition.type = 'Fixed Position'}
                >
                    Fixed Position
                </button>
                <button 
                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                        {data?.endPosition?.type === 'Current Cursor' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                        border-l last:rounded-r-lg"
                    disabled={data?.startPosition?.type === 'Current Cursor'}
                    on:click={() => data.endPosition.type = 'Current Cursor'}
                >
                    Current Cursor
                </button>
            </div>
            
            {#if data?.endPosition?.type === 'Fixed Position'}
                <div class="grid grid-cols-2 gap-4">
                    <NumberInput
                        label="X Coordinate"
                        bind:value={data.endPosition.coordinates.x}
                        minValue={MIN_COORDINATE}
                        maxValue={MAX_COORDINATE}
                    />
                    <NumberInput
                        label="Y Coordinate"
                        bind:value={data.endPosition.coordinates.y}
                        minValue={MIN_COORDINATE}
                        maxValue={MAX_COORDINATE}
                    />
                </div>
            {/if}
        </div>

        <!-- Movement Settings -->
        <div class="border-t pt-4">
            <button
                class="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
                on:click={() => data.showMovementSettings = !data?.showMovementSettings}
                aria-expanded={data?.showMovementSettings}
            >
                <span>Movement Settings</span>
                <ChevronDown
                    class="w-4 h-4 transition-transform duration-200"
                    style={data?.showMovementSettings ? "transform: rotate(180deg)" : ""}
                />
            </button>

            {#if data?.showMovementSettings}
                <div class="mt-4 grid gap-6">
                    <!-- Drag Option -->
                    <Checkbox
                        label="Drag while moving"
                        bind:checked={data.dragWhileMoving}
                    />

                    <!-- Move Speed Configuration -->
                    <div class="grid gap-4">
                        <h4 class="text-sm font-medium text-gray-700">Move Speed</h4>
                        <div class="flex border rounded-lg overflow-hidden">
                            {#each speedTypes as type}
                                <button
                                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                                        {data?.speed?.type === type 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                                        {type !== speedTypes[0] ? 'border-l' : ''}
                                        first:rounded-l-lg last:rounded-r-lg"
                                    on:click={() => data.speed.type = type}
                                >
                                    {type}
                                </button>
                            {/each}
                        </div>

                        {#if data?.speed?.type === 'Human-like'}
                            <NumberInput
                                label="Speed (ms)"
                                bind:value={data.speed.value}
                                minValue={MIN_SPEED}
                                maxValue={MAX_SPEED}
                            />
                            <div class="space-y-2">
                                <Checkbox
                                    label="Randomize Speed"
                                    bind:checked={data.speed.randomize}
                                />
                                {#if data?.speed.randomize}
                                    <div class="pl-6">
                                        <NumberInput
                                            label="Variance %"
                                            bind:value={data.speed.variance}
                                            minValue={MIN_VARIANCE}
                                            maxValue={MAX_VARIANCE}
                                        />
                                    </div>
                                {/if}
                            </div>
                        {/if}
                    </div>

                    <!-- Path Type Configuration -->
                    <div class="grid gap-4">
                        <h4 class="text-sm font-medium text-gray-700">Path Type</h4>
                        <div class="flex border rounded-lg overflow-hidden">
                            {#each pathTypes as type}
                                <button
                                    class="flex-1 py-2 px-4 transition-colors duration-200 text-sm
                                        {data?.pathType === type 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                                        {type !== pathTypes[0] ? 'border-l' : ''}
                                        first:rounded-l-lg last:rounded-r-lg"
                                    on:click={() => data.pathType = type}
                                >
                                    {type}
                                </button>
                            {/each}
                        </div>
                        
                        {#if data?.pathType === 'Custom Recorded'}
                            <button
                                class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                                class:bg-red-500={data?.isRecording}
                                class:hover:bg-red-600={data?.isRecording}
                                on:click={toggleRecording}
                            >
                                {data?.isRecording ? 'Stop Recording' : 'Start Recording'}
                            </button>
                            {#if data?.customPath.length > 0}
                                <p class="text-sm text-gray-600">
                                    Recorded points: {data?.customPath.length}
                                </p>
                            {/if}
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</NodeWrapper>
```


## frontend\src\lib\components\customNodes\nodeComponents\ButtonGroup.svelte

```svelte
<!-- Button.svelte -->
<script lang="ts">
    export let active: boolean = false;
    export let first: boolean = false;
    export let last: boolean = false;
    export let borderLeft: boolean = false;
    export let disabled: boolean = false;
    export let fullWidth: boolean = true;
    export let variant: 'default' | 'danger' = 'default';
    
    $: buttonClass = [
        'py-2 px-4 transition-colors duration-200 text-sm',
        fullWidth ? 'flex-1' : '',
        active ? getActiveClass() : getInactiveClass(),
        borderLeft ? 'border-l' : '',
        first ? 'rounded-l-lg' : '',
        last ? 'rounded-r-lg' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
    ].filter(Boolean).join(' ');

    function getActiveClass(): string {
        if (variant === 'danger') {
            return 'bg-red-500 text-white hover:bg-red-600';
        }
        return 'bg-blue-500 text-white';
    }

    function getInactiveClass(): string {
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
    }
</script>

<button
    class={buttonClass}
    on:click
    {disabled}
>
    <slot />
</button>
```


## frontend\src\lib\components\customNodes\nodeComponents\Button.svelte

```svelte
<!-- Button.svelte -->
<script lang="ts">
    export let active: boolean = false;
    export let first: boolean = false;
    export let last: boolean = false;
    export let borderLeft: boolean = false;
    export let disabled: boolean = false;
    export let fullWidth: boolean = true;
    export let variant: 'default' | 'danger' = 'default';
    
    $: buttonClass = [
        'py-2 px-4 transition-colors duration-200 text-sm',
        fullWidth ? 'flex-1' : '',
        active ? getActiveClass() : getInactiveClass(),
        borderLeft ? 'border-l' : '',
        first ? 'rounded-l-lg' : '',
        last ? 'rounded-r-lg' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
    ].filter(Boolean).join(' ');

    function getActiveClass(): string {
        if (variant === 'danger') {
            return 'bg-red-500 text-white hover:bg-red-600';
        }
        return 'bg-blue-500 text-white';
    }

    function getInactiveClass(): string {
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
    }
</script>

<button
    class={buttonClass}
    on:click
    {disabled}
>
    <slot />
</button>
```

