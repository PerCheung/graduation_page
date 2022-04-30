<template>
  <div class="TeacherDetailReply">
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
    <table class="table-two">
      <tr>
        <td>学生：{{ student.studentName }}</td>
        <td>学生性别：{{ student.sex }}</td>
      </tr>
      <tr>
        <td>学生所在学院：{{ student.studentCollege }}</td>
        <td>学生学号：{{ student.studentId }}</td>
      </tr>
      <tr>
        <td>学生联系电话：{{ student.studentPhone }}</td>
        <td>学生所属专业：{{ student.studentMajor }}</td>
      </tr>
      <tr>
        <td>学生联系邮箱：{{ student.studentEmail }}</td>
        <td>学生论文：
          <el-button type="primary" size="mini"
                     @click="download" icon="el-icon-share">下载查看
          </el-button>
        </td>
      </tr>
    </table>
    <br>
    <table class="table-two">
      <tr>
        <td>课题创建教师：{{ teacher.teacherName }}</td>
        <td>教师性别：{{ teacher.sex }}</td>
      </tr>
      <tr>
        <td>教师职称：{{ teacher.teacherTitle }}</td>
        <td>教师所在学院：{{ teacher.teacherCollege }}</td>
      </tr>
      <tr>
        <td>教师联系电话：{{ teacher.teacherPhone }}</td>
        <td>教师所属专业：{{ teacher.teacherMajor }}</td>
      </tr>
      <tr>
        <td>教师工号：{{ teacher.teacherId }}</td>
        <td>教师联系邮箱：{{ teacher.teacherEmail }}</td>
      </tr>
    </table>
    <br>
    <div style="width:300px;margin:0 auto">
      <el-slider v-model="reply.score"></el-slider>
      <h1 style="text-align:center">该学生得分：{{ reply.score }}</h1><br>
      <el-button type="primary"
                 icon="el-icon-s-check"
                 style="display:block;margin:0 auto"
                 @click="score"
      >提交分数
      </el-button>
    </div>

  </div>
</template>

<script>

export default {
  name: "TeacherDetailReply",
  created() {
    let e = sessionStorage.getItem('teacherId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/thesis/' + this.$route.params.studentId).then(resp => {
      _this.thesis = resp.data.data
    })
    axios.get('http://localhost:8081/topic/student/My/' + this.$route.params.studentId).then(resp => {
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
      axios.get('http://localhost:8081/student/' + topic.studentId).then(r => {
        let studentPage = r.data.data;
        if (studentPage.studentPhone == 0) {
          studentPage.studentPhone = '未填写'
        }
        if (studentPage.studentEmail == 0) {
          studentPage.studentEmail = '未填写'
        }
        _this.student = studentPage;
      })
      axios.get('http://localhost:8081/teacher/' + topic.teacherId).then(r => {
        let teacherPage = r.data.data;
        if (teacherPage.teacherPhone == 0) {
          teacherPage.teacherPhone = '未填写'
        }
        if (teacherPage.teacherEmail == 0) {
          teacherPage.teacherEmail = '未填写'
        }
        _this.teacher = teacherPage;
      })
    })
  },
  data() {
    return {
      topic: {},
      student: {},
      thesis: {},
      teacher: {},
      reply: {
        score: 0
      }
    }
  },
  methods: {
    download() {
      window.open('http://localhost:8081/thesis/download/' + this.thesis.thesisName)
    },
    score() {
      let reply = {studentId: this.student.studentId, score: this.reply.score}
      axios.put('http://localhost:8081/reply', reply).then(resp => {
        if (resp.data.data == true) {
          this.$message({
            type: 'success',
            message: '打分成功'
          });
          this.$router.push('/TeacherReply')
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '打分失败'
        });
      }, 1000 * 60)
    }
  }
}
</script>

<style scoped>
.TeacherDetailReply {
  background-color: rgb(217, 239, 239);
  width: 60%;
  margin: 10px 0 0 180px;
  border: 0.5px solid rgb(98, 159, 175);
  box-shadow: 0 5px 15px rgb(210, 210, 215);
  border-radius: 15px;
  padding: 20px;
  color: rgb(69, 67, 142);
}

.TeacherDetailReply table, th {
  text-align: left;
  border: 1px solid rgb(98, 159, 175);
  border-radius: 15px;
  padding: 5px;
}

.table-one {
  width: 100%;
  background-color: rgb(212, 221, 254);
}

.table-two {
  width: 100%;
  background-color: rgb(201, 238, 232);
}
</style>