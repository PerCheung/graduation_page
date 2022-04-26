import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from "../views/Login";
import Reg from "../views/Reg"
import Change from "../views/Change";
import AdminSelf from "../views/AdminSelf";
import AddStudent from "../views/AddStudent";
import AddTeacher from "../views/AddTeacher";
import AddAnnouncement from "../views/AddAnnouncement";
import TeacherHome from "../views/TeacherHome";
import StudentHome from "../views/StudentHome";
import Announcement from "../views/Announcement";

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
            },
            {
                path: '/self',
                name: '个人信息',
                component: AdminSelf
            },
            {
                path: '/AddTeacher',
                name: '添加教师',
                component: AddTeacher
            },
            {
                path: '/AddStudent',
                name: '添加学生',
                component: AddStudent
            },
            {
                path: '/AddAnnouncement',
                name: '添加公告',
                component: AddAnnouncement
            },
            {
                path: '/Announcement',
                name: '公告管理',
                component: Announcement
            }
        ]
    },
    {
        path: '/teacherHome',
        name: '教师主页',
        component: TeacherHome
    },
    {
        path: '/studentHome',
        name: '学生主页',
        component: StudentHome
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
