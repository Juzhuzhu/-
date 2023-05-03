<template>
  <div>
    <!--表格-->
    <div style="margin-left: 120px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="主键id" width="100" v-if="false"></el-table-column>
        <el-table-column prop="userId" label="用户id" width="100" v-if="false"></el-table-column>
        <el-table-column prop="fundId" label="基金序号" width="120"></el-table-column>
        <el-table-column prop="fundCode" label="基金代码" width="120"></el-table-column>
        <el-table-column prop="fundName" label="基金名称" width="300"></el-table-column>
        <el-table-column prop="fundDate" label="基金日期" width="120"></el-table-column>
        <el-table-column prop="tradeType" label="交易类型" width="120"></el-table-column>
        <el-table-column prop="transactionAmount" label="交易金额" width="120"></el-table-column>
        <el-table-column prop="transactionTime" label="交易时间" width="220"></el-table-column>
        <!--        <el-table-column label="操作" width="100">
                  <template>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">
                      卖出
                    </el-button>
                  </template>
                </el-table-column>-->
      </el-table>
    </div>
    <br>
    <!--  分页  -->
    <div class="block">
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
</template>

<script>
export default {
  name: "fundTransactionRecord",
  created() {
    this.transactionRecordSearch(this.pageInfo.pageNumber, this.pageInfo.pageSize)
  },
  data() {
    return {
      tableData: [],
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  methods: {
    transactionRecordSearch(pageNumber, pageSize) {
      const url = "http://127.0.0.1:8081/fund/transaction/record"
      const token = localStorage.getItem("token");
      this.$axios({
        method: "post",
        url: url,
        headers: {token: token},
        data: {pageNumber: pageNumber, pageSize: pageSize}
      }).then(res => {
        //获取表格数据
        this.tableData = res.data.data.records;
        //获取页码数据
        this.pageInfo.pageNumber = res.data.data.current;
        this.pageInfo.pageSize = res.data.data.size;
        this.pageInfo.total = res.data.data.total;
      })
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.transactionRecordSearch(this.pageInfo.pageNumber, this.pageInfo.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pageNumber = val;
      this.transactionRecordSearch(this.pageInfo.pageNumber, this.pageInfo.pageSize);
    },
  }
}
</script>

<style scoped>

</style>