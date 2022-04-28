<template>
  <div class="DetailAnnouncement">
    <h1>{{ announcement.announcementTitle }}</h1><br>
    <p class="DetailAnnouncement_date">上次修改时间：{{ announcement.updateTime }}</p><br>
    <p class="DetailAnnouncement_main">{{ announcement.announcementMain }}</p><br>
    <p class="DetailAnnouncement_user">最终发布人：{{ user.username + user.userTitle }}</p>
    <p class="DetailAnnouncement_date">发布时间：{{ announcement.createTime }}</p>
  </div>
</template>

<script>
export default {
  name: "DetailAnnouncement",
  created() {
    let _this = this;
    axios.get('http://localhost:8081/adminUser/' + this.$route.params.userId).then(function (resp) {
      _this.user = resp.data.data;
    })
    axios.get('http://localhost:8081/announcement/' + this.$route.params.announcementId).then(function (resp) {
      _this.announcement = resp.data.data;
    })
  },
  data() {
    return {
      announcement: {
        announcementTitle: '',
        announcementMain: '',
        createTime: '',
        updateTime: ''
      },
      user: {
        username: '',
        userTitle: ''
      },
      ruleForm: {
        announcementTitle: '',
        announcementMain: '',
        userId: sessionStorage.getItem('userId')
      },
      rules: {
        announcementTitle: [
          {required: true, message: '请输入公告标题', trigger: 'blur'},
          {min: 1, max: 30, message: '长度1到30个字符', trigger: 'blur'}
        ],
        announcementMain: [
          {required: true, message: '请输入公告内容', trigger: 'blur'},
          {min: 1, max: 255, message: '长度1到255个字符', trigger: 'blur'}
        ]
      }
    };
  }
}
</script>

<style scoped>
.DetailAnnouncement {
  font-weight: bold;
  width: 800px;
  margin-top: 20px;
  margin-left: 100px;
}

.DetailAnnouncement h1 {
  color: rgb(56, 54, 136);
  text-align: center;
  font-size: 23px;
}

.DetailAnnouncement_date {
  color: rgb(56, 54, 136);
  text-align: right;
}

.DetailAnnouncement_main {
  background: linear-gradient(to left, rgb(56, 54, 136), rgb(229, 85, 70));
  -webkit-background-clip: text;
  color: transparent;
  text-indent: 30px;
  text-align: justify;
}

.DetailAnnouncement_user {
  color: rgb(56, 54, 136);
  text-align: right;
}
</style>