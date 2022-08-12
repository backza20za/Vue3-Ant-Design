import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import HelloWorld from '../components/HelloWorld.vue'
import About from '../components/About.vue'
import Shop from '../pages/ShopPage.vue'
import Test from '../pages/testPage.vue'
import CheckCart from '../pages/CheckCart.vue'
import ConfirmOrderPage from '../pages/ConfirmOrderPage.vue'
import Complete from '../pages/Complete.vue'

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     name: 'home',
    //     component: HelloWorld,
    //     props: {
    //         msg: "Vite + Vue"
    //     }
    // },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/',
        name: 'shop',
        component: Shop
    },
    {
        path: '/test',
        name: 'test',
        component: Test
    },
    {
        path: '/checkcart',
        name: 'checkcart',
        component: CheckCart
    },
    {
        path: '/confirm',
        name: 'confirm',
        component: ConfirmOrderPage
    },
    {
        path: '/complete',
        name: 'complete',
        component: Complete
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router
