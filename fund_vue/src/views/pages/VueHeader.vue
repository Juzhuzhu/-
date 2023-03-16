<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">
      <router-link to="/userResgister">注册</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/userLogin">登录</router-link>
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title">我的工作台</template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-menu-item index="3-3">选项3</el-menu-item>
      <el-submenu index="3-4">
        <template slot="title">选项4</template>
        <el-menu-item index="3-4-1">选项1</el-menu-item>
        <el-menu-item index="3-4-2">选项2</el-menu-item>
        <el-menu-item index="3-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="4" disabled>消息中心</el-menu-item>
    <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "vueHeader"
}
</script>

<style scoped>

</style>