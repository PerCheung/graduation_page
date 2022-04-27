<template>
  <div class="announcement">
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
              icon="el-icon-s-order"
              icon-color="red"
              title="确认要删除这个公告吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
              @cancel="noHandleDelete"
          >
            <el-button
                slot="reference"
                size="mini"
                type="danger"
                plain>删除
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
  name: "Announcement",
  created() {
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
    noHandleDelete() {
      this.$message({
        type: 'info',
        message: '取消删除'
      });
    },
    detail(index, row) {
      this.$router.push({name: '公告详情', params: {announcementId: row.announcementId, userId: row.userId}})
    },
    handleEdit(index, row) {
      this.$router.push({name: '修改公告', params: {announcementId: row.announcementId, userId: row.userId}})
    },
    handleDelete(index, row) {
      axios.delete('http://localhost:8081/announcement?id=' + row.announcementId).then(function () {
      })
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      location.reload();
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
.announcement {
  width: 95%;
  margin: 20px 0 0 20px;
  height: 80%;
}
</style>