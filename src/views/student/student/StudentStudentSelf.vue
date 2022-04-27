<template>
  <div class="StudentStudentSelf">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="studentName">
        <el-input disabled v-model="ruleForm.studentName" prefix-icon="el-icon-s-custom">
        </el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-input disabled v-model="ruleForm.sex" prefix-icon="el-icon-male" suffix-icon="el-icon-female">
        </el-input>
      </el-form-item>
      <el-form-item prop="studentCollege">
        <el-input disabled v-model="ruleForm.studentCollege" prefix-icon="el-icon-school">
        </el-input>
      </el-form-item>
      <el-form-item prop="studentMajor">
        <el-input disabled v-model="ruleForm.studentMajor" prefix-icon="el-icon-school">
        </el-input>
      </el-form-item>
      <el-form-item prop="studentPhone">
        <el-input placeholder="电话尚未登记，请登记你的电话号码" v-model="ruleForm.studentPhone" prefix-icon="el-icon-mobile-phone">
        </el-input>
      </el-form-item>
      <el-form-item prop="studentEmail">
        <el-input placeholder="邮箱尚未登记，请登记你的邮箱" v-model="ruleForm.studentEmail" prefix-icon="el-icon-message">
        </el-input>
      </el-form-item>
      <el-form-item prop="createTime">
        <el-input disabled v-model="ruleForm.createTime" prefix-icon="el-icon-date">
        </el-input>
      </el-form-item>
      <el-form-item prop="updateTime">
        <el-input disabled v-model="ruleForm.updateTime" prefix-icon="el-icon-date">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">修改个人信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "StudentStudentSelf",
  created() {
    const _this = this;
    axios.get('http://localhost:8081/student/' + sessionStorage.getItem('studentId')).then(function (resp) {
      _this.ruleForm = resp.data.data;
      _this.ruleForm.createTime = '账户创建时间：' + resp.data.data.createTime;
      _this.ruleForm.updateTime = '上次修改时间：' + resp.data.data.updateTime;
      if (resp.data.data.studentPhone == 0) {
        _this.ruleForm.studentPhone = ''
      }
      if (resp.data.data.studentEmail == 0) {
        _this.ruleForm.studentEmail = ''
      }
    })
  },
  data() {
    return {
      ruleForm: {
        studentName: '',
        studentCollege: '',
        studentMajor: '',
        sex: '',
        studentPhone: '',
        studentEmail: '',
        createTime: '',
        updateTime: ''
      },
      rules: {
        studentPhone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的电话格式', trigger: ['blur', 'change']}
        ],
        studentEmail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change']}
        ]
      }
    };
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let postForm = {
            studentId: sessionStorage.getItem('studentId'),
            studentPhone: form.studentPhone,
            studentEmail: form.studentEmail
          };
          axios.put('http://localhost:8081/student', postForm).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              location.reload()
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
    }
  }
}
</script>

<style scoped>
.StudentStudentSelf {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 20px 0 0 250px;
  text-align: center;
}
</style>