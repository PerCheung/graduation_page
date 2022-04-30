<template>
  <div class=studentDetailStudent>
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
    <div>
      <el-switch
          style="display: block;text-align: center;"
          v-model="thesis.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="毕设初步审核通过"
          inactive-text="毕设审核不通过"
          active-value="1"
          inactive-value="2"
      >
      </el-switch>
      <br>
      <div style="display: block;text-align: center">
        <el-button type="success" @click="audit">向管理员提交审核</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "studentDetailStudent",
  created() {
    let e = sessionStorage.getItem('teacherId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/thesis/' + this.$route.params.studentId).then(resp => {
      if (resp.data.data != null) {
        _this.thesis = resp.data.data
      }
      if (resp.data.data == null) {
        this.$notify({
          title: '提示',
          message: '当前学生尚未上传毕业论文文件',
          type: 'info',
          duration: 0
        });
      }
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
    })
  },
  data() {
    return {
      topic: {},
      student: {},
      thesis: {},
      ruleForm: {
        studentId: '',
        topicId: '',
        state: 0
      }
    }
  },
  methods: {
    download() {
      window.open('http://localhost:8081/thesis/download/' + this.thesis.thesisName)
    },
    audit() {
      let thesis = {studentId: this.thesis.studentId, state: this.thesis.state}
      if (thesis.state == 2) {
        this.$confirm('确认要不通过此课题吗？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          axios.put('http://localhost:8081/thesis', thesis).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '审核完成'
              });
            } else {
              this.$message({
                type: 'error',
                message: '审核失败'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      } else {
        axios.put('http://localhost:8081/thesis', thesis).then((resp) => {
          if (resp.data.data == true) {
            this.$message({
              type: 'success',
              message: '审核完成'
            });
          } else {
            this.$message({
              type: 'error',
              message: '审核失败'
            });
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.studentDetailStudent {
  background-color: rgb(217, 239, 239);
  width: 60%;
  margin: 50px 0 0 180px;
  border: 0.5px solid rgb(98, 159, 175);
  box-shadow: 0 5px 15px rgb(210, 210, 215);
  border-radius: 15px;
  padding: 20px;
  color: rgb(69, 67, 142);
}

.studentDetailStudent table, th {
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