<template>
  <div class="EditTeacher">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="teacherId">
        <el-input disabled v-model="ruleForm.teacherId" prefix-icon="el-icon-info">
        </el-input>
      </el-form-item>
      <el-form-item prop="teacherName">
        <el-input v-model="ruleForm.teacherName" prefix-icon="el-icon-s-custom" show-word-limit
                  maxlength="12">
        </el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio-button disabled>选择教师性别：
          </el-radio-button>
          <el-radio-button label="男">男
          </el-radio-button>
          <el-radio-button label="女">女
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="teacherTitle">
        <el-select v-model="ruleForm.teacherTitle" style="width:250px" placeholder="请选择教师职称">
          <el-option label="助教" value="助教"></el-option>
          <el-option label="讲师" value="讲师"></el-option>
          <el-option label="副教授" value="副教授"></el-option>
          <el-option label="教授" value="教授"></el-option>
        </el-select>
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
        <el-input disabled placeholder="电话尚未登记" v-model="ruleForm.teacherPhone" prefix-icon="el-icon-mobile-phone">
        </el-input>
      </el-form-item>
      <el-form-item prop="teacherEmail">
        <el-input disabled placeholder="邮箱尚未登记" v-model="ruleForm.teacherEmail" prefix-icon="el-icon-message">
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
  name: "EditTeacher",
  created() {
    const _this = this;
    axios.get('http://localhost:8081/teacher/' + this.$route.params.teacherId).then(function (resp) {
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
        teacherId: '',
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
        teacherName: [
          {required: true, message: '请输入教师姓名', trigger: 'blur'},
          {min: 1, max: 12, message: '长度1到12个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择教师性别', trigger: 'change'}
        ],
        teacherTitle: [
          {required: true, message: '请选择教师职称', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let teacher = {
            teacherId: form.teacherId,
            teacherName: form.teacherName,
            sex: form.sex,
            teacherTitle: form.teacherTitle
          }
          axios.put('http://localhost:8081/teacher', teacher).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.$router.push('/Teacher')
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
.EditTeacher {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 20px 0 0 250px;
  text-align: center;
}
</style>