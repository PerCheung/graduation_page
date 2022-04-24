import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from "../views/Login";
import Reg from "../views/Reg"
import Change from "../views/Change";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '主页',
        component: Home,
        children: [
            {
                path: '/change',
                name: '修改密码',
                component: Change
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        component: Login
    },
    {
        path: '/reg',
        name: '管理员注册',
        component: Reg
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
