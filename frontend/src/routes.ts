import Home from './routes/+page.svelte'
import Login from './routes/login/+page.svelte'
import Workspace from './routes/workspace/+page.svelte'

const routes = {
    // Exact path
    '/': Home,

    // Using named parameters, with last being optional
    '/login': Login,

    // Wildcard parameter
    '/Worspace': Workspace,

    // Catch-all
    // This is optional, but if present it must be the last
    //'*': NotFound,
}