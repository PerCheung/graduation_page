<template>
  <div class="TeacherEditTopic">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="topicName">
        <el-tooltip class="item" effect="dark" content="课题名称最长50个字符" placement="left">
          <el-input placeholder="请输入课题名称" v-model="ruleForm.topicName" prefix-icon="el-icon-tickets" show-word-limit
                    maxlength="50">
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop="createTime">
        <el-input disabled v-model="createTime" prefix-icon="el-icon-date">
        </el-input>
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
      <el-form-item prop="updateTime">
        <el-input disabled v-model="updateTime" prefix-icon="el-icon-date">
        </el-input>
      </el-form-item>
      <el-form-item prop="topicMain">
        <el-input placeholder="请描述课题任务以及主要内容" v-model="ruleForm.topicMain" type="textarea"
                  :autosize="{ minRows: 5}"
                  show-word-limit
                  maxlength="255">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">修改课题</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "TeacherEditTopic",
  created() {
    let e = sessionStorage.getItem('teacherId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/topic/' + this.$route.params.topicId).then(resp => {
      let topic = resp.data.data;
      if (topic.topicType == 0) {
        topic.topicType = '其他'
      }
      if (topic.topicType == 1) {
        topic.topicType = '科学技术'
      }
      if (topic.topicType == 2) {
        topic.topicType = '生产实践'
      }
      if (topic.topicSource == 0) {
        topic.topicSource = '实习'
      }
      if (topic.topicSource == 1) {
        topic.topicSource = '院系发布'
      }
      _this.ruleForm.topicName = topic.topicName;
      _this.ruleForm.topicType = topic.topicType;
      _this.ruleForm.topicSource = topic.topicSource;
      _this.ruleForm.topicId = topic.topicId;
      _this.ruleForm.topicMain = topic.topicMain;
      _this.createTime = "课题创建时间：" + topic.createTime
      _this.updateTime = "课题上次修改时间：" + topic.updateTime
    })
  },
  data() {
    return {
      createTime: '',
      updateTime: '',
      ruleForm: {
        topicId: '',
        topicName: '',
        topicType: '',
        topicSource: '',
        topicMain: '',
        state: 0
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
        ], topicMain: [
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
          if (form.topicType == '其他') {
            form.topicType = 0
          }
          if (form.topicType == '科学技术') {
            form.topicType = 1
          }
          if (form.topicType == '生产实践') {
            form.topicType = 2
          }
          if (form.topicSource == '实习') {
            form.topicSource = 0
          }
          if (form.topicSource == '院系发布') {
            form.topicSource = 1
          }
          axios.put('http://localhost:8081/topic', form).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '课题修改成功'
              });
              this.$router.push('/TeacherTopic')
            } else {
              this.$message({
                type: 'error',
                message: '课题修改失败'
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
.TeacherEditTopic {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 10px 0 0 240px;
}
</style>