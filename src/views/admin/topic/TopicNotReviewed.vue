<template>
  <div class="TopicNotReviewed">
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

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              plain
              @click="handleEdit(scope.$index, scope.row)">审核课题
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
  name: "TopicNotReviewed",
  created() {
    let e = sessionStorage.getItem('userId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/topic/NotReviewed?current=1&size=' + this.pageSize).then(function (resp) {
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
          _this.flag = false
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
      axios.get('http://localhost:8081/topic/NotReviewed?current=' + currentPage + '&size=' + this.pageSize).then(function (resp) {
        _this.tableData = resp.data.data.records;
        _this.total = resp.data.data.total;
      })
    },
    handleEdit(index, row) {
      this.$router.push({name: '审核课题', params: {topicId: row.topicId}})
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
.TopicNotReviewed {
  width: 95%;
  margin: 20px 0 0 20px;
  height: 80%;
}
</style>