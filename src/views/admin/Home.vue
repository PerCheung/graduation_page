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
            <el-menu-item index="/Teacher">
              <div>
                <i class="el-icon-s-custom"></i>教师管理
              </div>
            </el-menu-item>
            <el-menu-item index="/AddTeacher">
              <div>
                <i class="el-icon-circle-plus"></i>添加教师
              </div>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user" style="color:#257b93"></i>学生模块</template>
            <el-menu-item index="/Student">
              <div>
                <i class="el-icon-s-custom"></i>学生管理
              </div>
            </el-menu-item>
            <el-menu-item index="/AddStudent">
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
            <el-menu-item index="/Announcement">
              <div>
                <i class="el-icon-s-order"></i>公告管理
              </div>
            </el-menu-item>
            <el-menu-item index="/AddAnnouncement">
              <div>
                <i class="el-icon-circle-plus"></i>添加公告
              </div>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/self">
            <div>
              <i class="el-icon-user-solid"></i>个人信息管理
            </div>
          </el-menu-item>
          <el-menu-item index="/change">
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
            <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
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
  name: 'Home',
  created() {
    const _this = this;
    axios.get('http://localhost:8081/adminUser/' + sessionStorage.getItem('userId')).then(function (resp) {
      _this.user = resp.data.data.username + resp.data.data.userTitle;
    })
  },
  methods: {
    logout() {
      sessionStorage.removeItem('userId');
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

<style>
.home_container {
  background-image: url('../../../public/index.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.home_header {
  background-color: transparent;
  color: #176175;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home_aside {
  background-color: #cbede6;
  font-weight: bold;
}

.home_menu {
  background-color: #d5eff0;
  color: black;
}

.home_footer {
  background-color: transparent;
  text-align: center;
  color: rgb(142, 142, 145);
  font-size: 16px;
  line-height: 60px;
}

.home_title {
  font-size: 22px;
  display: inline;
  font-weight: bold;
}

.home_title-right {
  font-size: 22px;
  display: inline;
  color: rgb(67, 66, 141);
}

.el-container-right {
  background-image: url('../../../public/index.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.page {
  position: fixed;
  top: 86%;
  right: 42px;
}
</style>
