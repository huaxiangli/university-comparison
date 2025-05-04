<template>
  <div class="comparison-container">
    <!-- 标题 -->
    <div class="header">
      <h1>高校数据对比</h1>
    </div>
    <div class="tables-container">
      <el-card shadow="never" class="data-card">
        <h3>人才培养质量</h3>
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
      <el-card shadow="never" class="data-card">
        <h3>师资队伍与资源</h3>
        <el-table :data="teacherData" border style="width: 100%">
          <el-table-column 
            v-for="(header, index) in teacherHeaders" 
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
      <el-card shadow="never" class="data-card">
        <h3>科学研究水平</h3>
        <el-table :data="researchData" border style="width: 100%">
          <el-table-column 
            v-for="(header, index) in researchHeaders" 
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

export default {
  data() {
    return {
      talentHeaders: ['核心指标',  '南京理工大学', '北京理工大学', '西北工业大学'],
      talentData: [
        ['思想政治教育主要成效', '3', '0', '1'],
        ['出版教材质量', '20（4）', '0', '0'],
        ['国家级一流课程', '2', '0', '1'],
        ['教学成果奖（国家级）', '2（廖文和、梅锦春）', '0', '0'],
        ['教学成果奖（其他）', '1牵头1参与', '无数据', '无数据']

      ],
      teacherHeaders: ['核心指标',  '南京理工大学', '北京理工大学', '西北工业大学'],
      teacherData: [
        ['师德师风建设主要成效', '3', '3', '2'],
        ['国家级平台', '5牵头，2参与', '4', '1'],
        ['教育部平台、国防重点学科实验室', '3牵头1参与', '0', '0'],
        ['其他代表性支撑平台', '6牵头2参与', '', ''],
        ['重大仪器设备', '5（4535万）', '', '']
      ],
      researchHeaders: ['核心指标',  '南京理工大学', '北京理工大学', '西北工业大学'],
      researchData: [
        ['学术论文质量（限30篇）',  '', '', ''],
        ['专利转化情况', '15(1434.5万)', '', ''],
        ['国家级科研项目', '39', '', ''],
        ['重要军队国防项目', '92', '', ''],
        ['其他代表性科研项目', '40', '', ''],
        ['国家级科研奖励', '2牵头1参与', '0', '1'],
        ['教育部奖、军队国防奖、中国专利奖', '19牵头11参与', '无数据', ''],
        ['其他代表性科研奖励', '4牵头8参与', '无数据', '']
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
  margin-bottom: 50px;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}

.chart-container {
  flex: 2;
  /* background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}

.rank-table-container {
  flex: 1;
  padding-top: 15px;
  /* background: #fff;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */

}
.el-table--fit .el-table__inner-wrapper:before {
    width: 0% !important;
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