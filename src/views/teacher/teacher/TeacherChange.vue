<template>
  <div class="TeacherChange">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="oldPassword">
        <el-input placeholder="请输入原密码" v-model="ruleForm.oldPassword" prefix-icon="el-icon-key" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input placeholder="请输入新密码" v-model="ruleForm.newPassword" prefix-icon="el-icon-key" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input placeholder="请再次确认密码" v-model="ruleForm.checkPassword" prefix-icon="el-icon-key" show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">修改密码</el-button>
        &nbsp&nbsp&nbsp&nbsp
        <el-button type="danger" plain icon="el-icon-delete" @click="resetForm('ruleForm')">重置输入框</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "TeacherChange",
  created() {
    let e = sessionStorage.getItem('teacherId');
    if (e == null) {
      this.$router.push('/login')
    }
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        teacherId: sessionStorage.getItem('teacherId'),
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入原密码', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'}
        ],
        checkPassword: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8081/teacher/change', form).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '密码修改成功'
              });
              sessionStorage.removeItem('teacherId');
              this.$router.push('/login') // 返回登录页面
            } else {
              this.$message({
                type: 'error',
                message: resp.data.data
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
.TeacherChange {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 150px 0 0 200px;
  text-align: center;
}
</style>