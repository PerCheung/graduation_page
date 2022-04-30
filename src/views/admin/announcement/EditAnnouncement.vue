<template>
  <div class="EditAnnouncement">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="createTime">
        <el-input disabled v-model="ruleForm.createTime" prefix-icon="el-icon-date">
        </el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input disabled v-model="ruleForm.username" prefix-icon="el-icon-user-solid">
        </el-input>
      </el-form-item>
      <el-form-item prop="announcementTitle">
        <el-input placeholder="请输入公告标题" v-model="ruleForm.announcementTitle" prefix-icon="el-icon-s-order"
                  show-word-limit
                  maxlength="30">
        </el-input>
      </el-form-item>
      <el-form-item prop="announcementMain">
        <el-input placeholder="请输入公告内容" v-model="ruleForm.announcementMain" type="textarea"
                  :autosize="{ minRows: 5}"
                  show-word-limit
                  maxlength="255">
        </el-input>
      </el-form-item>
      <el-form-item prop="updateTime">
        <el-input disabled v-model="ruleForm.updateTime" prefix-icon="el-icon-date">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">修改公告</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditAnnouncement",
  created() {
    let e = sessionStorage.getItem('userId');
    if (e == null) {
      this.$router.push('/login')
    }
    let _this = this;
    axios.get('http://localhost:8081/adminUser/' + this.$route.params.userId).then(function (resp) {
      _this.ruleForm.username = '此公告发布人：' + resp.data.data.username + resp.data.data.userTitle;
    })
    axios.get('http://localhost:8081/announcement/' + this.$route.params.announcementId).then(function (resp) {
      _this.ruleForm.announcementId = resp.data.data.announcementId;
      _this.ruleForm.announcementTitle = resp.data.data.announcementTitle;
      _this.ruleForm.announcementMain = resp.data.data.announcementMain;
      _this.ruleForm.createTime = '公告创建时间：' + resp.data.data.createTime;
      _this.ruleForm.updateTime = '上次修改时间：' + resp.data.data.updateTime;
    })
  },
  data() {
    return {
      ruleForm: {
        announcementId: '',
        announcementTitle: '',
        announcementMain: '',
        username: ''
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
    }
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let announcement = {
            announcementId: form.announcementId,
            announcementTitle: form.announcementTitle,
            announcementMain: form.announcementMain,
            userId: sessionStorage.getItem('userId')
          }
          axios.put('http://localhost:8081/announcement', announcement).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.$router.push('/Announcement')
            } else {
              this.$message({
                type: 'error',
                message: '修改失败'
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.EditAnnouncement {
  background-color: transparent;
  border-radius: 10px;
  width: 650px;
  margin: 40px 0 0 140px;
}
</style>