<template>
  <div class="TeacherAnnouncement">
    <el-table :data="tableData" :default-sort="{prop: 'createTime', order: 'descending'}">
      <el-table-column
          prop="announcementTitle"
          label="公告">
      </el-table-column>
      <el-table-column
          prop="createTime"
          sortable
          label="发布时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
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
  name: "TeacherAnnouncement",
  created() {
    let e = sessionStorage.getItem('teacherId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/announcement?current=1&size=' + this.pageSize).then(function (resp) {
      _this.tableData = resp.data.data.records;
      _this.total = resp.data.data.total;
    })
  },
  methods: {
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8081/announcement?current=' + currentPage + '&size=' + this.pageSize).then(function (resp) {
        _this.tableData = resp.data.data.records;
        _this.total = resp.data.data.total;
      })
    },
    detail(index, row) {
      this.$router.push({name: '教师主页-公告详情', params: {announcementId: row.announcementId, userId: row.userId}})
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
.TeacherAnnouncement {
  width: 95%;
  margin: 20px 0 0 20px;
  height: 80%;
}
</style>