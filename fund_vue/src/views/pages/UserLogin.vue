<!--
<template>
  <div class="login" clearfix>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
          <h3>登录</h3>
          <hr>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <router-link to="/">找回密码</router-link>
          &scnap;
          <router-link to="/userResgister">注册账号</router-link>
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "userLogin",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  created() {},
  methods: {
    doLogin() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        //校验用户名和密码是否正确;
        // this.$router.push({ path: "/personal" });
        axios
            .post("/login/", {
              name: this.user.username,
              password: this.user.password
            })
            .then(res => {
              // console.log("输出response.data.status", res.data.status);
              if (res.data.status === 200) {
                this.$router.push({ path: "/personal" });
              } else {
                alert("您输入的用户名或密码错误！");
              }
            });
      }
    }
  }


}
</script>

<style scoped>

.login {
  width: 100%;
  height: 740px;
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
  line-height: 40px;
}
#password {
  margin-bottom: 5px;
}
h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
a {
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}
a:hover {
  color: coral;
}
.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>-->
<template>
  <div class="Login">
    <div class="login-box">
      <el-form :model="loginForm" :rules="loginRule" ref="loginRef"  label-width="100px" class="demo-ruleForm loginForm">
        <el-form-item label="账号" prop="userName" label-width="60px">
          <el-input v-model="loginForm.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="60px">
          <el-input v-model="loginForm.password"  type="password" show-password @keyup.enter.native="keyDown"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" round @click="login">登录</el-button>
          <el-button type="primary" round @click="register">
            <router-link to="/userResgister">注册</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="~@/assets/background.jpg" width="100%">
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data(){
    // 用户名的校验方法
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      // 用户名以字母开头,长度在5-16之间,允许字母数字下划线
      const userNameRule = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
      if (userNameRule.test(value)) {
        this.$refs.loginRef.validateField("checkPass");
        return callback();
      } else {
        return callback(new Error("字母开头,长度5-16之间,允许字母数字下划线"));
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
        this.$refs.loginRef.validateField("checkPass");
        return callback();
      } else {
        return callback(
            new Error("字母开头,长度6-18之间,允许字母数字和下划线")
        );
      }
    };
    return{
      loginForm:{
        userName:'',
        password:''
      },
      loginRule:{
        userName:[{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }

    }
  },
  methods:{
    ...mapActions(['setUser']),
    login(){
      // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，
      // 并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.loginRef.validate(async valid=> {
        // valid回调函数里面的Boolean值，实验的结果
        if (!valid)//  valid为false不发起请求，valid为true时才能发出请求
          return;

        //    发起网络请求，提交数据
        const res = await this.$http.post('/api//users/login',this.loginForm)
        // console.log(res)
        if(res.status !== 200){
          return this.$message.error(res.data.msg)
        }
        this.$message.success(res.data.msg)
        //  1.将登录成功之后token，保存到客户端的sessionStorage中
        //  1.1 项目中除了登录页面之外的其他API接口，必须在登录之后才能访问
        // 1.2 token只应在当前网站打开期间生效，所以将token 保存在sessionStorage 中
        // window.sessionStorage.setItem("token",res.data.token);
        // 登录信息存到本地
        let user = JSON.stringify(res.data.user);
        localStorage.setItem("user", user);

        //提交到Vuex中的setUser方法中保存用户状态
        this.setUser(res.data.user)
        await this.$router.push({path:'/homeMain',query:{userName:this.loginForm.userName}})
        // this.login(); // 定义的登录方法
      })
    },
    register(){
      this.$router.push('/register')
    },
    // 点击回车键登录
    keyDown() {
      // 回车则执行登录方法 enter键的ASCII是13
      // if (e.keyCode === 13) {
      this.login(); // 定义的登录方法
      // }
    },

  },
}
</script>

<style>
.Login .login-box{
  /*background-color:#2B2B2B;*/
  background:rgba(0,0,0,0.3);
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
.loginForm{
  width: 400px;
  padding: 20px;
}
.el-textarea__inner,.el-input__inner{
  background: transparent !important;
  color: white;
}

</style>
