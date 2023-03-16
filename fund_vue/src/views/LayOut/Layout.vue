<template>
  <div id="app">
    <el-container style="min-height: 100vh">
      <!--  el-container    style="min-height: 100vh"  footer沉底-->
      <el-header>
        <vue-header></vue-header>
      </el-header>
      <el-main style="height: 500px; ">
        <router-view/>
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
</style>