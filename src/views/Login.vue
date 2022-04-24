<template>
  <el-container class="login">
    <el-header class="login-header">
      <h1 style="background: linear-gradient(to right, rgb(225, 79, 65), rgb(97, 164, 218));
        -webkit-background-clip: text;
        color: transparent; font-size: 27px;"><i class="el-icon-s-custom" style="color:rgb(233, 81, 68)"></i> 毕业设计管理系统登录
      </h1>
    </el-header>
    <el-main class="login-main">
      <div id="center">
        <h2 style="text-align:center;color:rgb(135, 81, 193)">用户登录</h2><br>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="userId">
            <el-input placeholder="请输入用户账号" v-model="ruleForm.userId" prefix-icon="el-icon-user-solid" show-word-limit
                      maxlength="15">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入用户密码" v-model="ruleForm.password" prefix-icon="el-icon-key" show-password>
            </el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-radio-group v-model="ruleForm.role">
              <el-radio-button disabled>选择登录身份
              </el-radio-button>
              <el-radio-button label="0">管理员
              </el-radio-button>
              <el-radio-button label="1">教师
              </el-radio-button>
              <el-radio-button label="2">学生
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-success" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="resetForm('ruleForm')">重置</el-button>
            &nbsp
            <router-link to="/reg">
              <el-button type="success" icon="el-icon-share">
                如果没有账户，可以先注册账户
              </el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer class=" login-footer">
      Copyright © 2022 Peter Cheung 保留所有权利。
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        userId: '',
        password: '',
        role: ''
      },
      rules: {
        userId: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 15, message: '长度1到15个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        role: [
          {required: true, message: '请选择登录身份', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.role == 0) {
            axios.post('http://localhost:8081/adminUser/login', this.ruleForm).then((resp) => {
              if (resp.data.data == '登录成功') {
                this.$message({
                  type: 'success',
                  message: resp.data.data
                });
              } else {
                this.$message({
                  type: 'error',
                  message: resp.data.data
                });
              }
            })
          }
        } else {
          console.log('error submit!!');
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

<style>


.login {
  height: 100%;
  position: absolute;
  width: 100%;
  background-image: url('../../public/index.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.login-header {
  background-color: transparent;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-footer {
  background-color: transparent;
  text-align: center;
  color: rgb(142, 142, 145);
  font-size: 16px;
  line-height: 60px;
}

#center {
  border: 0.5px solid rgb(210, 210, 215);
  box-shadow: 0 5px 15px rgb(210, 210, 215);
  background-color: transparent;
  border-radius: 15px;
  width: 600px;
  margin: 45px auto;
  padding: 40px 50px 35px 0;
}
</style>