<template>
  <div class="comparison-container">
    <div class="header-actions">
        <span class="title-discipline-info">评估指标</span>
        <span class="separator-line"></span>
        <span v-if="currentlySelectedDisciplines" class="selected-discipline-info">
          {{ getDisciplineName(currentlySelectedDisciplines) }} ({{ currentlySelectedDisciplines }})
        </span>
        <span v-else class="placeholder-discipline-info">
          请选择学科
        </span>
        <el-button type="primary" @click="showDisciplineModal = true">
          切换学科
        </el-button>
      </div>

    <el-dialog
      v-model="dialogVisible"
      title="选择学科进行展示"
      width="90%"
      :before-close="handleClose"
      destroy-on-close
    >
      <div class="modal-content-three-rows">
        <div class="discipline-row-container top-row">
          <div class="discipline-column-flow-container">
            <div
              v-for="(category, categoryIndex) in disciplinesRow1"
              :key="categoryIndex"
              class="discipline-category-block"
            >
              <div class="category-title">{{ category.name }}</div>
              <div class="discipline-list">
                <div
                  v-for="(discipline, disciplineIndex) in category.items"
                  :key="disciplineIndex"
                  class="discipline-item"
                >
                  <el-radio
                    v-model="selectedDiscipline"
                    :value="discipline.code"
                    :disabled="discipline.disabled"
                  >
                    {{ discipline.code }} {{ discipline.name }}
                  </el-radio>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="row-separator">

        <div class="discipline-row-container middle-row">
          <div class="discipline-column-flow-container">
            <div
              v-for="(category, categoryIndex) in disciplinesRow2"
              :key="categoryIndex"
              class="discipline-category-block"
            >
              <div class="category-title">{{ category.name }}</div>
              <div class="discipline-list">
                <div
                  v-for="(discipline, disciplineIndex) in category.items"
                  :key="disciplineIndex"
                  class="discipline-item"
                >
                  <el-radio
                    v-model="selectedDiscipline"
                    :value="discipline.code"
                    :disabled="discipline.disabled"
                  >
                    {{ discipline.code }} {{ discipline.name }}
                    <span v-if="discipline.disabled" class="disabled-note">(仅展示)</span>
                  </el-radio>
                </div>
              </div>
            </div>
          </div>
        </div>

         <hr class="row-separator">

        <div class="discipline-row-container bottom-row">
          <div class="discipline-column-flow-container">
            <div
              v-for="(category, categoryIndex) in disciplinesRow3"
              :key="categoryIndex"
              class="discipline-category-block"
            >
              <div class="category-title">{{ category.name }}</div>
              <div class="discipline-list">
                <div
                  v-for="(discipline, disciplineIndex) in category.items"
                  :key="disciplineIndex"
                  class="discipline-item"
                >
                  <el-radio
                    v-model="selectedDiscipline"
                    :value="discipline.code"
                    :disabled="discipline.disabled"
                  >
                    {{ discipline.code }} {{ discipline.name }}
                    <span v-if="discipline.disabled" class="disabled-note">(仅展示)</span>
                  </el-radio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="confirmSelection" :disabled="!selectedDiscipline">确定</el-button>
        </span>
      </template>
    </el-dialog>


    <div v-if="currentlySelectedDisciplines && allData[currentlySelectedDisciplines]" class="tables-container">
      <el-tabs v-model="activeTab" class="discipline-tabs" @tab-click="handleTabClick">
          <el-tab-pane label="全部指标" name="all"></el-tab-pane>

          <el-tab-pane
              v-for="(header, index) in dynamicTabHeaders"
              :key="index"
              :label="header"
              :name="header"
          ></el-tab-pane>
          <el-tab-pane label="定位标杆" name="benchmark"></el-tab-pane>
      </el-tabs>
      <!-- <div class="discipline-comparison-section">
          </div> -->
      <div v-if="activeTab === 'all'" class="tables-container">  
        <el-card shadow="never" class="data-card">
          <h3>人才培养质量</h3>
          <el-table :data="allData[currentlySelectedDisciplines].talentData" border style="width: 100%">
            <el-table-column
              v-for="(header, index) in allData[currentlySelectedDisciplines].talentHeaders"
              :key="index"
              :prop="`col${index}`"
              :label="header"
              :min-width="index === 0 ? '180px' : '120px'"
            >
                <template #default="scope">
                {{ scope.row[index] }}
                </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never" class="data-card">
          <h3>师资队伍与资源</h3>
          <el-table :data="allData[currentlySelectedDisciplines].teacherData" border style="width: 100%">
            <el-table-column
              v-for="(header, index) in allData[currentlySelectedDisciplines].teacherHeaders"
              :key="index"
              :prop="`col${index}`"
              :label="header"
              :min-width="index === 0 ? '180px' : '120px'"
            >
                <template #default="scope">
                {{ scope.row[index] }}
                </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card shadow="never" class="data-card">
          <h3>科学研究水平</h3>
          <el-table :data="allData[currentlySelectedDisciplines].researchData" border style="width: 100%">
            <el-table-column
              v-for="(header, index) in allData[currentlySelectedDisciplines].researchHeaders"
              :key="index"
              :prop="`col${index}`"
              :label="header"
              :min-width="index === 0 ? '180px' : '120px'"
            >
                <template #default="scope">
                {{ scope.row[index] }}
                </template>
            </el-table-column>
          </el-table>
        </el-card>
        </div>
        <!-- Placeholder text when a dynamic tab is active -->
        <div v-else class="no-data-placeholder">
          <p>目前无数据</p>
        </div>
    </div>

    <div v-else>
            <el-alert
              :title="`学科数据 (${currentlySelectedDisciplines}) 未找到或不完整，无法显示详情。`"
              type="warning"
              :closable="false">
            </el-alert>
         </div>
  </div>
</template>

<script>
import compareData from './compareData.json'; // Ensure this path is correct
// Import the shared discipline list
import { fullDisciplineList } from './disciplines.js';
// Import Element Plus components needed for both the main view and the merged modal
import {
    ElButton,
    ElCard,
    ElTable,
    ElTableColumn,
    ElAlert,
    ElDialog,
    ElRadioGroup,
    ElRadio,
    ElTabs,       
    ElTabPane,   
} from 'element-plus';


export default {
  name: 'SchoolComparison',
  components: {
    ElButton,
    ElCard,
    ElTable,
    ElTableColumn,
    ElAlert,
    // Components from the merged modal
    ElDialog,
    ElRadioGroup,
    ElRadio,
    ElTabs,       
    ElTabPane,  
  },
  data() {
    return {
      allData: {}, // Stores all loaded comparison data, keyed by discipline code
      showDisciplineModal: false, // Controls the visibility of the modal dialog
      currentlySelectedDisciplines: null, // Stores the code of the single selected discipline

      // --- Data properties related to the modal's internal state ---
      dialogVisible: false, // Controls the internal visibility of the el-dialog
      selectedDiscipline: null, // Local state for the discipline selected within the modal
      activeTab: 'all', // Default active tab in the tabs component
    };
  },
   computed: {
      // Provide the imported list to the template via computed property
      allDisciplines() {
          return fullDisciplineList;
      },
      // Split disciplines into THREE rows based on the total number of DISCIPLINES
      disciplinesRow1() {
          return this.splitDisciplinesIntoRows(3)[0];
      },
       disciplinesRow2() {
          return this.splitDisciplinesIntoRows(3)[1];
       },
       disciplinesRow3() {
          return this.splitDisciplinesIntoRows(3)[2];
       },
       dynamicTabHeaders() {
            // Only compute if a discipline is selected and data is available
            if (this.currentlySelectedDisciplines && this.allData[this.currentlySelectedDisciplines]) {
                const headers = this.allData[this.currentlySelectedDisciplines].talentHeaders;
                // Return headers from the third column (index 2) onwards
                return headers ? headers.slice(2) : [];
            }
            return [];
        },
   },
  watch: {
    showDisciplineModal(newValue) {
        this.dialogVisible = newValue;
        if (newValue) {
            if (this.currentlySelectedDisciplines) {
                 let discipline = null;
                 for(const category of this.allDisciplines) { // Use allDisciplines computed property
                     discipline = category.items.find(item => item.code === this.currentlySelectedDisciplines);
                     if (discipline) break;
                 }
                 if (discipline && !discipline.disabled) {
                     this.selectedDiscipline = this.currentlySelectedDisciplines;
                 } else {
                     this.selectedDiscipline = null;
                 }
             } else {
                 this.selectedDiscipline = null;
             }
        }
    },
     dialogVisible(newValue) {
         this.showDisciplineModal = newValue;
     },
    // Watch for discipline change to reset active tab
    currentlySelectedDisciplines(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.activeTab = 'all'; // Reset to "全部指标" when discipline changes
            }
        }
  },
  created() {
    if (compareData) {
       this.allData = compareData;
       console.log("Loaded allData");
    } else {
       console.error("compareData or compareData['A+'] is not available. Please check the data source.");
       this.allData = {};
    }
  },
  methods: {
    handleTabClick(tab) {
    // 在这里可以添加 Tab 切换时的额外逻辑
    // 注意：v-model 已经更新了 activeTab 的值，通常无需在此方法内再次更新 activeTab
    console.log('标签页被点击了:', tab.props.name);

    // 示例：如果需要在 Tab 切换时执行一些异步操作
    // if (tab.props.name !== 'all') {
    //   this.loadTabData(tab.props.name);
    // }
  },
    handleClose() {
        this.dialogVisible = false;
    },
    confirmSelection() {
        let confirmedCode = null;
        if (this.selectedDiscipline) {
            let discipline = null;
             for(const category of this.allDisciplines) { // Use allDisciplines computed property
                discipline = category.items.find(item => item.code === this.selectedDiscipline);
                if (discipline) break;
            }
            if (discipline && !discipline.disabled) {
                confirmedCode = this.selectedDiscipline;
            }
        }

        console.log("Confirmed Discipline Code:", confirmedCode);
        this.currentlySelectedDisciplines = confirmedCode;
        this.handleClose();
    },

    getDisciplineName(code) {
       for (const category of fullDisciplineList) {
           const discipline = category.items.find(item => item.code === code);
           if (discipline) {
               return discipline.name;
           }
       }
       return '未知学科';
    },

    // New method to split disciplines into a specified number of rows
    splitDisciplinesIntoRows(numRows) {
        const totalDisciplines = this.allDisciplines.reduce((sum, category) => sum + category.items.length, 0);
        const targetPerRow = Math.ceil(totalDisciplines / numRows);

        const rows = Array.from({ length: numRows }, () => []);
        let currentRowIndex = 0;
        let currentDisciplineCount = 0;

        for (const category of this.allDisciplines) {
            

            // If we've reached or exceeded the target for this row (and it's not the last row),
            // move to the next row and reset count
            if (currentRowIndex < numRows - 1 && currentDisciplineCount+category.items.length >= targetPerRow) {
                currentRowIndex++;
                currentDisciplineCount = 0; // Reset count for the new row
                 // Optional: If the next category is very large and significantly overshoots the target,
                 // you might want to check against targetPerRow + nextCategory.items.length
                 // and start the new row earlier. But for simplicity, this is a basic split.
            }
            // Assign the entire category to the current row
            rows[currentRowIndex].push(category);
            currentDisciplineCount += category.items.length;
        }

        return rows;
    }
  },
};
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
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 在主轴上平均分布子元素 */
  align-items: center; /* 在交叉轴上居中对齐子元素 */
  flex-wrap: wrap; /* 允许项目换行，防止在小屏幕上溢出 */
}

.header h1 {
  /* color: #333; */
  /* font-size: 24px; */
  /* font-weight: bold; */
  margin: 0; /* 移除默认 margin */
  flex-shrink: 0; /* 防止标题缩小 */
}

.header-actions {
    display: flex; /* 使用 Flexbox 布局容器 */
    align-items: flex-start; /* 垂直居中对齐子元素 */
    gap: 20px; /* 子元素之间的间距 */
    flex-wrap: wrap; /* 允许项目换行 */
    justify-content: flex-start; /* 在小屏幕上居中 */
    margin-bottom: 20px;
}

.selected-discipline-info {
  font-size: 20px; /* 调整字体大小 */
  color: black; /* 调整字体颜色 */
  flex-shrink: 0; /* 防止文本缩小 */
}

.placeholder-discipline-info {
  font-size: 20px; /* 调整字体大小 */
  color: black; /* 使用稍浅的颜色表示提示 */
  flex-shrink: 0; /* 防止文本缩小 */
}
.title-discipline-info {
  font-size: 18px; /* 调整字体大小 */
  color: black; /* 使用稍浅的颜色表示提示 */
  flex-shrink: 0; /* 防止文本缩小 */
}

.separator-line {
  display: inline-block; /* 或者 flex 布局下的 block */
  width: 3px; /* 线的宽度 */
  height: 25px; /* 线的长度，根据文本行高调整 */
  background-color: #409eff; /* Element Plus Primary Color */
  flex-shrink: 0; /* 防止线缩小 */
   /* gap 属性会自动处理线左右的间距，无需额外 margin */
}

/* Style for the single comparison section when a discipline is selected */
.discipline-comparison-section {
  margin-top: 30px;
  padding-top: 0;
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



/* --- Styles for the Three-Row Modal Layout --- */

/* Container for the three rows */
.modal-content-three-rows {
    padding: 0 10px; /* Add padding around the rows */
}

/* Style for each row container */
.discipline-row-container {
    /* Set a fixed height for each row */
    height: 290px; /* Adjust this value as needed */
    /* Add bottom margin between rows */
    margin-bottom: 15px;
    /* Ensure content that flows into columns is contained */
    overflow: hidden; /* Hide content that exceeds the fixed height of the row */
    /* If you want horizontal scrolling within a row if columns exceed width, use overflow-x: auto; */
    /* overflow-x: auto; */
}

/* Apply column layout to the inner container within each row */
.discipline-column-flow-container {
  height: 100%; /* Fill the height of the parent .discipline-row-container */
  /* Apply column layout */
  /* column-count: 7; 
  column-gap: 20px; */
  /* Or use column-width instead */
  column-width: 152px;
}

/* Style for the separator line between rows */
.row-separator {
    border: none;
    border-top: 1px solid #eee;
    margin: 10px 0; /* Space above and below the separator */
}

.discipline-tabs {
    margin-top: 20px; /* Space above the tabs */
    margin-bottom: 20px; /* Space between tabs and tables */
}

/* Prevent a category block from being split across columns */
.discipline-category-block {
  margin-bottom: 20px; /* Space between category blocks */
  /* Ensure the block stays together in one column if possible */
  break-inside: avoid-column;
  -webkit-break-inside: avoid-column; /* For older webkit browsers */
}


.category-title {
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-size: 1em;
}

.discipline-list .discipline-item {
  margin-bottom: 5px;
}

.el-radio-group {
  display: block;
}

.el-radio {
    margin-right: 0;
    display: flex;
    align-items: flex-start;
    line-height: 1.2;
}

.el-radio__label {
    white-space: normal;
    word-break: break-word;
    line-height: inherit;
    padding-left: 4px;
}

.el-radio__inner {
   width: 14px;
   height: 14px;
   margin-top: 2px;
}


/* --- Style to make the El-dialog body scrollable --- */
/* Use a deep selector to target the internal Element Plus class */
:deep(.el-dialog__body) {
    /* Allow vertical scrolling */
    overflow-y: auto;
    /* Add padding to the bottom of the scrollable area if needed */
    padding-bottom: 20px; /* Example padding */
}
.no-data-placeholder {
    text-align: center;
    padding: 40px 0;
    color: #999; /* A muted color for placeholder text */
    font-size: 18px;
}
</style>