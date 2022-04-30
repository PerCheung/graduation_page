<template>
  <div class="TeacherMyStudent">
    <el-table :data="tableData">
      <el-table-column
          width="140px"
          prop="studentId"
          label="学生学号">
      </el-table-column>
      <el-table-column
          prop="studentName"
          label="学生姓名">
      </el-table-column>
      <el-table-column
          width="100px"
          prop="sex"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="studentCollege"
          label="学生所在学院">
      </el-table-column>
      <el-table-column
          prop="studentMajor"
          label="学生所在专业">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click="detail(scope.$index, scope.row)">查看详情
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
  name: "TeacherMyStudent",
  created() {
    let e = sessionStorage.getItem('teacherId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/student/teacher?current=1&size=' + this.pageSize + '&teacherId=' + sessionStorage.getItem('teacherId')).then(resp => {
      _this.tableData = resp.data.data.records;
      _this.total = resp.data.data.total;
    })
  },
  methods: {
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8081/student/teacher?current=' + currentPage + '&size=' + this.pageSize + '&teacherId=' + sessionStorage.getItem('teacherId')).then(function (resp) {
        _this.tableData = resp.data.data.records;
        _this.total = resp.data.data.total;
      })
    },
    detail(index, row) {
      this.$router.push({name: '教师主页-学生详情', params: {studentId: row.studentId}})
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
.TeacherMyStudent {
  width: 95%;
  margin: 20px 0 0 20px;
  height: 80%;
}

.page {
  position: fixed;
  top: 86%;
  right: 42px;
}
</style>