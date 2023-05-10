<template>
  <!-- Login -->
  <div id="login">

    <h1 style="text-align: center;color: burlywood">股票型基金管理系统</h1>

    <div id="login-form">
      <h1>登陆界面</h1>

      <label for="phoneNumber"><i class="el-icon-user-solid" style="color: #c1c1c1"></i></label>
      <input type="text" placeholder="手机号码" id="phoneNumber" autocapitalize="off" v-model.trim=phoneNumber
             aria-autocomplete="off">
      <p style="visibility: hidden">手机号码为必填选项</p>
      <label for="password"><i class="el-icon-lock" style="color: #c1c1c1"></i></label>
      <input type="password" placeholder="密码" id="password" autocapitalize="off" v-model.trim="password" v-on:keyup.enter="doLogin(phoneNumber, password)">
      <p style="visibility: hidden">密码为必填选项</p>
      <div>
        <el-button type="primary" @click="doLogin(phoneNumber, password)">登录</el-button>
        <el-button type="info" v-on:click="resetInfo">重置</el-button>
      </div>
      <p class="tips" style="color: #42b983">
        还没有帐号？<a style="color: aqua" href="/userResgister" type="primary">立即注册</a>
      </p>
    </div>

  </div>

</template>

<script>
export default {
  name: "userLogin",
  data() {
    return {
      phoneNumber: "",
      password: "",
    };
  },
  created() {
  },
  mounted() {
    // css transition 样式
    let input = document.querySelectorAll("input");
    let label = document.querySelectorAll("label")
    let is = document.querySelectorAll("i");
    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener("click", function () {
        input[i].style.width = '70%';
        input[i].style.transition = '1s';
        label[i].style.width = '70%';
        label[i].style.transition = '1s';
        is[i].style.color = '#037db3';
      })
      input[i].addEventListener("blur", function () {
        input[i].style.width = '60%';
        input[i].style.transition = '1s';
        label[i].style.width = '60%';
        label[i].style.transition = '1s';
        is[i].style.color = '#c1c1c1';
      })
    }
  },
  methods: {
    // 清空当前填写信息
    resetInfo: function () {
      this.name = "";
      this.password = "";
    },
    doLogin(phoneNumber, password) {
      if (!phoneNumber) {
        this.$message.error("请输入手机号！");
      }
      if (!password) {
        this.$message.error("请输入密码！");
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
      var url = "http://127.0.0.1:8081/user/login";
      this.$axios({
        method: "post",
        url: url,
        data: {
          phoneNumber: phoneNumber,
          password: password
        }
      }).then(res => {
        // console.log(res);
        let result = res.data.data;
        // console.log(result);
        //登录失败显示提示信息
        if (!res.data.success) {
          this.$notify.error({
            title: '错误信息',
            message: res.data.message
          });
        } else {
          // 登录后将用户信息设置在localStorage中，需要用时通过getItem(key)方法获取
          localStorage.setItem("token", result.token);
          localStorage.setItem("headImgUrl", result.headImgUrl);
          localStorage.setItem("id", result.id);
          localStorage.setItem("name", result.name);
          // var i = localStorage.getItem("token");
          // console.log("token:" + i);
          this.$notify({
            title: '成功',
            message: '登录成功，跳转至主界面',
            type: 'success'
          });
          setTimeout(function () {
            console.log("等待了5秒钟");
          }, 5000);
          this.$router.push('/fundList');
        }
      })
    }
  },
  watch: {
    // 动态监测,验证 input 中 值的输入
    phoneNumber: function checkPhoneNumber() {
      let p = document.querySelectorAll("p");
      if (this.phoneNumber.length < 1) {
        p[0].innerHTML = "用户名称应大于 1 ";
      }
      if (this.phoneNumber.length >= 1) {
        p[0].style.visibility = "hidden";
      }
      if (this.phoneNumber.length === 0) {
        p[0].style.visibility = "visible";
      }
    }
    ,
    password: function checkPassword() {
      let p = document.querySelectorAll("p");
      if (this.password.length < 8) {
        p[1].style.visibility = "visible";
        p[1].innerHTML = "用户密码应大于 8 ";
      }
      if (this.password.length >= 8) {
        p[1].style.visibility = "hidden";
      }
      if (this.password.length === 0) {
        p[1].innerHTML = "请重新输入密码";
        p[1].style.visibility = "visible";
      }
    }
  }
  ,

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
