<template>
  <div class="StudentMyThesis">
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
      <el-table-column
          width="100px"
          prop="state"
          label="是否通过">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-share"
              @click="download(scope.$index, scope.row)">下载论文
          </el-button>
          <el-button
              size="mini"
              type="success"
              plain
              icon="el-icon-upload"
              @click="handleEdit(scope.$index, scope.row)">更新论文
          </el-button>
          &nbsp
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='不用了'
              icon="el-icon-s-order"
              icon-color="red"
              title="确认要删除你的论文吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
              @cancel="noHandleDelete"
          >
            <el-button
                slot="reference"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                plain>删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StudentMyThesis",
  created() {
    let e = sessionStorage.getItem('studentId');
    if (e == null) {
      this.$router.push('/login')
    }
    const _this = this
    axios.get('http://localhost:8081/thesis/student/' + sessionStorage.getItem('studentId')).then(function (resp) {
      _this.tableData = resp.data.data;
      if (_this.tableData[0].state == 0) {
        _this.tableData[0].state = '未审核'
      }
      if (_this.tableData[0].state == 1) {
        _this.tableData[0].state = '通过'
        _this.flag = false
      }
      if (_this.tableData[0].state == 2) {
        _this.tableData[0].state = '不通过'
      }
    })
  },
  methods: {
    noHandleDelete() {
      this.$message({
        type: 'info',
        message: '取消删除'
      });
    },
    download(index, row) {
      window.open('http://localhost:8081/thesis/download/' + row.thesisName)
    },
    handleEdit() {
      this.$router.push('/StudentUploadThesis')
    },
    handleDelete(index, row) {
      axios.delete('http://localhost:8081/thesis?id=' + row.studentId).then(function () {
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
      tableData: []
    }
  }
}
</script>

<style scoped>
.StudentMyThesis {
  width: 95%;
  margin: 20px 0 0 20px;
  height: 80%;
}
</style>