<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1"  v-on:click="toFundList()">主页</el-menu-item>
    <!--    v-if 返回false隐藏，返回true显示-->
    <el-menu-item index="2" v-if="!checkLogin()">
      <router-link to="/userResgister">注册</router-link>
    </el-menu-item>
    <el-menu-item index="3" v-if="!checkLogin()">
      <router-link to="/userLogin">登录</router-link>
    </el-menu-item>
    <el-menu-item index="4" v-if="checkLogin()">当前用户：{{ name }}</el-menu-item>
    <el-submenu index="5" v-if="checkLogin()">
      <template slot="title">用户中心</template>
      <el-menu-item index="5-1" v-on:click="toUserInfo()">个人信息</el-menu-item>
      <el-menu-item index="5-2" v-on:click="toFundOwn()">持有基金</el-menu-item>
      <el-menu-item index="5-3" v-on:click="toRecord()">交易记录</el-menu-item>
      <!--      <el-submenu index="5-4">
              <template slot="title">选项4</template>
              <el-menu-item index="5-4-1">选项1</el-menu-item>
              <el-menu-item index="5-4-2">选项2</el-menu-item>
              <el-menu-item index="5-4-3">选项3</el-menu-item>
            </el-submenu>-->
    </el-submenu>
    <!--    <el-menu-item index="5" disabled>消息中心</el-menu-item>-->
    <el-menu-item index="6" v-if="checkLogin()" @error="errorHandler">
      <el-avatar shape="square" :size=50 :src="headImgUrl"></el-avatar>
    </el-menu-item>
    <el-menu-item index="7" v-if="checkLogin()" v-on:click="logout()">注销</el-menu-item>
    <!--    <el-menu-item index="6"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
  </el-menu>
</template>

<script>
export default {
  name: "vueHeader",
  data() {
    return {
      //登录状态
      isLogin: false,
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      name: localStorage.getItem("name"),
      headImgUrl: localStorage.getItem("headImgUrl"),
    }
  },
  methods: {
    //校验登录状态
    checkLogin() {
      if (localStorage.getItem("token") != null) {
        console.log("用户已登录");
        this.isLogin = true;
      }
      return this.isLogin;
    },
    //注销
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("headImgUrl");
      this.isLogin = false;
      this.id = "";
      this.token = "";
      this.name = "";
      this.headImgUrl = "";
      this.$message({
        message: '用户已注销',
        type: 'success'
      });
    },
    //头像加载失败fallback行为
    errorHandler() {
      return true
    },
    //前往用户个人信息界面
    toUserInfo() {
      this.$router.push({
        path: '/userInfo',
        query: {
          token: this.token,
        }
      });
    },
    //回到主页
    toFundList() {
      this.$router.push("/fundList");
    },
    //前往查看用户个人持有基金
    toFundOwn() {
      this.$router.push("/fundOwn");
    },
    //前往查看个人交易记录
    toRecord() {
      this.$router.push("/fundTransactionRecord");
    }
  },
}

</script>

<style scoped>

</style>