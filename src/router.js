import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/Index";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/register',
            component: () => import('./views/Register.vue')
        }
    ]

})