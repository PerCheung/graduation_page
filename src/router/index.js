import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/admin/Home'
import Login from "../views/Login"
import Reg from "../views/Reg"
import Change from "../views/admin/admin/Change"
import AdminSelf from "../views/admin/admin/AdminSelf"
import AddStudent from "../views/admin/student/AddStudent"
import AddTeacher from "../views/admin/teacher/AddTeacher"
import AddAnnouncement from "../views/admin/announcement/AddAnnouncement"
import TeacherHome from "../views/teacher/TeacherHome"
import StudentHome from "../views/student/StudentHome"
import Announcement from "../views/admin/announcement/Announcement"
import EditAnnouncement from "../views/admin/announcement/EditAnnouncement"
import DetailAnnouncement from "../views/admin/announcement/DetailAnnouncement"
import Teacher from "../views/admin/teacher/Teacher"
import Student from "../views/admin/student/Student"
import TeacherTeacherSelf from "../views/teacher/teacher/TeacherTeacherSelf"
import TeacherChange from "../views/teacher/teacher/TeacherChange"
import StudentStudentSelf from "../views/student/student/StudentStudentSelf"
import StudentChange from "../views/student/student/StudentChange"
import StudentAnnouncement from "../views/student/announcement/StudentAnnouncement"
import TeacherAnnouncement from "../views/teacher/announcement/TeacherAnnouncement"
import StudentDetailAnnouncement from "../views/student/announcement/StudentDetailAnnouncement"
import TeacherDetailAnnouncement from "../views/teacher/announcement/TeacherDetailAnnouncement"
import EditStudent from "../views/admin/student/EditStudent"
import DetailStudent from "../views/admin/student/DetailStudent"
import DetailTeacher from "../views/admin/teacher/DetailTeacher"
import EditTeacher from "../views/admin/teacher/EditTeacher"

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
                name: '个人信息管理',
                component: AdminSelf
            },
            {
                path: '/AddTeacher',
                name: '添加教师',
                component: AddTeacher
            },
            {
                path: '/Teacher',
                name: '教师管理',
                component: Teacher
            }, {
                path: '/EditTeacher',
                name: '编辑教师信息',
                component: EditTeacher
            }
            , {
                path: '/DetailTeacher',
                name: '教师详情',
                component: DetailTeacher
            },
            {
                path: '/AddStudent',
                name: '添加学生',
                component: AddStudent
            }, {
                path: '/EditStudent',
                name: '编辑学生信息',
                component: EditStudent
            }, {
                path: '/Student',
                name: '学生管理',
                component: Student
            },
            {
                path: '/DetailStudent',
                name: '学生详情',
                component: DetailStudent
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
                path: '/DetailAnnouncement',
                name: '公告详情',
                component: DetailAnnouncement
            }
        ]
    },
    {
        path: '/teacherHome',
        name: '教师主页',
        component: TeacherHome,
        children: [
            {
                path: '/TeacherTeacherSelf',
                name: '教师主页-个人信息管理',
                component: TeacherTeacherSelf
            },
            {
                path: '/TeacherChange',
                name: '教师主页-密码修改',
                component: TeacherChange
            },
            {
                path: '/TeacherAnnouncement',
                name: '教师主页-查看公告',
                component: TeacherAnnouncement
            },
            {
                path: '/TeacherDetailAnnouncement',
                name: '教师主页-公告详情',
                component: TeacherDetailAnnouncement
            }
        ]
    },
    {
        path: '/studentHome',
        name: '学生主页',
        component: StudentHome,
        children: [
            {
                path: '/StudentStudentSelf',
                name: '学生主页-个人信息管理',
                component: StudentStudentSelf
            }
            ,
            {
                path: '/StudentChange',
                name: '学生主页-密码修改',
                component: StudentChange
            },
            {
                path: '/StudentAnnouncement',
                name: '学生主页-查看公告',
                component: StudentAnnouncement
            },
            {
                path: '/StudentDetailAnnouncement',
                name: '学生主页-公告详情',
                component: StudentDetailAnnouncement
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
