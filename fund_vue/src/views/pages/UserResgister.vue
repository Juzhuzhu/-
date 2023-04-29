<template>
  <div id="login">

    <h1 style="text-align: center;color:lightseagreen">股票型基金管理系统</h1>

    <div id="login-form">

      <h1>注册页面</h1>

      <label for="name"><i class="el-icon-price-tag" style="color: #c1c1c1"></i></label>
      <input type="text" placeholder="用户名" id="name" autocapitalize="off" v-model.trim=name
             aria-autocomplete="off">
      <p style="visibility: hidden">用户名为必填选项</p>

      <label for="phoneNumber"><i class="el-icon-user-solid" style="color: #c1c1c1"></i></label>
      <input type="text" placeholder="手机号" id="phoneNumber" autocapitalize="off" v-model.trim=phoneNumber
             aria-autocomplete="off">
      <p style="visibility: hidden">手机号为必填选项</p>

      <label for="password"><i class="el-icon-lock" style="color: #c1c1c1"></i></label>
      <input type="password" placeholder="密码" id="password" autocapitalize="off" v-model.trim="password">
      <p style="visibility: hidden">密码为必填选项</p>

      <label for="confirmPassword"><i class="el-icon-lock" style="color: #c1c1c1"></i></label>
      <input type="password" placeholder="确认密码" id="confirmPassword" autocapitalize="off"
             v-model.trim="confirmPassword">
      <p style="visibility: hidden">确认密码为必填选项</p>

      <div>
        <el-button type="primary" @click="doRegister(phoneNumber, name, password, confirmPassword)">注册</el-button>
        <el-button type="info" v-on:click="resetInfo">重置</el-button>
      </div>
      <p class="tips" style="color: #42b983">
        已有账号？<a style="color: aqua" href="/userLogin" type="warning">去登录</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      phoneNumber: "",
      name: "",
      password: "",
      confirmPassword: '',
      /*registerRule: {
        name: [{required: true, message: '请输入', trigger: 'blur'}],
        phoneNumber: [{required: true, message: '请输入', trigger: 'blur'}],
        password: [{required: true, message: '请输入', trigger: 'blur'}],
        confirmPassword: [{required: true, message: '请输入', trigger: 'blur'}]
      }*/
    };

  },
  created() {
  },
  methods: {
    resetInfo(){
      this.name = "";
      this.phoneNumber = "";
      this.password = "";
      this.confirmPassword = "";
    },

    doRegister(phoneNumber, name, password, confirmPassword) {
      if (!phoneNumber) {
        this.$message.error("请输入手机号！");
      }
      if (!name) {
        this.$message.error("请输入用户名！");
      }
      if (!password) {
        this.$message.error("请输入密码！");
      }
      if (!confirmPassword) {
        this.$message.error("请输入确认密码！");
      }
      if (this.phoneNumber !== '') {
        const phoneRule = /^1[3456789]\d{9}$/;
        if (!phoneRule.test(this.phoneNumber)) {
          this.$message.error("请输入有效的手机号！");
        }
      }
      if (!password || password.length < 8) {
        this.$message.error("密码长度应大于等于8位！");
      }
      if (confirmPassword !== password) {
        this.$message.error("两次密码输入不同！请重新输入");
      }
      var url = "http://127.0.0.1:8081/user/register";
      this.$axios({
        method: "post",
        url: url,
        data: {
          name: name,
          phoneNumber: phoneNumber,
          password: password,
          confirmPassword: confirmPassword
        }
      }).then(res => {
        //注册失败显示提示信息
        var result = res.data;
        if (!result.success) {
          this.$notify.error({
            title: '错误信息',
            message: result.message
          });
        } else {
          this.$notify({
            title: '成功',
            message: '注册成功，跳转至登录界面',
            type: 'success'
          });
          setTimeout(function () {
            console.log("等待了3秒钟");
          }, 5000);
          this.$router.push('/userLogin');
        }
      })
    }
  },
  watch: {
    phoneNumber: function checkPhoneNumber() {
      let p = document.querySelectorAll("p");
      if (this.phoneNumber.length === 0) {
        p[1].innerHTML = "请重新输入手机号";
        p[1].style.visibility = "visible";
      }
      if (this.phoneNumber !== '') {
        const phoneRule = /^1[3456789]\d{9}$/;
        if (!phoneRule.test(this.phoneNumber)) {
          p[1].innerHTML = "手机号格式不符，请输入有效的手机号！";
          p[1].style.visibility = "visible";
        }else {
          p[1].style.visibility = "hidden";
        }
      }
    }
    ,
    password: function f() {
      let p = document.querySelectorAll("p");
      if (this.password.length < 8) {
        p[2].style.visibility = "visible";
        p[2].innerHTML = "用户密码应大于 8 ";
      }
      if (this.password.length >= 8) {
        p[2].style.visibility = "hidden";
      }
      if (this.password.length === 0) {
        p[2].innerHTML = "请重新输入密码";
        p[2].style.visibility = "visible";
      }
    }
    ,
    confirmPassword: function f() {
      let p = document.querySelectorAll("p");
      if (this.confirmPassword.length < 8) {
        p[3].style.visibility = "visible";
        p[3].innerHTML = "用户密码应大于 8 ";
      }
      if (this.confirmPassword.length >= 8) {
        p[3].style.visibility = "hidden";
      }
      if (this.password !== this.confirmPassword) {
        p[3].innerHTML = "两次密码输入不同";
        p[3].style.visibility = "visible";
      }
    }
    ,

  }
}
</script>

<style lang="less" scoped>
#login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  // 背景图片样式
  background-image: url("~@/assets/background.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

#login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  // 表单 box-shadow 样式 好看
  box-shadow: 0 15px 25px rgba(0, 0, 0, .5);

  h1 {
    width: 60%;
    margin: 50px auto 0;
    color: #c1c1c1;
    text-align: center;
  }

  input {
    width: 60%;
    margin: 0 auto;
    // 注意 border outline 默认值
    outline: none;
    border: none;
    padding: 10px;
    border-bottom: 1px solid #fff;
    background: transparent;
    color: white;
  }

  label {
    width: 60%;
    margin: 0 auto;
    position: relative;
    top: 30px;
    left: -156px;
  }

  div {
    width: 60%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  button {
    // rgba
    background-color: rgba(9, 108, 144, 0.5);
    margin: 10px 25px 40px 25px;
  }

  p {
    width: 60%;
    margin: 8px auto;
    position: relative;
    left: -15px;
    color: #ff0000;
    font-size: 8px;
  }
}

// 浏览器兼容 , 针对谷歌浏览器 默认设置的 奇怪样式
input {
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out, width 1s ease-out !important;
}

</style>
