import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('../views/listPage')
    },
    {
        path: '/video',
        name: 'video',
        component: () => import('../views/mediaPage/videoPage.vue')
    },
    {
        path: '/audio',
        name: 'audio',
        component: () => import('../views/mediaPage/audioPage.vue')
    }


]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router
