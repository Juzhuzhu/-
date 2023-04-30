<template>
  <div id="app">
    <el-container style="min-height: 100vh">
      <!--  el-container    style="min-height: 100vh"  footer沉底-->
      <el-header>
        <vue-header></vue-header>
      </el-header>
      <el-main style="height: 500px; ">
        <el-row>
          <el-col :span="3">
            <div class="grid-content bg-purple vertical-text">
              <p class="text">股票型基金管理系统</p>
            </div>
          </el-col>
          <el-col :span="21">
            <router-view/>
          </el-col>
<!--          <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>-->
        </el-row>
      </el-main>
      <el-footer>
          <vue-footer></vue-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import vueFooter from "@/views/pages/VueFooter.vue";
import vueHeader from "@/views/pages/VueHeader.vue";
export default {
  name: "layout",
  components:{
    vueFooter,
    vueHeader
  },
  data() {
    return {
      radio: '1'
    };
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
/*.bg-purple {*/
/*  background: #d3dce6;*/
/*}*/
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.vertical-text {
  display: flex;
  align-items: center;
  height: 600px;
  /*background-color: #f0f0f0;*/
  background-image: url("~@/assets/layoutbg.jpg");
}
.text {
  margin-left: 30%;
  font-size: 56px;
  writing-mode: vertical-rl;
  text-orientation: upright;

  font-family: 'Montserrat', sans-serif; /* 使用 Montserrat 字体 */
  letter-spacing: 2px; /* 字间距 */
  line-height: 1.5; /* 行高 */
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2); /* 添加文字阴影 */
}
</style>