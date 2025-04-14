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
      required: true,
      validator: (value) => {
        return value.labels && value.datasets
      }
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

      // 计算最大值
      const maxDataValue = Math.max(
        ...this.chartData.datasets.flatMap(d => d.data),
        ...this.chartData.datasets.map(d => d.total || 0)
      )
      const maxValue = Math.ceil(maxDataValue * 1.2)

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
          },
          formatter: params => {
            const schoolIndex = params[0].dataIndex
            const schoolName = this.chartData.datasets[schoolIndex].label
            let result = `<strong>${schoolName}</strong><br/>`
            
            // 显示各项指标值
            params.forEach(item => {
              if (item.seriesName !== 'background') {
                result += `${item.marker} ${item.seriesName}: ${item.value}<br/>`
              }
            })
            
            // 显示总计
            const total = this.chartData.datasets[schoolIndex].total || 0
            result += `<hr style="margin: 5px 0;border-top: 1px solid #eee;"/>总计: ${total}分`
            return result
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
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        xAxis: {
          type: 'value',
          max: maxValue,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [
          // 实际数据系列（必须先声明）
          ...this.chartData.labels.map((label, labelIndex) => ({
            name: label,
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            itemStyle: {
              color: indicatorColors[label],
              borderRadius: [0, 4, 4, 0]
            },
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}',
              color: '#fff'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            },
            data: this.chartData.datasets.map(dataset => dataset.data[labelIndex])
          })),
          // 背景系列（必须最后声明）
          {
            name: 'background',
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            silent: true,
            itemStyle: {
              color: '#F8F8F8',
              borderColor: '#E6E6E6',
              borderWidth: 1
            },
            label: {
              show: true,
              position: 'insideLeft',  // 修改为内部左侧
              formatter: (params) => {
                const dataset = this.chartData.datasets[params.dataIndex]
                return `${dataset.total || 0}分`  // 修改为"xxx分"格式
              },
              fontSize: 12,
              color: '#666',
              fontWeight: 'bold',
              offset: [10, 0]  // 向右偏移10像素
            },
            data: this.chartData.datasets.map(() => maxValue)
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.echarts-container {
  width: 100%;
  height: 200px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>