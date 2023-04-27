<!--
<template>
  <div class="login clearfix">
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" status-icon label-width="80px">
          <h3>注册</h3>
          <hr>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="设置密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon @click="doRegister()">注册账号</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "userResgister",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
    };
  },
  created() {
    // console.log($);
    // console.log("1111");
  },
  methods: {
    doRegister() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.email) {
        this.$message.error("请输入邮箱！");
        return;
      } else if (this.user.email != null) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.user.email)) {
          this.$message.error("请输入有效的邮箱！");
        } else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        } else {
          // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
          axios
              .post("/register/", {
                name: this.user.username,
                email: this.user.email,
                password: this.user.password
              })
              .then(res => {
                // console.log("输出response.data", res.data);
                // console.log("输出response.data.status", res.data.status);
                if (res.data.status === 200) {
                  this.$router.push({ path: "/" });
                } else {
                  alert("您输入的用户名已存在！");
                }
              });
        }
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: auto;
  background: url("~@/assets/bg1.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
}
.login-wrap {
  background: url("~@/assets/bg1.jpg") no-repeat;
  background-size: cover;
  width: 400px;
  height: 300px;
  margin: 215px auto;
  /*overflow: hidden;*/
  padding-top: 10px;
  line-height: 20px;
}

h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}

.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>-->
<template>
  <div class="Register-box">
    <div class="Register">
      <el-form :model="registerForm" :rules="registerRule" ref="registerRef" label-width="100px"
               class="demo-ruleForm registerForm">
        <el-form-item label="用户名" prop="userName" label-width="70px">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber" label-width="70px">
          <el-input v-model="registerForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="70px">
          <el-input v-model="registerForm.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" label-width="70px">
          <el-input v-model="registerForm.confirmPassword" type="password" show-password
                    @keyup.enter.native="keyDown"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" round @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="~@/assets/background.jpg" width="100%">
  </div>

</template>

<script>
export default {
  name: "Register",
  data() {
    // 用户名的校验方法
    /*let validateName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入用户名"));
      }
      // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (userNameRule.test(value)) {
        this.$refs.registerRef.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
      }
    };*/
    // 手机号的校验方法
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入手机号"));
      }
      const phoneRule = /^[1][3-9][0-9]{9}$/;
      if (phoneRule.test(value)) {
        this.$refs.registerRef.validateField("checkPass");
        return callback();
      } else {
        return callback(
            new Error("请输入正确手机号")
        );
      }
    };
    // 密码的校验方法
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入密码"));
      }
      // 密码以字母开头,长度在6-18之间,允许字母数字和下划线
      const passwordRule = /^[a-zA-Z]\w{5,17}$/;
      if (passwordRule.test(value)) {
        this.$refs.registerRef.validateField("checkPass");
        return callback();
      } else {
        return callback(
            new Error("字母开头,长度6-18之间,允许字母数字和下划线")
        );
      }
    };
    // 确认密码的校验方法
    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入确认密码"));
      }
      // 校验是否以密码一致
      if (this.registerForm.password !== "" && value === this.registerForm.password) {
        this.$refs.registerRef.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("两次输入的密码不一致"));
      }
    };
    return {
      registerForm: {
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      },
      registerRule: {
        // userName: [{validator: validateName, trigger: "blur"}],
        phoneNumber: [{validator: validatePhone, trigger: "blur"}],
        password: [{validator: validatePass, trigger: "blur"}],
        confirmPassword: [{validator: validateConfirmPass, trigger: "blur"}]
      }
    }
  },
  methods: {
    /*register() {
      this.$refs.registerRef.validate(async valid => {
        // valid回调函数里面的Boolean值，实验的结果
        if (!valid)//  valid为false不发起请求，valid为true时才能发出请求
          return;

        //    发起网络请求，提交数据
        const res = await this.$http.post('/api/users/register', {
          userName: this.registerForm.userName,
          password: this.registerForm.password
        })
        console.log(res)
        if (res.status !== 200) {
          return this.$message.error(res.data.msg)
        }
        this.$message.success(res.data.msg)
        await this.$router.push('/login')

      })
    },*/
    register() {
      var url = "http://127.0.0.1:8081/user/register";
      this.$axios({
        method: "post",
        url: url,
        data: {
          name: this.registerForm.name,
          phoneNumber: this.registerForm.phoneNumber,
          password: this.registerForm.password,
          confirmPassword: this.registerForm.confirmPassword
        }
      }).then(res => {
        //注册失败显示提示信息
        var result = res.data;
        if (!result.success) {
          this.$notify.error({
            title: '错误信息',
            message: result.message
          });
          /*alert(result.message);
          this.$router.push('/UserResgister ');*/
        }else {
          this.$notify({
            title: '成功',
            message: '注册成功，三秒后跳转至登录界面',
            type: 'success'
          });
          setTimeout(function() {
            console.log("等待了3秒钟");
          }, 3000);
          this.$router.push('/UserLogin');
        }
      })
    },
    // 点击回车键登录
    keyDown() {
      this.register(); //
    },
  },
}
</script>

<style>
.Register {
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.registerForm {
  width: 400px;
  padding: 20px;
}

.el-textarea__inner, .el-input__inner {
  background: transparent !important;
  color: white;
}
</style>
