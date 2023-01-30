<!-- <template>
  <div>
    <el-card class="login-container">
      <div slot="header" class="login-header">
        <span>用户登录</span>
      </div>
      <el-form v-bind:model="loginForm" v-bind:rules="rules" ref="loginFormRef" label-width="80px" class="login_form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item class="form_btn">
          <el-button type="primary" @click="submitForm('loginFormRef')">提交</el-button>
          <el-button type="info" @click="resetForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {login} from '../api/api.js'
  export default {
    name: 'login',
    data() {
      return {
        //登录表单数据绑定对象
        loginForm: {
          username: '',
          password: ''
        },
        //表单验证规则对象
        rules: {
          username: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let params = {
              username: this.loginForm.username,
              password: this.$md5(this.loginForm.password),
            }
            // await login(this.$qs.stringify(params)).then((res) => {
            //   console.log(res.data)
            //   if (res.data.state) {
            //     this.$message.success("登录成功")
            //     localStorage.setItem("loginsystemtoken", res.data.token)
            //     localStorage.setItem("username", this.loginForm.username)
            //     localStorage.setItem("usertype", res.data.usertype)
            //     //2.用户跳转到首页
            //    this.$router.push('/layout')
            //   }
            // }).catch(err => {
            //   console.log(err)
            // })

            //2.用户跳转到首页
            this.$router.push('/layout')
          } else {
            this.$message.error("请输入用户名和密码")
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped="scoped">
  .login-container {
    width: 35%;
    height: 45%;
    border-radius: 3px;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .login-header {
    text-align: center;
  }

  .form_btn {
    display: flex;
    justify-content: space-between;
  }

  .el-button {
    margin-left: -20px;
    margin-right: 60px;
  }
</style> -->
