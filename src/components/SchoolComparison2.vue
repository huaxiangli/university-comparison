<template>
  <div class="comparison-container">
    <!-- 标题 -->
    <div class="header">
      <h1>高校数据对比</h1>
    </div>
    
    <!-- 标签页 -->
    <el-tabs v-model="activeTab"  @tab-click="handleTabClick">
      <el-tab-pane 
        v-for="(tab, index) in tabs" 
        :key="index" 
        :label="tab.label" 
        :name="tab.name"
      >
        <div class="tables-container">
          <el-card shadow="never" class="data-card">
            <h3>人才培养质量</h3>
            <el-table :data="currentData.talentData" border style="width: 100%">
              <el-table-column 
                v-for="(header, index) in currentData.talentHeaders" 
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
            <el-table :data="currentData.teacherData" border style="width: 100%">
              <el-table-column 
                v-for="(header, index) in currentData.teacherHeaders" 
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
            <el-table :data="currentData.researchData" border style="width: 100%">
              <el-table-column 
                v-for="(header, index) in currentData.researchHeaders" 
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import axios from 'axios'


export default {
  data() {
    return {
      activeTab: 'tab1', // 当前激活的标签页
      tabs: [
        { label: '标签页1', name: 'tab1' },
        { label: '标签页2', name: 'tab2' }
      ],
      allData: {}, // 存储所有标签页数据
      currentData: {}, // 当前显示的标签页数据
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleTabClick(tab) {
      const tabName = tab.paneName;
      console.log('切换到标签页:', tabName);
      this.currentData = this.allData[tabName];
    },
    fetchData() {
      this.loading = true
      axios.get('/api/compare-data',{
        headers: {
          'Accept': 'application/json' // 明确要求JSON响应
        }
      })
        .then(response => {
          if (response.data.code === 200) {
            this.allData = response.data.data
            this.currentData = this.allData[this.activeTab]
          }
        })
        .catch(error => {
          console.error('获取数据失败:', error)
          this.$message.error('数据加载失败, catch')
        })
        .finally(() => {
          this.loading = false
        })
    },
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

.tables-container {
  margin-top: 20px;
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

/* 标签页样式调整 */
.el-tabs {
  margin-top: 20px;
}

.el-tabs--card >>> .el-tabs__header {
  border-bottom: none;
}

.el-tabs--card >>> .el-tabs__item {
  border: 1px solid #dcdfe6;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  margin-right: 5px;
}

.el-tabs--card >>> .el-tabs__item.is-active {
  border-bottom-color: #fff;
  background: #f5f7fa;
}
</style>