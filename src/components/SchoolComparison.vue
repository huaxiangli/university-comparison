<template>
  <div class="comparison-container">
    <!-- 标题 -->
    <div class="header">
      <h1>高校数据对比</h1>
    </div>

    <!-- 横向条形图和排名表格 -->
    <div class="chart-and-table">
      <div class="chart-container">
        <BarChart :chartData="chartData" />
      </div>
      <div class="rank-table-container">
        <el-table 
        :data="rankData" 
        style="width: 100%" 
        :border="false"
        class="no-border-table el-table__row">
          <el-table-column prop="rank" label="排名" width="80" />
          <el-table-column prop="percentile" label="百分位段" width="100" />
          <el-table-column prop="assessment" label="第四轮" width="80" />
        </el-table>
      </div>
    </div>

    <!-- 详细数据表格 -->
    <div class="tables-container">
      <!-- 高端人才表格 -->
      <el-card shadow="never" class="data-card">
        <h3>高端人才</h3>
        <el-table :data="talentData" border style="width: 100%">
          <el-table-column 
            v-for="(header, index) in talentHeaders" 
            :key="index" 
            :prop="`col${index}`" 
            :label="header"
            :min-width="index === 0 ? '180px' : '120px'">
            <template #default="scope">
              {{ scope.row[index] }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 平台项目表格 -->
      <el-card shadow="never" class="data-card">
        <h3>平台项目</h3>
        <el-table :data="projectData" border style="width: 100%">
          <el-table-column 
            v-for="(header, index) in projectHeaders" 
            :key="index" 
            :prop="`col${index}`" 
            :label="header"
            :min-width="index === 0 ? '180px' : '120px'">
            <template #default="scope">
              {{ scope.row[index] }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.vue'

export default {
  components: {
    BarChart
  },
  data() {
    return {
      chartData: {
        labels: ['高端人才', '平台项目', '成果获奖', '学术论文', '人才培养'],
        datasets: [
          {
            label: '复旦大学',
            data: [45, 120, 80, 93, 52],
            total: 390
          },
          {
            label: '杭州电子科技大学',
            data: [48, 137, 40, 54, 77],
            total: 356
          },
          {
            label: '南京理工大学',
            data: [49, 117, 115, 22, 88],
            total: 303
          }
        ]
      },
      rankData: [
        { name: '复旦大学', rank: '25', percentile: '前9%', assessment: 'A-' },
        { name: '杭州电子科技大学', rank: '28', percentile: '前10%', assessment: 'B+' },
        { name: '南京理工大学', rank: '34', percentile: '前12%', assessment: 'B+' }
      ],
      talentHeaders: ['指标', '总量年份', '南京理工大学', '复旦大学', '杭州电子科技大学', '中值'],
      talentData: [
        ['资深学术权威（人）', '1955-2024', '0', '0', '1', '0'],
        ['中年领军专家（人）', '2014-2023', '3', '5', '2', '5'],
        ['青年拔尖英才', '2014-2024', '10', '10', '3', '6.5'],
        ['国际知名学者（人）', '2023-2024', '4', '2.4', '2', '2.6']
      ],
      projectHeaders: ['指标', '总量年份', '南京理工大学', '复旦大学', '杭州电子科技大学', '中值'],
      projectData: [
        ['重大重点项目（万元）', '2019-2024', '962（4项）', '2312（4项）', '3193（3项）', '2578'],
        ['面上青年项目', '2019-2024', '73', '68', '46', '65'],
        ['科研平台（折合项）', '截至2024.12', '2.5', '2.5', '10', '6.3']
      ]
    }
  }
}
</script>

<style scoped>
.comparison-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

.chart-and-table {
  display: flex;
  margin-bottom: 30px;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}

.chart-container {
  flex: 3;
  /* background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}

.rank-table-container {
  flex: 1;
  padding-top: 20px;
  /* background: #fff;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}

.tables-container {
  margin-top: 30px;
}

.data-card {
  margin-bottom: 30px;
}

.data-card h3 {
  color: #333;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.el-table {
  margin-top: 10px;
}

/* 精确控制表格行高 */


</style>