<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <div class="home_title">毕业设计管理系统</div>
      <div class="home_title-right"><i class="el-icon-user-solid"></i> 你好，{{ user }}</div>
    </el-header>
    <el-container>

      <el-aside width="200px" class="home_aside">
        <el-menu class="home_menu" router background-color="#c8ede5" text-color="#176175" active-text-color="#f88f3d">
          <el-submenu index="0">
            <template slot="title"><i class="el-icon-user" style="color:#257b93"></i>教师模块</template>
            <el-menu-item index="/">
              <div>
                <i class="el-icon-s-custom"></i>教师管理
              </div>
            </el-menu-item>
            <el-menu-item index="/">
              <div>
                <i class="el-icon-circle-plus"></i>添加教师
              </div>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user" style="color:#257b93"></i>学生模块</template>
            <el-menu-item index="/">
              <div>
                <i class="el-icon-s-custom"></i>学生管理
              </div>
            </el-menu-item>
            <el-menu-item index="/">
              <div>
                <i class="el-icon-circle-plus"></i>添加学生
              </div>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-user" style="color:#257b93"></i>课题模块</template>
            <el-menu-item index="/">
              <div>
                <i class="el-icon-s-custom"></i>课题管理
              </div>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-user" style="color:#257b93"></i>任务书模块</template>
            <el-menu-item index="/">
              <div>
                <i class="el-icon-s-custom"></i>任务书管理
              </div>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-user" style="color:#257b93"></i>论文模块</template>
            <el-menu-item index="/">
              <div>
                <i class="el-icon-s-custom"></i>论文管理
              </div>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-order" style="color:#257b93"></i>公告模块</template>
            <el-menu-item index="/">
              <div>
                <i class="el-icon-s-order"></i>公告管理
              </div>
            </el-menu-item>
            <el-menu-item index="/">
              <div>
                <i class="el-icon-circle-plus"></i>添加公告
              </div>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/TeacherTeacherSelf">
            <div>
              <i class="el-icon-user-solid"></i>个人信息管理
            </div>
          </el-menu-item>
          <el-menu-item index="/TeacherChange">
            <div>
              <i class="el-icon-key"></i>修改密码
            </div>
          </el-menu-item>
          <el-menu-item>
            <div @click="logout">
              <i class="el-icon-s-tools"></i>退出登录
            </div>
          </el-menu-item>
        </el-menu>

      </el-aside>

      <el-container class="el-container-right">
        <el-main class="home_main">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/teacherHome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <router-view/>
        </el-main>
        <!--        <el-footer class="home_footer"></el-footer>-->
        <el-footer class="home_footer">Copyright © 2022 Peter Cheung 保留所有权利</el-footer>
      </el-container>

    </el-container>

  </el-container>
</template>

<script>
export default {
  name: "TeacherHome",
  created() {
    const _this = this;
    axios.get('http://localhost:8081/teacher/' + sessionStorage.getItem('teacherId')).then(function (resp) {
      _this.user = resp.data.data.teacherName;
    })
  },
  methods: {
    logout() {
      sessionStorage.removeItem('teacherId');
      this.$router.push('/login') // 返回登录页面
    }
  },
  data() {
    return {
      user: '用户名登录后显示'
    }
  }
}
</script>

<style scoped>

</style>