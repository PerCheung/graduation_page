<template>
  <div class="TeacherAddTopic">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="topicName">
        <el-tooltip class="item" effect="dark" content="课题名称最长50个字符" placement="left">
          <el-input placeholder="请输入课题名称" v-model="ruleForm.topicName" prefix-icon="el-icon-tickets" show-word-limit
                    maxlength="50">
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop="topicType">
        <el-select v-model="ruleForm.topicType" style="width:350px" placeholder="请选择课题类型">
          <el-option label="其他" value="0"></el-option>
          <el-option label="科学技术" value="1"></el-option>
          <el-option label="生产实践" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="topicSource">
        <el-select v-model="ruleForm.topicSource" style="width:350px" placeholder="请选择课题来源">
          <el-option label="实习" value="0"></el-option>
          <el-option label="院系发布" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="topicMain">
        <el-input placeholder="请描述课题任务以及主要内容" v-model="ruleForm.topicMain" type="textarea"
                  :autosize="{ minRows: 5}"
                  show-word-limit
                  maxlength="255">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">提交课题</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "TeacherAddTopic",
  data() {
    return {
      ruleForm: {
        topicName: '',
        topicType: '',
        topicSource: '',
        topicMain: '',
        state: 0,
        teacherId: sessionStorage.getItem('teacherId')
      },
      rules: {
        topicName: [
          {required: true, message: '请输入课题名称', trigger: 'blur'},
          {min: 1, max: 50, message: '长度1到50个字符', trigger: 'blur'}
        ],
        topicType: [
          {required: true, message: '请选择课题类型', trigger: 'change'}
        ],
        topicSource: [
          {required: true, message: '请选择课题来源', trigger: 'change'}
        ],
        topicMain: [
          {required: true, message: '请描述课题任务以及主要内容', trigger: 'blur'},
          {min: 50, max: 255, message: '长度50到255个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8081/topic', form).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '课题添加成功'
              });
              this.$router.push('/TeacherTopic')
            } else {
              this.$message({
                type: 'error',
                message: '课题添加失败'
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
.TeacherAddTopic {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 40px 0 0 240px;
}
</style>