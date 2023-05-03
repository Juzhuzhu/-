<template>
  <div>
    <div style="width: 74%;float: left">
      <h1>基金历史净值</h1>
      <!--头部信息-->
      <el-descriptions title="基金信息" style="height: 100px;margin: 0 auto">
        <el-descriptions-item label="基金代码">{{ this.$route.query.fundCode }}</el-descriptions-item>
        <el-descriptions-item label="基金名称">{{ this.$route.query.fundName }}</el-descriptions-item>
      </el-descriptions>
      <!--表格信息-->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="fundDate" label="基金日期" width="180"></el-table-column>
        <el-table-column prop="fundNav" label="单位净值" width="180"></el-table-column>
        <el-table-column prop="fundDgr" label="日增长率" width="180"></el-table-column>
        <el-table-column prop="subsribeState" label="申购状态" width="180"></el-table-column>
        <el-table-column prop="redeemState" label="赎回状态" width="180"></el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" >
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync=this.pageInfo.pageNumber
            :page-size=this.pageInfo.pageSize
            layout="total, prev, pager, next"
            :total=this.pageInfo.total>
        </el-pagination>
      </div>
    </div>
    <!--图表区域-->
    <div style="float: left;width: 26%;height: 500px">
      <vue-echarts></vue-echarts>
    </div>
  </div>
</template>

<script>
import vueEcharts from "@/views/pages/VueEcharts.vue";

export default {
  name: "fundHistory",
  components: {
    vueEcharts
  },
  mounted() {
    this.getFundHistory(this.$route.query.fundCode, this.pageInfo.pageNumber, this.pageInfo.pageSize);
  },
  data() {
    return {
      tableData: [],
      pageInfo: {
        pageNumber: 1,
        pageSize: 5,
        total: 0,
      }
    }
  },
  methods: {
    //查询历史净值
    getFundHistory(fundCode, pageNumber, pageSize) {
      const url = "http://127.0.0.1:8081/fund/history";
      this.$axios({
        method: "post",
        url: url,
        data: {fundCode: fundCode, pageNumber: pageNumber, pageSize: pageSize}
      }).then(res => {
        //获取表格数据
        console.log(res)
        //获取表格数据
        this.tableData = res.data.data.records;
        //获取页码数据
        this.pageInfo.pageNumber = res.data.data.current;
        this.pageInfo.pageSize = res.data.data.size;
        this.pageInfo.total = res.data.data.total;
      })
    },
    //分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getFundHistory(this.$route.query.fundCode, this.pageInfo.pageNumber, this.pageInfo.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pageNumber = val;
      this.getFundHistory(this.$route.query.fundCode, this.pageInfo.pageNumber, this.pageInfo.pageSize);
    },
  }

}
</script>

<style scoped>

</style>