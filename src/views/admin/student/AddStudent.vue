<template>
  <div class="AddStudent">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="studentId">
        <el-tooltip class="item" effect="dark" content="学生学号最长14个字符" placement="left">
          <el-input placeholder="请输入学生学号" v-model="ruleForm.studentId" prefix-icon="el-icon-user-solid" show-word-limit
                    maxlength="14">
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop="studentName">
        <el-input placeholder="请输入学生姓名" v-model="ruleForm.studentName" prefix-icon="el-icon-s-custom" show-word-limit
                  maxlength="12">
        </el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio-button disabled>选择学生性别：
          </el-radio-button>
          <el-radio-button label="男">男
          </el-radio-button>
          <el-radio-button label="女">女
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-cascader
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            placeholder="请选择学生所属学院以及专业"
            style="width:250px"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">添加学生</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddStudent",
  created() {
    let e = sessionStorage.getItem('userId');
    if (e == null) {
      this.$router.push('/login')
    }
  },
  data() {
    return {
      value: [],
      options: [{
        value: '计算机与信息技术学院',
        label: '计算机与信息技术学院',
        children: [
          {
            value: '计算机科学与技术',
            label: '计算机科学与技术'
          },
          {
            value: '电子工程系',
            label: '电子工程系'
          }, {
            value: '自动化系',
            label: '自动化系'
          }, {
            value: '软件工程',
            label: '软件工程'
          }, {
            value: '大数据系',
            label: '大数据系'
          }
        ]
      },
        {
          value: '经济管理学院',
          label: '经济管理学院',
          children: [
            {
              value: '会计系',
              label: '会计系'
            },
            {
              value: '经济系',
              label: '经济系'
            }, {
              value: '市场营销系',
              label: '市场营销系'
            }
          ]
        },
        {
          value: '机械工程学院',
          label: '机械工程学院',
          children: [
            {
              value: '机械工程系',
              label: '机械工程系'
            },
            {
              value: '工业工程系',
              label: '工业工程系'
            }
          ]
        },
        {
          value: '马克思主义学院',
          label: '马克思主义学院',
          children: [
            {
              value: '马克思主义学院',
              label: '马克思主义学院'
            }
          ]
        }
      ],
      ruleForm: {
        studentId: '',
        password: '',
        role: 2,
        studentName: '',
        studentCollege: '',
        studentMajor: '',
        sex: ''
      },
      rules: {
        studentId: [
          {required: true, message: '请输入学生学号', trigger: 'blur'},
          {min: 1, max: 14, message: '长度1到14个字符', trigger: 'blur'}
        ],
        studentName: [
          {required: true, message: '请输入学生姓名', trigger: 'blur'},
          {min: 1, max: 12, message: '长度1到12个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择学生性别', trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          form.password = form.studentId;
          form.studentCollege = this.value[0];
          form.studentMajor = this.value[1];
          axios.post('http://localhost:8081/student/reg', form).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '学生添加成功'
              });
            } else {
              this.$message({
                type: 'error',
                message: resp.data.data
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.AddStudent {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 100px 0 0 240px;
}
</style>