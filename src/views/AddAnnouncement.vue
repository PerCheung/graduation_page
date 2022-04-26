<template>
  <div class="AddAnnouncement">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
      <el-form-item>
        <el-button type="success" icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">发布公告</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddAnnouncement",
  data() {
    return {
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
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8081/announcement', form).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '发布成功'
              });
            } else {
              this.$message({
                type: 'error',
                message: '发布失败'
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
.AddAnnouncement {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 100px 0 0 240px;
}
</style>