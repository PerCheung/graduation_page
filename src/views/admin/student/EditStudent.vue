<template>
  <div class="EditStudent">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="studentId">
        <el-input disabled v-model="ruleForm.studentId" prefix-icon="el-icon-info">
        </el-input>
      </el-form-item>
      <el-form-item prop="studentName">
        <el-input v-model="ruleForm.studentName" prefix-icon="el-icon-s-custom" show-word-limit
                  maxlength="12">
        </el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio-button disabled>选择学生性别：
          </el-radio-button>
          <el-radio-button label="男">男
          </el-radio-button>
          <el-radio-button label="女">女
          </el-radio-button>
        </el-radio-group>
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
        <el-input disabled placeholder="电话尚未登记" v-model="ruleForm.studentPhone" prefix-icon="el-icon-mobile-phone">
        </el-input>
      </el-form-item>
      <el-form-item prop="studentEmail">
        <el-input disabled placeholder="邮箱尚未登记" v-model="ruleForm.studentEmail" prefix-icon="el-icon-message">
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
        <el-button type="success" icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">修改信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditStudent",
  created() {
    const _this = this;
    axios.get('http://localhost:8081/student/' + this.$route.params.studentId).then(function (resp) {
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
        studentId: '',
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
        studentName: [
          {required: true, message: '请输入学生姓名', trigger: 'blur'},
          {min: 1, max: 12, message: '长度1到12个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择学生性别', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let student = {studentId: form.studentId, studentName: form.studentName, sex: form.sex}
          axios.put('http://localhost:8081/student', student).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.$router.push('/Student')
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
.EditStudent {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 20px 0 0 250px;
  text-align: center;
}
</style>