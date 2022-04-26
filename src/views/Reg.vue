<template>
  <el-container class="reg">
    <el-header class="reg-header">
      <h1 style="font-size: 27px;"><i class="el-icon-s-custom" style="color:rgb(92, 166, 213)"></i> 毕业设计管理系统注册</h1>
    </el-header>
    <el-main class="reg-main">
      <div id="centerReg">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="userId">
            <el-tooltip class="item" effect="dark" content="用户名最长15个字符" placement="left">
              <el-input placeholder="请输入用户账号" v-model="ruleForm.userId" prefix-icon="el-icon-user-solid" show-word-limit
                        maxlength="15">
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入用户密码" v-model="ruleForm.password" prefix-icon="el-icon-key" show-password>
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input placeholder="请再次确认密码" v-model="ruleForm.checkPassword" prefix-icon="el-icon-key" show-password>
            </el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input placeholder="请输入你的姓名" v-model="ruleForm.username" prefix-icon="el-icon-s-custom" show-word-limit
                      maxlength="12">
            </el-input>
          </el-form-item>
          <el-form-item prop="userTitle">
            <el-select v-model="ruleForm.userTitle" placeholder="请选择职位">
              <el-option label="主任" value="主任"></el-option>
              <el-option label="校长" value="校长"></el-option>
              <el-option label="书记" value="书记"></el-option>
              <el-option label="院长" value="院长"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="verify">
            <el-tooltip class="item" effect="dark" content="注册验证码请找系统负责人获取" placement="left">
              <el-input placeholder="请输入注册所需验证码" v-model="ruleForm.verify" prefix-icon="el-icon-info" show-word-limit
                        maxlength="15">
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">注册</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="resetForm('ruleForm')">重置</el-button>
            &nbsp
            <router-link to="/login">
              <el-button type="primary" icon="el-icon-share">
                如果已经有账户，可以直接登录
              </el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-footer class="reg-footer">
      Copyright © 2022 Peter Cheung 保留所有权利。
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Reg",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userId: '',
        password: '',
        checkPassword: '',
        role: 0,
        username: '',
        userTitle: '',
        verify: ''
      },
      rules: {
        userId: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 15, message: '长度1到15个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        checkPassword: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入你的姓名', trigger: 'blur'}
        ],
        userTitle: [
          {required: true, message: '请选择你的职位', trigger: 'change'}
        ],
        verify: [
          {required: true, message: '验证码为必填', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8081/adminUser', form).then((resp) => {
            if (resp.data.data == '验证码错误') {
              this.$message({
                type: 'error',
                message: resp.data.data
              });
            } else if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '注册成功'
              });
              this.$router.push('/login')
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

<style>

.reg {
  height: 100%;
  position: absolute;
  width: 100%;
  background-image: url('../../public/index.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.reg-header {
  background-color: transparent;
  color: rgb(101, 98, 171);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reg-footer {
  background-color: transparent;
  text-align: center;
  color: rgb(142, 142, 145);
  font-size: 16px;
  line-height: 60px;
}

#centerReg {
  border: 0.5px solid rgb(210, 210, 215);
  box-shadow: 0 5px 15px rgb(210, 210, 215);
  background-color: transparent;
  border-radius: 15px;
  width: 600px;
  margin: 0 auto;
  padding: 30px 50px 15px 0;
}
</style>