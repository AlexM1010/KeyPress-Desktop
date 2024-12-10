import CardSwiper from './routes/cardSwiper/+page.svelte'
import Workspace from './routes/workspace/+page.svelte' 
import Login from './routes/login/+page.svelte'
import Projects from './routes/projects/+page.svelte'

const routes = {
    // Exact path
    '/cardSwiper': CardSwiper,

    '/workspace': Workspace,

    '/login': Login,

    '/Projects': Projects,


    // Catch-all
    // This is optional, but if present it must be the last
    //TODO not found page
    //'*': NotFound,
}