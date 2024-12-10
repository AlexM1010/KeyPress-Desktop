import CardSwiper from './routes/cardSwiper/+page.svelte'
import Workspace from './routes/workspace/+page.svelte' 
import Login from './routes/login/+page.svelte'
import Projects from './routes/projects/+page.svelte'
import Map from './routes/map/+page.svelte'

const routes = {
    // Exact path
    '/cardSwiper': CardSwiper,

    '/workspace': Workspace,

    '/login': Login,

    '/projects': Projects,

    '/map': Map,


    // Catch-all
    // This is optional, but if present it must be the last
    //TODO not found page
    //'*': NotFound,
}