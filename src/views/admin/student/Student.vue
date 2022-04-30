<template>
  <div class="student">
    <el-table :data="tableData">
      <el-table-column
          width="140px"
          prop="studentId"
          label="学生学号">
      </el-table-column>
      <el-table-column
          width="80px"
          prop="studentName"
          label="学生姓名">
      </el-table-column>
      <el-table-column
          width="50px"
          prop="sex"
          label="性别">
      </el-table-column>
      <el-table-column
          width="180px"
          prop="studentCollege"
          label="学生所在学院">
      </el-table-column>
      <el-table-column
          width="180px"
          prop="studentMajor"
          label="学生所在专业">
      </el-table-column>

      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click="detail(scope.$index, scope.row)">查看详情
          </el-button>
          <el-button
              size="mini"
              type="success"
              plain
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          &nbsp
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='不用了'
              icon="el-icon-key"
              icon-color="red"
              title="确认重置当前学生密码为初始密码吗？"
              @confirm="initialization(scope.$index, scope.row)"
              @cancel="noHandleDelete"
          >
            <el-button
                slot="reference"
                size="mini"
                type="danger"
                plain>重置密码
            </el-button>
          </el-popconfirm>
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
  name: "Student",
  created() {
    let e = sessionStorage.getItem('userId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/student?current=1&size=' + this.pageSize).then(function (resp) {
      _this.tableData = resp.data.data.records;
      _this.total = resp.data.data.total;
    })
  },
  methods: {
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8081/student?current=' + currentPage + '&size=' + this.pageSize).then(function (resp) {
        _this.tableData = resp.data.data.records;
        _this.total = resp.data.data.total;
      })
    },
    noHandleDelete() {
      this.$message({
        type: 'info',
        message: '操作取消'
      });
    },
    detail(index, row) {
      this.$router.push({name: '学生详情', params: {studentId: row.studentId}})
    },
    handleEdit(index, row) {
      this.$router.push({name: '编辑学生信息', params: {studentId: row.studentId}})
    },
    initialization(index, row) {
      let student = {studentId: row.studentId}
      axios.put('http://localhost:8081/student/initialization', student).then(function () {
      })
      this.$message({
        type: 'success',
        message: '重置密码成功!'
      });
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
.student {
  width: 95%;
  margin: 20px 0 0 20px;
  height: 80%;
}
</style>