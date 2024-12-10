import Swiper from './routes/swiper/+page.svelte'
import Workspace from './routes/workspace/+page.svelte' 
import Login from './routes/login/+page.svelte'
import Projects from './routes/projects/+page.svelte'
import Map from './routes/map/+page.svelte'
import Stats from './routes/stats/+page.svelte'

const routes = {
    // Exact path
    '/swiper': Swiper,

    '/workspace': Workspace,

    '/login': Login,

    '/projects': Projects,

    '/map': Map,

    '/stats': Stats,


    // Catch-all
    // This is optional, but if present it must be the last
    //TODO not found page
    //'*': NotFound,
}