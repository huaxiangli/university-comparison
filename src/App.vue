<template>
  <el-container>
    <el-main>
      <el-card class="comparison-container">
        <SchoolComparison />
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import SchoolComparison from './components/SchoolComparison.vue'

export default {
  components: {
    SchoolComparison
  }
}
</script>

<style scoped>
.comparison-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>