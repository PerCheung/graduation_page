<template>
  <div class="DistributeReply">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="color:rgb(67, 66, 141); font-weight:bold;">分配答辩</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="CreateDefense">点击创建答辩</el-button>
      </div>
      <div class="spanR">
        学生学号：{{ reply.studentId }}
      </div>
      <div class="spanR">
        论文名称：{{ reply.thesisOriginal }}
      </div>
      <div class="spanR">
        为该学生分配老师：
        <el-select v-model="reply.teacherId" placeholder="请选择该学生的答辩教师">
          <el-option
              v-for="item in options"
              :key="item.teacherId"
              :label="item.teacherName"
              :value="item.teacherId">
          </el-option>
        </el-select>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DistributeReply",
  data() {
    return {
      reply: {
        studentId: '',
        teacherId: '',
        thesisOriginal: '',
        thesisName: '',
        score: 0,
      },
      options: []
    }
  },
  created() {
    let e = sessionStorage.getItem('userId');
    if (e == null) {
      this.$router.push('/login')
    }
    let _this = this;
    axios.get('http://localhost:8081/student/' + this.$route.params.studentId).then(resp => {
      _this.reply.studentId = resp.data.data.studentId;
    })
    axios.get('http://localhost:8081/thesis/' + this.$route.params.studentId).then(resp => {
      _this.reply.thesisOriginal = resp.data.data.thesisOriginal;
      _this.reply.thesisName = resp.data.data.thesisName;
    })
    axios.get('http://localhost:8081/teacher/noStudent/' + this.$route.params.studentId).then(resp => {
      _this.options = resp.data.data;
    })
  },
  methods: {
    CreateDefense() {
      if (this.reply.teacherId == '') {
        this.$message({
          type: 'warning',
          message: '请先选择教师'
        });
        return false;
      }
      let thesis = {studentId: this.reply.studentId, reply: 1}
      axios.put('http://localhost:8081/thesis', thesis).then(resp => {
        axios.post('http://localhost:8081/reply', this.reply).then(resp => {
          if (resp.data.data == true) {
            this.$message({
              type: 'success',
              message: '创建成功'
            });
            this.$router.push('/AddReply')
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '创建失败'
          });
        }, 1000 * 60)
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '创建失败'
        });
      }, 1000 * 60)
    }
  }
}
</script>

<style scoped>
.DistributeReply {
  background-color: transparent;
  width: 600px;
  margin: 100px 0 0 200px;

}

.spanR {
  padding: 5px;
  color: rgb(67, 66, 141);
}
</style>