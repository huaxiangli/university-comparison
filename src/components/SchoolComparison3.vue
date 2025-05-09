<template>
  <div class="comparison-container">
    <div class="header">
      <h1>高校数据展示</h1>
      <el-button type="primary" @click="showDisciplineModal = true">
        {{ currentlySelectedDiscipline ? `当前学科: ${getDisciplineName(currentlySelectedDiscipline)} (${currentlySelectedDiscipline})` : '选择展示学科' }}
      </el-button>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="选择学科进行展示"
      width="85%"
      :before-close="handleClose"
    >
      <div class="discipline-selection-container">
        <el-radio-group v-model="selectedDiscipline" class="discipline-radio-group">
          <div class="discipline-categories-flex-container">
            <div
              v-for="(category, categoryIndex) in disciplinesList"
              :key="categoryIndex"
              class="discipline-category-column"
            >
              <div class="category-title">{{ category.name }}</div>
              <div class="discipline-list">
                <div
                  v-for="(discipline, disciplineIndex) in category.items"
                  :key="disciplineIndex"
                  class="discipline-item"
                >
                  <el-radio
                    :value="discipline.code"
                    :disabled="discipline.disabled"
                  >
                    {{ discipline.code }} {{ discipline.name }}
                  </el-radio>
                </div>
              </div>
            </div>
          </div>
        </el-radio-group>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="confirmSelection" :disabled="!selectedDiscipline">确定</el-button>
        </span>
      </template>
    </el-dialog>


    <div v-if="currentlySelectedDiscipline && allData[currentlySelectedDiscipline]" class="tables-container">
      <div class="discipline-comparison-section">
         </div>

      <el-card shadow="never" class="data-card">
        <h3>人才培养质量</h3>
        <el-table :data="allData[currentlySelectedDiscipline].talentData" border style="width: 100%">
          <el-table-column
            v-for="(header, index) in allData[currentlySelectedDiscipline].talentHeaders"
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
        <el-table :data="allData[currentlySelectedDiscipline].teacherData" border style="width: 100%">
          <el-table-column
            v-for="(header, index) in allData[currentlySelectedDiscipline].teacherHeaders"
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
        <el-table :data="allData[currentlySelectedDiscipline].researchData" border style="width: 100%">
          <el-table-column
            v-for="(header, index) in allData[currentlySelectedDiscipline].researchHeaders"
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

    <div v-else-if="currentlySelectedDiscipline && !allData[currentlySelectedDiscipline]">
            <el-alert
              :title="`学科数据 (${currentlySelectedDiscipline}) 未找到或不完整，无法显示详情。`"
              type="warning"
              :closable="false">
            </el-alert>
        </div>

    <div v-else class="placeholder-message">
      <p>请点击 "选择展示学科" 按钮，选择要展示的学科。</p>
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
    // Components from the merged modal
    ElDialog,
    ElRadioGroup,
    ElRadio,
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
  },
  data() {
    return {
      allData: {}, // Stores all loaded comparison data, keyed by discipline code
      showDisciplineModal: false, // Controls the visibility of the modal dialog
      currentlySelectedDiscipline: null, // Stores the code of the single selected discipline

      // --- Data properties related to the modal's internal state ---
      dialogVisible: false, // Controls the internal visibility of the el-dialog
      selectedDiscipline: null, // Local state for the discipline selected within the modal
      // disciplinesList is handled by computed property using the imported list
    };
  },
   computed: {
      // Provide the imported list to the template via computed property
      disciplinesList() {
          return fullDisciplineList;
      }
   },
  watch: {
    // Watch showDisciplineModal (controlled by the button) to sync with internal dialogVisible
    showDisciplineModal(newValue) {
        this.dialogVisible = newValue;
        // Reset selected discipline in modal when it opens
        if (newValue) {
            // Initialize selectedDiscipline in modal with the currently selected discipline
            if (this.currentlySelectedDisciplines) {
                 let discipline = null;
                 for(const category of this.disciplinesList) {
                     discipline = category.items.find(item => item.code === this.currentlySelectedDisciplines);
                     if (discipline) break;
                 }
                 // Only pre-select if the initial value is valid and not disabled
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
     // Watch internal dialogVisible to update showDisciplineModal (for v-model binding)
     dialogVisible(newValue) {
         this.showDisciplineModal = newValue;
     },
    // --- Watchers moved from DisciplineSelectionModal (Logic adapted for merged component) ---
    // The logic to pre-select the radio button based on the current selection
    // is integrated into the 'showDisciplineModal' watcher above.
  },
  created() {
    // Simulate loading data from the JSON file
    if (compareData ) {
       this.allData = compareData;
       console.log("Loaded allData:", this.allData);
    } else {
       console.error("compareData is not available. Please check the data source.");
       this.allData = {}; // Ensure it's an object even if data is missing
    }

    // Optional: You can set an initial selected discipline code here on component creation
    // Example: this.currentlySelectedDiscipline = '0826'; // Pre-select '兵器' on load
  },
  methods: {
    // --- Methods moved from DisciplineSelectionModal ---
    // Handle closing the dialog
    handleClose() {
        this.dialogVisible = false; // Close the internal dialog state
        // The dialogVisible watcher will update showDisciplineModal
    },
    // Handle confirming the selection in the dialog
    confirmSelection() {
        let confirmedCode = null;
        if (this.selectedDiscipline) {
            let discipline = null;
            // Use disciplinesList from computed property to find the discipline
            for(const category of this.disciplinesList) {
                discipline = category.items.find(item => item.code === this.selectedDiscipline);
                if (discipline) break;
            }
            // Confirm only if the selected code corresponds to a valid and non-disabled discipline
            if (discipline && !discipline.disabled) {
                confirmedCode = this.selectedDiscipline;
            }
        }

        console.log("Confirmed Discipline Code:", confirmedCode);
        // Update the currently selected discipline in the main component's state
        this.currentlySelectedDiscipline = confirmedCode;
        // Close the dialog
        this.handleClose();
    },

    // --- Existing method from SchoolComparison ---
    // Helper method to get the discipline name from its code
    getDisciplineName(code) {
       // Use the imported fullDisciplineList directly
       for (const category of fullDisciplineList) {
           const discipline = category.items.find(item => item.code === code);
           if (discipline) {
               return discipline.name;
           }
       }
       return '未知学科'; // Fallback if code not found
    },
  },
  // Watchers or computed properties can be added here if needed
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
}

.header h1 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

/* Style for the single comparison section when a discipline is selected */
.discipline-comparison-section {
  margin-top: 30px;
  padding-top: 0; /* No padding top needed if no heading here */
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

/* Placeholder message when no discipline is selected or data is missing */
.placeholder-message {
    text-align: center;
    margin-top: 50px;
    color: #666;
}

/* --- Styles moved from DisciplineSelectionModal --- */
.discipline-selection-container {
  padding: 0 20px; /* Add some padding inside the dialog */
  max-height: 60vh; /* Limit height to make it scrollable if needed */
  overflow-y: auto; /* Enable vertical scrolling */
}

/* Style for the el-radio-group if needed */
.discipline-radio-group {
  display: block; /* Make the radio group take full width */
}

/* Container for category columns using flexbox for wrapping */
.discipline-categories-flex-container {
  display: flex;
  flex-wrap: wrap; /* Allow columns to wrap to the next line */
  gap: 20px; /* Space between columns (categories) */
  /* Adjust gap as needed for spacing between columns */
}

.discipline-category-column {
    /* flex-basis: determines the initial size of a flex item before any shrinking or growing */
    /* flex-grow: specifies how much a flex item will grow relative to the rest of the flex items in the flex container */
    /* flex-shrink: specifies how much a flex item will shrink relative to the rest of the flex items in the flex container */

    /* Example: Set a base width and allow shrinking/growing */
    flex: 1 1 150px; /* Grow: 1, Shrink: 1, Base width: 150px. Adjust base width as needed. */
    min-width: 120px; /* Minimum width to prevent columns from becoming too narrow */
    max-width: 200px; /* Optional: Maximum width */

    margin-bottom: 20px; /* Space below the column */
}


.category-title {
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-size: 1px; 
}

.discipline-list .discipline-item {
  margin-bottom: 5px;
}

/* Adjust el-radio styling for compactness */
.el-radio {
    margin-right: 0; /* Remove default right margin */
    display: flex; /* Use flexbox to align label and radio button */
    align-items: flex-start; /* Align items to the start */
    line-height: 1.2; /* Make line height more compact */
}

/* Prevent the radio button from affecting text wrapping */
.el-radio__label {
    white-space: normal; /* Allow label text to wrap */
    word-break: break-word; /* Break long words */
    line-height: inherit; /* Inherit line height from parent el-radio */
    padding-left: 4px; /* Add slight space between radio button and text */
}

/* Adjust the radio dot size and label padding if they look too big */
.el-radio__inner {
   width: 14px; /* Adjust size */
   height: 14px; /* Adjust size */
   margin-top: 2px; /* Adjust vertical alignment if needed */
}




.dialog-footer {
  text-align: right;
  padding-top: 20px; /* Add padding above the buttons */
}

/* You may remove or keep any old styles related to el-tabs as needed */
/* For example, styles like .el-tabs, .el-tabs--card, etc. */
</style>