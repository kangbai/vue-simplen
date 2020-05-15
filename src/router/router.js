import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue' // 主页
import Login from '../views/Login'  // 登录页
import { WarriorRole, Kai, Libai, AssassinRole } from '../modules' // 模块中的菜单页

Vue.use(Router)

// 定位router配置结构
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/assassinRole',
                    name: 'AssassinRole',
                    component: AssassinRole
                },
                {
                    path: '/kai',
                    name: 'kai',
                    component: Kai
                },
                {
                    path: '/warriorRole',
                    name: 'warriorRole',
                    component: WarriorRole
                },
                {
                    path: '/libai',
                    name: 'libai',
                    component: Libai
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
        //   }
    ]
})