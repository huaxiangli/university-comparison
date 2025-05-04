<template>
  <div class="comparison-container">
    <!-- 标题 -->
    <div class="header">
      <h1>学科核心指标对标（A类）</h1>
    </div>


    <!-- 详细数据表格 -->
    <div class="tables-container">

      <!-- 学科核心指标对标（A类）表格 -->
      <el-card shadow="never" class="data-card">


        <el-table
            :data="formattedData"
            border
            style="width: 100%"
            :span-method="spanMethod"
        >
          <!-- 一级指标 -->
          <el-table-column prop="col0" label="一级指标" :min-width="'120px'" align="center">
            <template #default="scope">
              {{ scope.row[0] }}
            </template>
          </el-table-column>

          <!-- 二级指标 -->
<!--          <el-table-column prop="col1" label="二级指标" :min-width="'180px'" align="center">-->
<!--            <template #default="scope">-->
<!--              {{ scope.row[1] }}-->
<!--            </template>-->
<!--          </el-table-column>-->

          <!-- 二级指标 -->
          <el-table-column
              prop="col1"
              label="二级指标"
              :min-width="'180px'"
              align="center"
          >
            <template #default="scope">
              <!-- 显示指标值 -->
              {{ scope.row[1] }}
              <el-tooltip
                  placement="right"
                  effect="light"
              >
                <template #content>
                  <div style="white-space: pre-wrap;">
                    {{ getTip(scope.$index) }}
                  </div>
                </template>
                <el-icon class="ml-1" style="cursor: pointer">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </template>

          </el-table-column>

          <!-- 控制 分组 -->
          <el-table-column label="控制" align="center">
            <el-table-column prop="col2" label="南理工">
              <template #default="scope">{{ scope.row[2] }}</template>
            </el-table-column>
            <el-table-column prop="col3" label="北理工">
              <template #default="scope">{{ scope.row[3] }}</template>
            </el-table-column>
            <el-table-column prop="col4" label="哈工大">
              <template #default="scope">{{ scope.row[4] }}</template>
            </el-table-column>
            <el-table-column prop="col5" label="上交大">
              <template #default="scope">{{ scope.row[5] }}</template>
            </el-table-column>
            <el-table-column prop="col6" label="大连理工">
              <template #default="scope">{{ scope.row[6] }}</template>
            </el-table-column>
          </el-table-column>

          <!-- 光学 分组 -->
          <el-table-column label="光学" align="center">
            <el-table-column prop="col7" label="南理工">
              <template #default="scope">{{ scope.row[7] }}</template>
            </el-table-column>
            <el-table-column prop="col8" label="北理工">
              <template #default="scope">{{ scope.row[8] }}</template>
            </el-table-column>
            <el-table-column prop="col9" label="华中科大">
              <template #default="scope">{{ scope.row[9] }}</template>
            </el-table-column>
          </el-table-column>

          <!-- 机械 分组 -->
          <el-table-column label="机械" align="center">
            <el-table-column prop="col10" label="南理工">
              <template #default="scope">{{ scope.row[10] }}</template>
            </el-table-column>
            <el-table-column prop="col11" label="西工大">
              <template #default="scope">{{ scope.row[11] }}</template>
            </el-table-column>
            <el-table-column prop="col12" label="华南理工">
              <template #default="scope">{{ scope.row[12] }}</template>
            </el-table-column>
          </el-table-column>

          <!-- 材料 分组 -->
          <el-table-column label="材料" align="center">
            <el-table-column prop="col13" label="南理工">
              <template #default="scope">{{ scope.row[13] }}</template>
            </el-table-column>
            <el-table-column prop="col14" label="南大">
              <template #default="scope">{{ scope.row[14] }}</template>
            </el-table-column>
            <el-table-column prop="col15" label="华中科大">
              <template #default="scope">{{ scope.row[15] }}</template>
            </el-table-column>
            <el-table-column prop="col16" label="吉大">
              <template #default="scope">{{ scope.row[16] }}</template>
            </el-table-column>
            <el-table-column prop="col17" label="华南理工">
              <template #default="scope">{{ scope.row[17] }}</template>
            </el-table-column>
            <el-table-column prop="col18" label="东北大学">
              <template #default="scope">{{ scope.row[18] }}</template>
            </el-table-column>
            <el-table-column prop="col19" label="北京化工">
              <template #default="scope">{{ scope.row[19] }}</template>
            </el-table-column>
          </el-table-column>

          <!-- 计算机 分组 -->
          <el-table-column label="计算机" align="center">
            <el-table-column prop="col20" label="南理工">
              <template #default="scope">{{ scope.row[20] }}</template>
            </el-table-column>
            <el-table-column prop="col21" label="复旦">
              <template #default="scope">{{ scope.row[21] }}</template>
            </el-table-column>
            <el-table-column prop="col22" label="杭电">
              <template #default="scope">{{ scope.row[22] }}</template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-card>

    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.vue'
import { QuestionFilled } from '@element-plus/icons-vue'

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
            total: 390  // 添加总计值
          },
          {
            label: '杭州电子科技大学',
            data: [48, 137, 40, 54, 77],
            total: 356  // 添加总计值
          },
          {
            label: '南京理工大学',
            data: [49, 117, 0, 115, 22],
            total: 303  // 添加总计值
          }
        ]
      },
      rankData: [
        { name: '复旦大学', rank: '25', percentile: '前9%', assessment: 'A-' },
        { name: '杭州电子科技大学', rank: '28', percentile: '前10%', assessment: 'B+' },
        { name: '南京理工大学', rank: '34', percentile: '前12%', assessment: 'B+' }
      ],
      talentHeaders: ['指标', "南理工","北理工","哈工大","上交大","大连理工",
        "南理工","北理工","华中科大",
        "南理工","西工大", "华南理工",
        "南理工","南大","华中科大","吉大", "华南理工","东北大学","北京化工",
        "南理工","复旦","杭电"],
      talentData: [
        [
          '思想政治教育主要成效',
          '4','0','0','0','0','3','0','0','1','0','1','4','0','1','0','0','1','0','0','0','0'
        ],
        [
          '出版教材质量',
          '4（2）','0','0','0','0','4（3）','0','0','9（2）','2','0','16（5）','0','0','0','0','0','0','4（1）','0','0'
        ],
        [
          '国家级一流课程',
          '1','3','0','3','1','1','0','2','1','3','2','2','0','2','1','1','1','3','2','2','2'
        ],
        [
          '教学成果奖（国家级）',
          '梅锦春（2）\n曾海波（7）',
          '1','1','2','0','0','0','1',
          '廖文和（1）\n梅锦春（10）',
          '1','0',
          '曾海波（1）\n梅锦春（4）',
          '0','1','0','0','0','0','0','0','1'
        ],
        [
          '教学成果奖（其他）',
          '1','0','0','0','0','2','0','0','2','0','0','2','0','0','0','0','0','0','2','0','0'
        ],
        [
          '师德师风建设主要成效',
          '1（徐胜元，黄大年）','0','2','1','0',
          '2（陈钱，黄大年；电光学院，全国全国教育系统先进集体）',
          '0','0','1','1','1',
          '1（陈光，五一劳动奖章）','1','3','0','2','0','3','1','0','0'
        ],
        [
          '国家级平台',
          '3（教学平台）','2','1','1','2','2参与','1',
          '4','1牵头；2参与','3','3','2参与','1','2','0','4','2',
          '1','1（参与）','1','2'
        ],
        [
          '教育部平台、国防重点学科实验室',
          '1牵头；1参与','4','3','2','3','3牵头1参与','3','2','1',
          '2','1','1牵头1参与','1','4','2','9','4','3','1','1','2'
        ],
        [
          '其他代表性支撑平台',
          '7','-','-','-','-','4牵头1参与',
          '-','-','3','-','-','10','0','0','0','0','0','0','4','0','0'
        ],
        [
          '重大仪器设备',
          '5（2665.31万）','-','-','-','-',
          '5（715.7万）','-','-','5（1878万）','-','-',
          '5（6026万）','-','-','-','-','-','-',
          '5（-）','-','-'
        ],
        [
          '学术论文质量（限30篇）',
          '-','-','-','-','-','-','-',
          '-','-','-','-','-','-','-',
          '-','-','-','-','-','-','-'
        ],
        [
          '专利转化情况',
          '40（2765.4/1837.5万）','-','-','-','-',
          '10（134.3/132.6万）','-','-','11（594万）','-',
          '-','37（5596万/-）','-','-','-','-',
          '-','-','0','-','-'
        ],
        [
          '国家级科研项目',
          '45','-','-','-','-','48','-','-',
          '43','-','-','121','-','-','-','-',
          '-','-','17','-','-'
        ],
        [
          '重要军队国防项目',
          '6','-','-','-','-','20','-','-',
          '5','-','-','33','-','-','-','-',
          '-','-','2','-','-'
        ],
        [
          '其他代表性科研项目',
          '15','-','-','-','-','6','-','-',
          '21','-','-','40','-','-','-','-',
          '-','-','11','-','-'
        ],
        [
          '国家级科研奖励',
          '0','0','0','0','0','0','0','1','0','0','0',
          '1（参与）','0','1','0','0','0','0','0','1','0'
        ],
        [
          '教育部奖、军队国防奖、中国专利奖',
          '3牵头；1参与','-','-','-','-','4',
          '-','-','2','-','-','4牵头','-','-',
          '-','-','-','-','2牵头4参与','-','-'
        ],
        [
          '其他代表性科研奖励',
          '1牵头5参与','-','-','-','-','10',
          '-','-','2牵头12参与','-','-','6牵头',
          '-','-','-','-','-','-','6牵头2参与',
          '-','-'
        ]
      ],
      projectHeaders: ['指标', '总量年份', '南京理工大学', '复旦大学', '杭州电子科技大学', '中值'],
      projectData: [
        ['重大重点项目（万元）', '2019-2024', '962（4项）', '2312（4项）', '3193（3项）', '2578'],
        ['面上青年项目', '2019-2024', '73', '68', '46', '65'],
        ['科研平台（折合项）', '截至2024.12', '2.5', '2.5', '10', '6.3']
      ]
    }
  },
  methods: {
    spanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex  === 0) {
          return {
            rowspan: 5,
            colspan: 1
          };
        }
        if (rowIndex  >= 1 && rowIndex <= 4) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
        if(rowIndex  === 5) {
          return {
            rowspan: 5,
            colspan: 1
          };
        }
        if (rowIndex  >= 6 && rowIndex <= 9) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
        if(rowIndex  === 10) {
          return {
            rowspan: 8,
            colspan: 1
          };
        }
        if (rowIndex  >= 11 && rowIndex <= 17) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    getTip(rowIndex) {
      if (rowIndex === 0) return '全国高校优秀中青年思想政治理论课教师择优资助项目、全国高校思想政治理论课教学方法改革择优推广项目、全国高校百个研究生样板党支部、全国高校百名研究生党员标兵、\n全国党建工作示范高校、全国党建工作标杆院系、全国党建工作样板支部、全国先进基层党组织、最美高校辅导员、最美大学生、中国大学生年度人物、全国高校辅导员年度人物\n' +
          '（其他软科统计项目：全国优秀党务工作者、全国优秀共产党员、全国优秀共青团员、中国大学生自强之星标兵）';
      if (rowIndex === 1) return '出版教材总数（省部级以上规划教材数）';
      if (rowIndex === 2) return '国家级线上一流课程（原国家精品在线开放课程）、国家级线下一流课程、国家级线上线下混合式一流课程、\n国家虚拟仿真实验教学一流课程（原国家虚拟仿真实验教学项目）、国家级社会实践一流课程”（均不包括省级一流课程）';
      if (rowIndex === 3) return '国家级教学成果奖（高等教育类）、中国学位与研究生教育学会研究生教育成果奖';
      if (rowIndex === 4) return '无';
      if (rowIndex === 5) return '共和国勋章、人民英雄、人民教育家、人民楷模、人民科学家、人民艺术家、文物保护杰出贡献者、全国高校黄大年式教师团队、时代楷模、全国教书育人楷模、最美教师、全国优秀教师、\n全国模范教师、全国优秀教育工作者、全国教育系统先进工作者、全国教育系统先进集体、全国师德标兵、全国师德模范、全国劳动模范、全国先进工作者、全国道德模范、全国五一劳动奖章获得者、\n全国三八红旗手、最美奋斗者、感动中国年度人物、全国优秀共产党员、全国优秀党务工作者、全国抗击新冠肺炎疫情先进个人、全国抗击新冠肺炎疫情先进集体、全国脱贫攻坚奖（状态数据）';
      if (rowIndex === 6) return '中央科技委认定的国家级平台';
      if (rowIndex === 7) return '无';
      if (rowIndex === 8) return '无';
      if (rowIndex === 9) return '1.仅工科、理科门类填写，数量（总金额）\n' +
          '2.每学科限填5项，超过5台取单值最高的5台进行统计。';
      if (rowIndex === 10) return '无';
      if (rowIndex === 11) return '专利转化数量（合同总额/到账总额）';
      if (rowIndex === 12) return '国家自然科学基金、国家科技重大专项（含军口）、国家重点研发计划、国家社会科学基金（不含教育学项目）';
      if (rowIndex === 13) return '武器装备型号项目、装备预先研究项目、基础加强计划项目、前沿创新计划项目';
      if (rowIndex === 14) return '其他代表性科研项目（如中央和国家机关委托项目、有关行业和重要企业委托项目等），超过40项按40项统计';
      if (rowIndex === 15) return '国家最高科学技术奖、自然科学奖、技术发明奖、科技进步奖、国际科学技术合作奖';
      if (rowIndex === 16) return '教育部高等学校科学研究优秀成果奖（科学技术）、国防科学技术奖、军队科学技术奖（科学技术）、中国专利奖（仅填写二等/银奖及以上奖项）';
      if (rowIndex === 17) return '其他代表性科研奖励（如省级“三大奖”、重要国际奖、学会协会奖、社会奖），超过10项按10项统计';
    }

  },
  computed: {
    // 在数据前面为每行插入一级指标列内容
    formattedData() {
      return this.talentData.map((row, rowIndex) => {
        let label = '';
        if (rowIndex >= 0 && rowIndex <= 4) {
          label = '人才培养质量';
        } else if (rowIndex >= 5 && rowIndex <= 9) {
          label = '师资队伍与资源';
        } else if (rowIndex >= 10 && rowIndex <= 17) {
          label = '科学研究水平';
        }
        return [label, ...row];
      });
    }
  },
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