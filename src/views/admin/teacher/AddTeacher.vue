<template>
  <div class="AddTeacher">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="teacherId">
        <el-tooltip class="item" effect="dark" content="教师工号最长14个字符" placement="left">
          <el-input placeholder="请输入教师工号" v-model="ruleForm.teacherId" prefix-icon="el-icon-user-solid" show-word-limit
                    maxlength="14">
          </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop="teacherName">
        <el-input placeholder="请输入教师姓名" v-model="ruleForm.teacherName" prefix-icon="el-icon-s-custom" show-word-limit
                  maxlength="12">
        </el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio-button disabled>选择教师性别：
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
            placeholder="请选择教师所属学院以及专业"
            style="width:250px"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item prop="teacherTitle">
        <el-select v-model="ruleForm.teacherTitle" style="width:250px" placeholder="请选择教师职称">
          <el-option label="助教" value="助教"></el-option>
          <el-option label="讲师" value="讲师"></el-option>
          <el-option label="副教授" value="副教授"></el-option>
          <el-option label="教授" value="教授"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-success" @click="submitForm(ruleForm,'ruleForm')">添加教师</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddTeacher",
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
        teacherId: '',
        password: '',
        role: 1,
        teacherName: '',
        teacherCollege: '',
        teacherMajor: '',
        sex: '',
        teacherTitle: ''
      },
      rules: {
        teacherId: [
          {required: true, message: '请输入教师工号', trigger: 'blur'},
          {min: 1, max: 14, message: '长度1到14个字符', trigger: 'blur'}
        ],
        teacherName: [
          {required: true, message: '请输入教师姓名', trigger: 'blur'},
          {min: 1, max: 12, message: '长度1到12个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择教师性别', trigger: 'change'}
        ],
        teacherTitle: [
          {required: true, message: '请选择教师职称', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(form, formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          form.password = form.teacherId;
          form.teacherCollege = this.value[0];
          form.teacherMajor = this.value[1];
          axios.post('http://localhost:8081/teacher/reg', form).then((resp) => {
            if (resp.data.data == true) {
              this.$message({
                type: 'success',
                message: '教师添加成功'
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
.AddTeacher {
  background-color: transparent;
  border-radius: 10px;
  width: 450px;
  margin: 60px 0 0 240px;
}
</style>