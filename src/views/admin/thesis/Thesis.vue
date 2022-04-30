<template>
  <div class="Thesis">
    <el-table :data="tableData">
      <el-table-column
          width="160px"
          prop="studentId"
          label="毕业论文编号">
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
  name: "Thesis",
  created() {
    let e = sessionStorage.getItem('userId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/thesis/Reviewed?current=1&size=' + this.pageSize).then(resp => {
      _this.tableData = resp.data.data.records;
      _this.total = resp.data.data.total;
    })
  },
  methods: {
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8081/thesis/Reviewed?current=' + currentPage + '&size=' + this.pageSize).then(resp => {
        _this.tableData = resp.data.data.records;
        _this.total = resp.data.data.total;
      })
    },
    detail(index, row) {
      this.$router.push({name: '论文详情', params: {studentId: row.studentId}})
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
.Thesis {
  width: 95%;
  margin: 20px 0 0 20px;
}
</style>