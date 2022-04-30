<template>
  <div class="DetailTeacher">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="teacherId">
        <el-input disabled v-model="ruleForm.teacherId" prefix-icon="el-icon-info">
        </el-input>
      </el-form-item>
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
    </el-form>
  </div>
</template>

<script>
export default {
  name: "DetailTeacher",
  created() {
    let e = sessionStorage.getItem('userId');
    if (e == null) {
      this.$router.push('/login')
    }
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
      rules: {}
    };
  }
}
</script>

<style scoped>
.DetailTeacher {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 20px 0 0 250px;
  text-align: center;
}
</style>