<template>
  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-main">
      <h3 class="title">评估系统用户端登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submitLogin('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  
  data () {
    return {
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
   
    submitLogin (formName) {
       var that = this;
      this.$refs[formName].validate((valid) => {
       this.$axios.get('/login', {
    params: {
      phone:this.ruleForm.account,
      password:this.ruleForm.password
    }
  })
  .then(function (response) {
    console.log(response);
      if (response.data.resultCode === 200) {
         sessionStorage.setItem("session", response.data);
          that.$message({
            message: '登陆成功',
            type: 'success',
            duration: 2000
          })
          
           that.$router.push({ path:'index'})
       
        } else {
          that.$message({
            message: '登陆失败，可能是密码或用户名错误',
            type: 'error',
            duration: 2000
          })
        }
  })
  .catch(function (error) {
    console.log(error);
  });
      
      })
      
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
html,body{
  height:100%;margin:0;padding:0;
}
.login-container{overflow-y:hidden;width: 100vw; height: 100vh;background-image:url('../assets/login_bg.png'); background-size: cover; overflow: hidden;
  .login-main{   position: relative;top: 50%; /*偏移*/transform: translateY(-50%);-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; background-clip: padding-box; margin: 0 auto; width: 350px; padding: 35px 35px 15px; background: #fff; border: 1px solid #eaeaea; box-shadow: 0 0 25px #cac6c6;
    h3{text-align: center; margin-bottom: 30px}
    .btn-box{text-align: center;}
  }
}
</style>
