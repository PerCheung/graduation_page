<template>
  <div class="self">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" prefix-icon="el-icon-s-custom" show-word-limit
                  maxlength="12">
        </el-input>
      </el-form-item>
      <el-form-item prop="userTitle" placeholder="你的职务">
        <el-select v-model="ruleForm.userTitle">
          <el-option label="主任" value="主任"></el-option>
          <el-option label="校长" value="校长"></el-option>
          <el-option label="书记" value="书记"></el-option>
          <el-option label="院长" value="院长"></el-option>
        </el-select>
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
  name: "AdminSelf",
  created() {
    const _this = this;
    axios.get('http://localhost:8081/adminUser/' + sessionStorage.getItem('userId')).then(function (resp) {
      _this.ruleForm.username = resp.data.data.username;
      _this.ruleForm.userTitle = resp.data.data.userTitle;
      _this.ruleForm.createTime = '账户创建时间：' + resp.data.data.createTime;
      _this.ruleForm.updateTime = '上次修改时间：' + resp.data.data.updateTime;
    })
  },
  data() {
    return {
      ruleForm: {
        username: '',
        userTitle: '',
        createTime: '',
        updateTime: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入你的姓名', trigger: 'blur'}
        ],
        userTitle: [
          {required: true, message: '请选择你的职位', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {userId: sessionStorage.getItem('userId'), username: form.username, userTitle: form.userTitle};
          console.log(data);
          axios.put('http://localhost:8081/adminUser', data).then((resp) => {
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
.self {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 120px 0 0 200px;
}
</style>