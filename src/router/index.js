import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/admin/Home'
import Login from "../views/Login";
import Reg from "../views/Reg"
import Change from "../views/admin/admin/Change";
import AdminSelf from "../views/admin/admin/AdminSelf";
import AddStudent from "../views/admin/student/AddStudent";
import AddTeacher from "../views/admin/teacher/AddTeacher";
import AddAnnouncement from "../views/admin/announcement/AddAnnouncement";
import TeacherHome from "../views/teacher/TeacherHome";
import StudentHome from "../views/student/StudentHome";
import Announcement from "../views/admin/announcement/Announcement";
import EditAnnouncement from "../views/admin/announcement/EditAnnouncement";
import DetailAnnouncementId from "../views/admin/announcement/DetailAnnouncementId";

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
            },
            {
                path: '/EditAnnouncement',
                name: '修改公告',
                component: EditAnnouncement
            },
            {
                path: '/DetailAnnouncementId',
                name: '公告详情',
                component: DetailAnnouncementId
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
