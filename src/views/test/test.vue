<template>
  <el-row style="padding:150px;text-align:center">
    <el-button  v-permission="['detail']" round>详情</el-button>
    <el-button type="primary" v-permission="['add']" round>新增</el-button>
    <el-button type="success" v-permission="['edit']" round>修改</el-button>
    <el-button type="info" v-permission="['delete']" round>删除</el-button>
    <el-button type="warning" v-permission="['import']" round>导入</el-button>
    <el-button type="danger" v-permission="['export']" round>导出</el-button>
  </el-row>
</template>

<script>
  export default {
    name: 'test'
  }
</script>

<style scoped>

</style>
