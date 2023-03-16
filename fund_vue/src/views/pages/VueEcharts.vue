<template>
  <div>
    <div id="newCharts"></div>
  </div>
</template>

<script>
export default {
  name: "vueEcharts",
  data() {
    return {
      fundCode: this.$route.query.fundCode,
      dataCount: [],
      xdata: [],
      ydata: [],
    }
  },
  mounted() {
    // alert(this.fundCode)
    this.$nextTick(function () {
      this.getChartsData(this.fundCode);
    });
  },
  methods: {
    // 获取图表需要的数据 并展示图表
    getChartsData(fundCode) {
      var url = "http://127.0.0.1:8081/fund/echarts";
      this.$axios({
        method: "post",
        url: url,
        async: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {fundCode: fundCode}
      }).then(res => {
        // this.eChartsData = res.data.data;
        /*this.dataCount = res.data.data.dataCount;
        this.xdata = res.data.data.xdata;
        this.ydata = res.data.data.ydata;*/

        //渲染echarts图表
        // 基于准备好的dom，初始化echarts实例
        //也可以通过$refs.newCharts的方式去获取到dom实例。
        const chartsDom = document.getElementById('newCharts');
        let myChart = this.$echarts.init(chartsDom);
        // let myChart = this.$echarts.init(document.getElementById('newCharts'));
        // 绘制图表
        myChart.setOption({
          /*color: ['#5983FE'],  // 关键加上这句话，legend的颜色和折线的自定义颜色就一致了
          legend: {
            icon: 'circle',
            // itemHeight: 6,  // 改变圆圈大小
            itemWidth: 10,//图标宽
            itemHeight: 6,//图标高
            orient: 'horizontal',
            left: '7%',
            textStyle: {
              fontSize: 12,
              color: '#666'
            }
          },
          grid: {
            top: 30,
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true,  // 是否显示刻度标签
          },
          tooltip: {
            trigger: 'axis',
            position: this.toolTipPos,
            formatter: function (param) {
              var usage = param[0].value === "" ? "-- " : Math.abs(param[0].value);
              var html = '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + param[0].color + ';"></span>';
              html += param[0].axisValue + " " + param[0].seriesName + '：' + usage ;
              return html;
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false, // 不留白，从原点开始
            axisLine: {       // 坐标轴 轴线
              show: true,  // 是否显示
              symbol: ['none', 'arrow'],  // 是否显示轴线箭头
              symbolSize: [6, 6], // 箭头大小
              symbolOffset: [0, 7],  // 箭头位置
              lineStyle: {
                color: '#ccc',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {    // 坐标轴刻度
              show: true,  // 是否显示
              inside: true,  // 是否朝内
              length: 3,     // 长度
              lineStyle: {   // 默认取轴线的样式
                color: '#ccc',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {    // 坐标轴标签
              show: true,  // 是否显示
              inside: false, // 是否朝内
              rotate: 0, // 旋转角度
              margin: 5, // 刻度标签与轴线之间的距离
              color: '#999',  // 默认取轴线的颜色
              interval: 5
            },
            data: res.data.data.xdata
          },
          yAxis: {
            min: 0,
            max: function (value) {
              return value.max + 50;
            },
            splitNumber: 3,
            axisLine: {    // 坐标轴 轴线
              show: true,  // 是否显示
              symbol: ['none', 'arrow'],  // 是否显示轴线箭头
              symbolSize: [6, 6],  // 箭头大小
              symbolOffset: [0, 7], // 箭头位置
              lineStyle: {
                color: '#ccc',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {      // 坐标轴的刻度
              show: true,    // 是否显示
              inside: true,  // 是否朝内
              length: 3,      // 长度
              lineStyle: {
                color: '#ccc',  // 默认取轴线的颜色
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {      // 坐标轴的标签
              show: true,    // 是否显示
              color: '#999',  // 默认轴线的颜色
            },
            splitLine: {    // gird 区域中的分割线
              show: true,   // 是否显示
              lineStyle: {
                color: '#E5E5E5',
                width: 0.7,
                type: 'dashed'   // dashed
              }
            },

          },
          series: [
            {
              name: '单位净值',
              data: res.data.data.ydata,
              type: 'line',
              symbol: 'true',  // 设置小圆点消失
              smooth: 0,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#5983FE'
                  }
                }
              },
            }
          ],*/
          title: {
            text: '历史净值走向图',
            left: 10
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: false
              },
              saveAsImage: {
                pixelRatio: 2
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            bottom: 90
          },
          dataZoom: [
            {
              type: 'inside'
            },
            {
              type: 'slider'
            }
          ],
          xAxis: {
            data: res.data.data.xdata,
            silent: false,
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            }
          },
          yAxis: {
            splitArea: {
              show: false
            }
          },
          series: [
            {
              type: 'bar',
              data: res.data.data.ydata,
              // Set `large` for large data amount
              large: true
            }
          ]
        })
      })
    },
  }
}

</script>

<style scoped>
#newCharts {
  width: auto;
  height: 480px;
}
</style>