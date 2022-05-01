<template>
  <div class=StudentChooseTopic>
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
        <td>教师编号：{{ teacher.teacherId }}</td>
        <td>教师联系邮箱：{{ teacher.teacherEmail }}</td>
      </tr>
    </table>
    <br>
    <table>
      <tr>
        <td>{{ topic.topicMain }}</td>
      </tr>
    </table>
    <br>
    <div style="display: block;text-align: center">
      <el-button type="success" @click="audit">选择当前课题</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: "StudentChooseTopic",
  methods: {
    audit() {
      this.$confirm('确认选择此课题吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        const _this = this;
        let StudentTopicVO = {
          studentId: sessionStorage.getItem('studentId'),
          topicId: _this.topic.topicId,
          teacherId: _this.teacher.teacherId
        }
        axios.put('http://localhost:8081/topic/student', StudentTopicVO).then(resp => {
          if (resp.data.data == true) {
            this.$message({
              type: 'success',
              message: '选择成功！'
            });
            this.$router.push('/StudentMyTopic')
          } else {
            this.$message({
              type: 'info',
              message: resp.data.data
            });
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '选择失败'
          });
          console.log(error)  //接口请求1分钟还是没有响应，则会停止响应
        }, 1000 * 60)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
  },
  created() {
    let e = sessionStorage.getItem('studentId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/topic/' + this.$route.params.topicId).then(function (resp) {
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
      axios.get('http://localhost:8081/teacher/' + topic.teacherId).then(function (r) {
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
      teacher: {}
    }
  }
}
</script>

<style scoped>
.StudentChooseTopic {
  background-color: rgb(217, 239, 239);
  width: 60%;
  margin: 10px 0 0 180px;
  border: 0.5px solid rgb(98, 159, 175);
  box-shadow: 0 5px 15px rgb(210, 210, 215);
  border-radius: 15px;
  padding: 20px;
  color: rgb(69, 67, 142);
}

.StudentChooseTopic table, th {
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