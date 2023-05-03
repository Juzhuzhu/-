<template>
  <div>
    <br><br>
    <!--统计-->
    <div style="margin-left: 120px">
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-statistic group-separator="," :precision="2" :value="value2" title="持有数"></el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic title="盈亏比">
              <template slot="formatter"> 456/2</template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic group-separator="," :precision="2" decimal-separator="." :value="value1" title="利润">
              <template slot="prefix">
                <i class="el-icon-s-flag" style="color: red"></i>
              </template>
              <template slot="suffix">
                <i class="el-icon-s-flag" style="color: blue"></i>
              </template>
            </el-statistic>
          </div>
        </el-col>

      </el-row>
    </div>

    <br>
    <br>
    <!--表格-->
    <div style="margin-left: 120px">
      <el-table :data="tableData" style="width: 88%">
        <el-table-column prop="id" label="主键id" width="100" v-if="false"></el-table-column>
        <el-table-column prop="fundId" label="基金序号" width="120"></el-table-column>
        <el-table-column prop="fundCode" label="基金代码" width="120"></el-table-column>
        <el-table-column prop="fundName" label="基金名称" width="300"></el-table-column>
        <el-table-column prop="fundDate" label="基金日期" width="120"></el-table-column>
        <el-table-column prop="purchaseAmount" label="买入金额" width="120"></el-table-column>
        <el-table-column prop="balance" label="当前余额" width="120"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="open(scope.row)" type="text" size="small">
              卖出
            </el-button>
          </template>
        </el-table-column>
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
  name: "fundOwn",
  created() {
    this.fundOwnSearch(this.pageInfo.pageNumber, this.pageInfo.pageSize)
  },
  data() {
    return {
      tableData: [],
      pageInfo: {
        pageNumber: 1,
        pageSize: 7,
        total: 0,
      },

      like: true,
      value1: 4154.564,
      value2: 2222,
      title: '今年的增长',
    }
  },
  methods: {
    //分页查询用户持有基金信息
    fundOwnSearch(pageNumber, pageSize) {
      const url = "http://127.0.0.1:8081/fund/own"
      const token = localStorage.getItem("token");
      this.$axios({
        method: "post",
        url: url,
        headers: {token: token},
        data: {pageNumber: pageNumber, pageSize: pageSize}
      }).then(res => {
        // console.log("持有信息：" + res);
        //获取表格数据
        this.tableData = res.data.data.records;
        //获取页码数据
        this.pageInfo.pageNumber = res.data.data.current;
        this.pageInfo.pageSize = res.data.data.size;
        this.pageInfo.total = res.data.data.total;
      })
    },
    //弹出框框校验
    open(row) {
      this.$confirm('此操作将售出该持有基金, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定进行的操作
        this.fundSale(row);
      }).catch(() => {
        // 点击取消进行的操作
      });
    },
    //用户基金交易-售出持有基金
    fundSale(row) {
      const url = "http://127.0.0.1:8081/fund/sale";
      const token = localStorage.getItem("token");
      this.$axios({
        method: "post",
        url: url,
        async: false,
        headers: {
          token: token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {id: row.id}
      }).then(res => {
        if (res.data.success) {
          this.$message({
            message: '卖出成功',
            type: 'success'
          });
          this.fundOwnSearch(this.pageInfo.pageNumber, this.pageInfo.pageSize);
        } else {
          this.$message.error(res.data.message);
        }
      })
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.fundOwnSearch(this.pageInfo.pageNumber, this.pageInfo.pageSize);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.pageNumber = val;
      this.fundOwnSearch(this.pageInfo.pageNumber, this.pageInfo.pageSize);
    },
  }
}
</script>

<style scoped>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>