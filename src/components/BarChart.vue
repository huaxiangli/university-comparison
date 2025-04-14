<template>
  <div class="echarts-container">
    <VChart class="chart" :option="option" autoresize />
  </div>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

export default {
  name: 'BarChart',
  components: {
    VChart
  },
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  computed: {
    option() {
      const indicatorColors = {
        '高端人才': '#5470C6',
        '平台项目': '#91CC75',
        '成果获奖': '#FAC858',
        '学术论文': '#EE6666',
        '人才培养': '#73C0DE'
      }

      // 计算最大值的120%作为x轴最大值，确保所有数据都能完整显示
      const maxValue = Math.max(...this.chartData.datasets.flatMap(d => d.data)) * 4

      return {
        title: {
          text: '五项指标数据对比',
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: this.chartData.labels,
          top: 30
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          data: this.chartData.datasets.map(item => item.label),
          axisLine: {
            show: false // 隐藏轴线
          },
          axisTick: {
            show: false // 隐藏刻度线
          },
          splitLine: {
            show: false // 隐藏网格线
          }
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          max: 500,
          axisLine: {
            show: false // 隐藏轴线
          },
          axisTick: {
            show: false // 隐藏刻度线
          },
          splitLine: {
            show: false // 隐藏网格线
          },
          axisLabel: {
            show: false // 隐藏数值标签
          }
        },
        series: this.chartData.labels.map((label, index) => ({
          name: label,
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          itemStyle: {
            color: indicatorColors[label]
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
          },
          data: this.chartData.datasets.map(item => item.data[index]),
          
        })),
      }
    }
  }
}
</script>

<style scoped>
.echarts-container {
  width: 100%;
  height: 190px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>