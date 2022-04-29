<template>
  <div class="TeacherTopic">
    <el-table :data="tableData">
      <el-table-column
          prop="topicId"
          label="课题编号">
      </el-table-column>
      <el-table-column
          prop="topicName"
          label="课题名称">
      </el-table-column>
      <el-table-column
          prop="topicType"
          label="课题类型">
      </el-table-column>
      <el-table-column
          prop="topicSource"
          label="课题来源">
      </el-table-column>
      <el-table-column
          prop="state"
          label="是否通过审核">
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
              icon="el-icon-tickets"
              icon-color="red"
              title="确定删除此课题吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
              @cancel="noHandleDelete"
          >
            <el-button
                slot="reference"
                size="mini"
                type="danger"
                plain>删除课题
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
  name: "TeacherTopic",
  created() {
    const _this = this
    axios.get('http://localhost:8081/topic/teacher?current=1&size=' + this.pageSize + '&teacherId=' + sessionStorage.getItem('teacherId')).then(function (resp) {
      let topics = resp.data.data.records;
      for (let topic of topics) {
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
        if (topic.state == 0) {
          topic.state = '未审核'
        }
        if (topic.state == 1) {
          topic.state = '通过'
        }
        if (topic.state == 2) {
          topic.state = '不通过'
        }
      }
      _this.tableData = topics;
      _this.total = resp.data.data.total;
    })
  },
  methods: {
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8081/topic/teacher?current=' + currentPage + '&size=' + this.pageSize + '&teacherId=' + sessionStorage.getItem('teacherId')).then(function (resp) {
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
      this.$router.push({name: '教师主页-课题详情', params: {topicId: row.topicId}})
    },
    handleEdit(index, row) {
      this.$router.push({name: '教师主页-课题编辑', params: {topicId: row.topicId}})
    },
    handleDelete(index, row) {
      axios.delete('http://localhost:8081/topic?id=' + row.topicId).then(res => {
        if (res.data.data == true) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(error => {
        console.log(error)
      }, 1000 * 60)
      location.reload();
    }
  },
  data() {
    return {
      tableData: [],
      pageSize: 7,
      total: 20,
      currentPage: 1
    }
  }
}
</script>

<style scoped>
.TeacherTopic {
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