<template>
  <div class=StudentUploadDocumentation>
    <table class="table-one">
      <tr>
        <td>课题名称：{{ topic.topicName }}</td>
        <td>课题编号：{{ topic.topicId }}</td>
      </tr>
      <tr>
        <td>课题来源：{{ topic.topicSource }}</td>
        <td>课题创建时间：{{ topic.createTime }}</td>
      </tr>
      <tr>
        <td>课题类型：{{ topic.topicType }}</td>
        <td>课题上次修改时间：{{ topic.updateTime }}</td>
      </tr>
    </table>
    <br>
    <div class="upload">
      <h1 style="text-align: center;font-size: 23px">在此提交你的开题报告，指导记录等过程文档</h1><br>
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
        <el-upload
            class="upload-demo"
            action="http://localhost:8081/documentation"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            drag
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :data="ruleForm"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">文档文件拖拽至此即可完成上传，或<em>点击上传</em></div>
        </el-upload>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "StudentUploadDocumentation",
  created() {
    let e = sessionStorage.getItem('studentId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    _this.ruleForm.studentId = sessionStorage.getItem('studentId');
    axios.get('http://localhost:8081/topic/student/My/' + sessionStorage.getItem('studentId')).then(resp => {
      if (resp.data.data == null) {
        _this.$message({
          type: 'error',
          message: '你尚未选择课题'
        });
      }
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
      _this.topic = topic;
      _this.thesis = topic.topicId;
    })
  },
  data() {
    return {
      topic: {},
      ruleForm: {
        studentId: ''
      }
    }
  },
  methods: {
    //调用的是表单中的:before-upload="beforeAvatarUpload"
    beforeAvatarUpload(file) {
      if ((file.size / 1024 / 1024) > 80) {
        this.$message.error("上传的图片大小不能超过80MB");
        return false;
      }
      return true;
    },
    uploadSuccess() {
      this.$message({
        type: 'success',
        message: '文件上传成功'
      });
    },
    uploadError() {
      this.$message({
        type: 'error',
        message: '文件上传失败'
      });
    }
  }
}
</script>

<style scoped>
.StudentUploadDocumentation {
  background-color: rgb(217, 239, 239);
  width: 60%;
  margin: 30px 0 0 180px;
  border: 0.5px solid rgb(98, 159, 175);
  box-shadow: 0 5px 15px rgb(210, 210, 215);
  border-radius: 15px;
  padding: 20px;
  color: rgb(69, 67, 142);
}

.StudentUploadDocumentation table, th {
  text-align: left;
  border: 1px solid rgb(98, 159, 175);
  border-radius: 15px;
  padding: 5px;
}

.table-one {
  width: 100%;
  background-color: rgb(212, 221, 254);
}

.StudentUploadDocumentation .upload {
  width: 360px;
  margin: 0 auto;
  padding: 10px;
}
</style>