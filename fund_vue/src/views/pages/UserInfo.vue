<template>
  <div>
    <el-descriptions title="用户信息" border>
      <el-descriptions-item label="用户名">{{ name }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{ phoneNumber }}</el-descriptions-item>
      <el-descriptions-item label="用户状态">{{ userStateEnum }}</el-descriptions-item>
      <el-descriptions-item label="账户余额">
        {{ amount }}
        <el-button type="primary" plain @click="open">充值</el-button>
      </el-descriptions-item>
      <el-descriptions-item label="头像">
        <el-avatar shape="square" :size=100 :src="headImgUrl"></el-avatar>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ utcCreate }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      id: '',
      name: '',
      headImgUrl: '',
      phoneNumber: '',
      utcCreate: '',
      userStateEnum: '',
      amount: '',
    }
  },
  methods: {
    //查询用户信息
    getUserInfo() {
      const url = "http://127.0.0.1:8081/user/info";
      const token = localStorage.getItem("token");
      this.$axios({
        method: "post",
        url: url,
        headers: {
          token: token,
        }
      }).then(res => {
        if (res.data.success === true) {
          // console.log(res);
          const resultData = res.data.data;
          this.id = resultData.id;
          this.name = resultData.name;
          this.phoneNumber = resultData.phoneNumber;
          this.utcCreate = resultData.utcCreate;
          this.headImgUrl = resultData.headImgUrl;
          this.amount = resultData.amount;
          if (resultData.userStateEnum === "NORMAL") {
            this.userStateEnum = "正常用户";
          } else {
            this.userStateEnum = "禁用用户";
          }
        } else {
          this.$notify.error({
            title: '错误信息',
            message: res.data.message
          });
        }
      })
    },
    //打开充值框
    open() {
      this.$prompt('请输入充值金额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(\.[0-9]{2})?$/,
        inputErrorMessage: '输入金额格式不正确'
      }).then(({ value }) => {
        //调用购买的函数

        //todo 充值函数尚未实现
        this.$message({
          type: 'success',
          message: '充值金额是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消充值'
        });
      });
    },
  }
}
</script>

<style scoped>
</style>