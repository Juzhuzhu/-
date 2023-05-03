import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from "@/views/LayOut/Layout.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "layout",
        component: Layout,
        redirect: "/fundList",
        children: [
            {
                path: "/fundList",
                name: "fundList",
                component: () => import("@/views/pages/FundList.vue")
            },
            {
                path: "/fundHistory",
                name: "fundHistory",
                component: () => import("@/views/pages/FundHistory.vue"),
            },
            {
                path: "/userInfo",
                name: "userInfo",
                component: () => import("@/views/pages/UserInfo.vue")
            },
            {
                path: "/fundOwn",
                name: "fundOwn",
                component: () => import("@/views/pages/FundOwn.vue")
            },
            {
                path: "/fundTransactionRecord",
                name: "fundTransactionRecord",
                component: () => import("@/views/pages/FundTransactionRecord.vue")
            },
        ]
    },
    {
        path: "/userResgister",
        name: "userResgister",
        component: () => import("@/views/pages/UserResgister.vue")
    },
    {
        path: "/userLogin",
        name: "userLogin",
        component: () => import("@/views/pages/UserLogin.vue")
    },
    {
        path: "/vueHeader",
        name: "vueHeader",
        component: () => import("@/views/pages/VueHeader.vue")
    },
    {
        path: "/vueFooter",
        name: "vueFooter",
        component: () => import("@/views/pages/VueFooter.vue")
    },
    {
        path: "/vueEcharts",
        name: "vueEcharts",
        component: () => import("@/views/pages/VueEcharts.vue")
    }

    /*{
        path: '/',
        name: 'home',
        component: HomeView
    },*/
    /*{
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/!* webpackChunkName: "about" *!/ '../views/AboutView.vue')
    }*/
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
