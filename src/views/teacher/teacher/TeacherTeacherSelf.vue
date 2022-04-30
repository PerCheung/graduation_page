<template>
  <div class="TeacherTeacherSelf">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="teacherName">
        <el-input disabled v-model="ruleForm.teacherName" prefix-icon="el-icon-s-custom">
        </el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-input disabled v-model="ruleForm.sex" prefix-icon="el-icon-male" suffix-icon="el-icon-female">
        </el-input>
      </el-form-item>
      <el-form-item prop="teacherTitle">
        <el-input disabled v-model="ruleForm.teacherTitle" prefix-icon="el-icon-reading">
        </el-input>
      </el-form-item>
      <el-form-item prop="teacherCollege">
        <el-input disabled v-model="ruleForm.teacherCollege" prefix-icon="el-icon-school">
        </el-input>
      </el-form-item>
      <el-form-item prop="teacherMajor">
        <el-input disabled v-model="ruleForm.teacherMajor" prefix-icon="el-icon-school">
        </el-input>
      </el-form-item>
      <el-form-item prop="teacherPhone">
        <el-input placeholder="电话尚未登记，请登记你的电话号码" v-model="ruleForm.teacherPhone" prefix-icon="el-icon-mobile-phone">
        </el-input>
      </el-form-item>
      <el-form-item prop="teacherEmail">
        <el-input placeholder="邮箱尚未登记，请登记你的邮箱" v-model="ruleForm.teacherEmail" prefix-icon="el-icon-message">
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
  name: "TeacherTeacherSelf",
  created() {
    let e = sessionStorage.getItem('teacherId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this;
    axios.get('http://localhost:8081/teacher/' + sessionStorage.getItem('teacherId')).then(function (resp) {
      _this.ruleForm = resp.data.data;
      _this.ruleForm.createTime = '账户创建时间：' + resp.data.data.createTime;
      _this.ruleForm.updateTime = '上次修改时间：' + resp.data.data.updateTime;
      if (resp.data.data.teacherPhone == 0) {
        _this.ruleForm.teacherPhone = ''
      }
      if (resp.data.data.teacherEmail == 0) {
        _this.ruleForm.teacherEmail = ''
      }
    })
  },
  data() {
    return {
      ruleForm: {
        teacherName: '',
        teacherCollege: '',
        teacherMajor: '',
        sex: '',
        teacherTitle: '',
        teacherPhone: '',
        teacherEmail: '',
        createTime: '',
        updateTime: ''
      },
      rules: {
        teacherPhone: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的电话格式', trigger: ['blur', 'change']}
        ],
        teacherEmail: [
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
            teacherId: sessionStorage.getItem('teacherId'),
            teacherPhone: form.teacherPhone,
            teacherEmail: form.teacherEmail
          };
          axios.put('http://localhost:8081/teacher', postForm).then((resp) => {
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
.TeacherTeacherSelf {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 20px 0 0 250px;
  text-align: center;
}
</style>