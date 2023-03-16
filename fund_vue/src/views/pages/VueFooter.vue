<template>
  <div class='footer'>
    <span class="scroll"></span>
    <el-divider></el-divider>
    <span>法律声明</span>
    <el-divider direction="vertical"></el-divider>
    <span>友情链接</span>
    <el-divider direction="vertical"></el-divider>
    <span @click="drawer = true">联系我</span>
    <br/>
    <br/>
    <span class="copyright">版权所有 Juzhuzhu</span>
    <el-drawer
        title="联系我"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
      <p class='info'>
        <i class="el-icon-phone"></i>电话：18822299999<br/>
        <i class="el-icon-message"></i>邮箱：18822299999@163.com<br/>
      </p>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "vueFooter"
}
</script>

<style scoped>

</style>