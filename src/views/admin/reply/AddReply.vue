<template>
  <div class="AddReply">
    <el-table :data="tableData">
      <el-table-column
          width="160px"
          prop="studentId"
          label="通过学生的学号">
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
              icon="el-icon-c-scale-to-original"
              @click="detail(scope.$index, scope.row)">分配答辩
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
  name: "AddReply",
  created() {
    let e = sessionStorage.getItem('userId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/thesis/Reviewed/NoR?current=1&size=' + this.pageSize).then(resp => {
      _this.tableData = resp.data.data.records;
      _this.total = resp.data.data.total;
    })
  },
  methods: {
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8081/thesis/Reviewed/NoR?current=' + currentPage + '&size=' + this.pageSize).then(resp => {
        _this.tableData = resp.data.data.records;
        _this.total = resp.data.data.total;
      })
    },
    detail(index, row) {
      this.$router.push({name: '分配答辩', params: {studentId: row.studentId}})
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
.AddReply {
  width: 95%;
  margin: 20px 0 0 20px;
}
</style>