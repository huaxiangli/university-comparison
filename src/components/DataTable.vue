<template>
    <div>
      <div v-for="(table, index) in tables" :key="index" class="table-section">
        <h3>{{ table.title }}</h3>
        <el-table :data="table.rows" border style="width: 100%">
          <el-table-column 
            v-for="(header, i) in table.headers" 
            :key="i" 
            :prop="`col${i}`" 
            :label="header"
            :min-width="i === 0 ? '180px' : '120px'">
            <template #default="scope">
              {{ scope.row[i] }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DataTable',
    props: {
      tables: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .table-section {
    margin-bottom: 32px;
  }
  
  .table-section h3 {
    margin-bottom: 16px;
  }
  </style>