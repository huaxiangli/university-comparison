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
// 模拟从API获取的JSON数据
const jsonData = {
  "兵器":{
      "talentHeaders": ["核心指标",  "南京理工大学", "北京理工大学", "西北工业大学"],
      "talentData": [
        ["思想政治教育主要成效", "3", "0", "1"],
        ["出版教材质量", "20（4）", "0", "0"],
        ["国家级一流课程", "2", "0", "1"],
        ["教学成果奖（国家级）", "2（廖文和、梅锦春）", "0", "0"],
        ["教学成果奖（其他）", "1牵头1参与", "无数据", "无数据"]
      ],
      "teacherHeaders": ["核心指标",  "南京理工大学", "北京理工大学", "西北工业大学"],
      "teacherData": [
        ["师德师风建设主要成效", "3", "3", "2"],
        ["国家级平台", "5牵头，2参与", "4", "1"],
        ["教育部平台、国防重点学科实验室", "3牵头1参与", "0", "0"],
        ["其他代表性支撑平台", "6牵头2参与", "", ""],
        ["重大仪器设备", "5（4535万）", "", ""]
      ],
      "researchHeaders": ["核心指标",  "南京理工大学", "北京理工大学", "西北工业大学"],
      "researchData": [
        ["学术论文质量（限30篇）",  "", "", ""],
        ["专利转化情况", "15(1434.5万)", "", ""],
        ["国家级科研项目", "39", "", ""],
        ["重要军队国防项目", "92", "", ""],
        ["其他代表性科研项目", "40", "", ""],
        ["国家级科研奖励", "2牵头1参与", "0", "1"],
        ["教育部奖、军队国防奖、中国专利奖", "19牵头11参与", "无数据", ""],
        ["其他代表性科研奖励", "4牵头8参与", "无数据", ""]
      ]
    },
    "化工":{
      "talentHeaders": ["核心指标",  "南京理工大学", "天津大学", "华东理工大学","浙江大学","大连理工大学","浙江工业大学"],
      "talentData": [
        ["思想政治教育主要成效", "2", "1", "1","0","1","1"],
        ["出版教材质量", "12（3）", "1", "0","1","0","0"],
        ["国家级一流课程", "0", "7", "3","1","4","1"],
        ["教学成果奖（国家级）", "1（梅锦春）", "4", "3","1","1","1"],
        ["教学成果奖（其他）", "2", "无数据", "无数据","无数据","无数据","无数据"]
      ],
      "teacherHeaders": ["核心指标",  "南京理工大学", "天津大学", "华东理工大学","浙江大学","大连理工大学","浙江工业大学"],
      "teacherData": [
        ["师德师风建设主要成效", "1（王泽山，最美奋斗者）", "8", "3","0","4","2"],
        ["国家级平台", "5牵头，3参与", "5", "7","2","3","3"],
        ["教育部平台、国防重点学科实验室", "4牵头", "6", "8","3","5","2"],
        ["其他代表性支撑平台", "5", "", "","","",""],
        ["重大仪器设备", "5(3364.72万", "", "","","",""]
      ],
      "researchHeaders": ["核心指标",  "南京理工大学", "天津大学", "华东理工大学","浙江大学","大连理工大学","浙江工业大学"],
      "researchData": [
        ["学术论文质量（限30篇）",  "", "", "","","",""],
        ["专利转化情况", "20（2720.5/1334.5万）", "", "","","",""],
        ["国家级科研项目", "98", "", "","","",""],
        ["重要军队国防项目", "288", "", "","","",""],
        ["其他代表性科研项目", "40", "", "","","",""],
        ["国家级科研奖励", "0", "0", "0","1","0","1"],
        ["教育部奖、军队国防奖、中国专利奖", "4牵头；5参与", "无数据", "无数据","无数据","无数据","无数据"],
        ["其他代表性科研奖励", "9牵头4参与", "无数据", "无数据","无数据","无数据","无数据"]
      ]
    }
  };

export default {
  data() {
    return {
      activeTab: 'tab1', // 当前激活的标签页
      tabs: [
        { label: '兵器', name: 'tab1' },
        { label: '化工', name: 'tab2' }
      ],
      allData: {}, // 存储所有标签页数据
      currentData: {} // 当前显示的标签页数据
    }
  },
  created() {
    // 模拟从API获取数据
    this.allData = {
      tab1: jsonData['兵器'],
      tab2: jsonData['化工']
    };
    
    // 初始化显示第一个标签页的数据
    this.currentData = this.allData.tab1;
  },
  methods: {
    handleTabClick(tab) {
      // 切换标签页时更新数据
      const tabName = tab.paneName;
      console.log('切换到标签页:', tabName);
      this.currentData = this.allData[tabName];
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