<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <div class="home_title">毕业设计管理系统</div>
      <div class="home_title-right"><i class="el-icon-user-solid"></i> 你好，{{ user }}</div>
    </el-header>
    <el-container>

      <el-aside width="200px" class="home_aside">
        <el-menu class="home_menu" router background-color="#c8ede5" text-color="#176175" active-text-color="#f88f3d">
          <el-menu-item index="/StudentTopic">
            <div>
              <i class="el-icon-document"></i>未被选择的课题
            </div>
          </el-menu-item>
          <el-menu-item index="/StudentMyTopic">
            <div>
              <i class="el-icon-tickets"></i>我的课题
            </div>
          </el-menu-item>
          <el-menu-item index="/StudentUploadDocumentation">
            <div>
              <i class="el-icon-folder-opened"></i>提交过程文档
            </div>
          </el-menu-item>
          <el-menu-item index="/StudentUploadThesis">
            <div>
              <i class="el-icon-upload"></i>上传毕设
            </div>
          </el-menu-item>
          <el-menu-item index="/StudentMyThesis">
            <div>
              <i class="el-icon-collection"></i>我的毕设
            </div>
          </el-menu-item>
          <el-menu-item index="/StudentMyReply">
            <div>
              <i class="el-icon-discover"></i>我的答辩
            </div>
          </el-menu-item>
          <el-menu-item index="/StudentAnnouncement">
            <div>
              <i class="el-icon-s-order"></i>查看公告
            </div>
          </el-menu-item>
          <el-menu-item index="/StudentStudentSelf">
            <div>
              <i class="el-icon-user-solid"></i>个人信息管理
            </div>
          </el-menu-item>
          <el-menu-item index="/StudentChange">
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
            <el-breadcrumb-item :to="{path: '/studentHome'}">首页</el-breadcrumb-item>
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
  name: "StudentHome",
  created() {
    let e = sessionStorage.getItem('studentId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this;
    axios.get('http://localhost:8081/student/' + sessionStorage.getItem('studentId')).then(function (resp) {
      _this.user = resp.data.data.studentName;
    })
  },
  methods: {
    logout() {
      sessionStorage.removeItem('studentId');
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