<template>
  <div class="StudentMyReply">
    <el-timeline>
      <el-timeline-item size="large" type="error" icon="el-icon-user" color="#0bbd87"
                        :timestamp="student.createTime"
                        placement="top">
        <el-card>
          <h1>创建了学号为{{ student.studentId }}的学生{{ student.studentName }}</h1>
          <p>你的邮箱是：{{ student.studentEmail }}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item size="large" color="#0bbd87"
                        :timestamp="topic.updateTime"
                        icon="el-icon-loading"
                        placement="top">
        <el-card>
          <h1>你选择了{{ teacher.teacherName }}老师创建的课题——{{ topic.topicName }}</h1>
          <p>老师的联系方式是：{{ teacher.teacherEmail }}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item size="large" icon="el-icon-thumb" color="#0bbd87" :timestamp="thesis.updateTime"
                        placement="top">
        <el-card>
          <h1>你最后一次在{{ thesis.updateTime }}提交了你的毕业设计论文，你的导师{{ teacher.teacherName }}最终为你打分{{ thesis.score }}</h1>
        </el-card>
      </el-timeline-item>
      <el-timeline-item size="large" color="#0bbd87" icon="el-icon-check" :timestamp="reply.updateTime" placement="top">
        <el-card>
          <h1>你的答辩最终由{{ scoreTeacher.teacherName }}老师为你打分，你的答辩成绩为{{
              reply.score
            }}，你的最终成绩为{{ reply.score * 0.4 + thesis.score * 0.6 }}！</h1>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "StudentMyReply",
  created() {
    let e = sessionStorage.getItem('studentId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this;
    axios.get('http://localhost:8081/student/' + sessionStorage.getItem('studentId')).then(resp => {
      _this.student = resp.data.data;
    })
    axios.get('http://localhost:8081/topic/student/My/' + sessionStorage.getItem('studentId')).then(resp => {
      _this.topic = resp.data.data;
      axios.get('http://localhost:8081/teacher/' + resp.data.data.teacherId).then(resp => {
        _this.teacher = resp.data.data;
      })
    })
    axios.get('http://localhost:8081/thesis/' + sessionStorage.getItem('studentId')).then(resp => {
      _this.thesis = resp.data.data;
    })
    axios.get('http://localhost:8081/reply/' + sessionStorage.getItem('studentId')).then(resp => {
      _this.reply = resp.data.data;
      axios.get('http://localhost:8081/teacher/' + resp.data.data.teacherId).then(resp => {
        _this.scoreTeacher = resp.data.data;
      })
    })
  },
  data() {
    return {
      student: {},
      topic: {},
      teacher: {},
      thesis: {},
      reply: {},
      scoreTeacher: {}
    }
  }
}
</script>

<style scoped>
.StudentMyReply {
  width: 400px;
  margin: 50px 0 0 280px;
}
</style>