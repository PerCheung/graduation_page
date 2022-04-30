<template>
  <div class="TeacherReply">
    <el-table :data="tableData">
      <el-table-column
          width="160px"
          prop="studentId"
          label="学生学号">
      </el-table-column>
      <el-table-column
          prop="thesisOriginal"
          label="毕业论文名称">
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-s-check"
              @click="detail(scope.$index, scope.row)">查看并打分
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          :current-page.sync="currentPage"
          @current-change="page">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherReply",
  created() {
    let e = sessionStorage.getItem('teacherId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/reply/teacher?current=1&size=' + this.pageSize + '&teacherId=' + sessionStorage.getItem('teacherId')).then(resp => {
      _this.tableData = resp.data.data.records;
      _this.total = resp.data.data.total;
    })
  },
  methods: {
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8081/reply/teacher?current=' + currentPage + '&size=' + this.pageSize + '&teacherId=' + sessionStorage.getItem('teacherId')).then(resp => {
        _this.tableData = resp.data.data.records;
        _this.total = resp.data.data.total;
      })
    },
    detail(index, row) {
      this.$router.push({name: '教师主页-答辩打分', params: {studentId: row.studentId}})
    }
  },
  data() {
    return {
      tableData: [],
      pageSize: 7,
      total: 50,
      currentPage: 1
    }
  }
}
</script>

<style scoped>
.TeacherReply {
  width: 95%;
  margin: 20px 0 0 20px;
}
</style>