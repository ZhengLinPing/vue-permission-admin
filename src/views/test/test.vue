<template>
  <el-row style="padding:150px;text-align:center">
    <el-button v-permission="['detail']" round>详情</el-button>
    <el-button v-permission="['add']" type="primary" round>新增</el-button>
    <el-button v-permission="['edit']" type="success" round>修改</el-button>
    <el-button v-permission="['delete']" type="info" round>删除</el-button>
    <el-button v-permission="['import']" type="warning" round>导入</el-button>
    <el-button v-permission="['export']" type="danger" round>导出</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'Test'
}
</script>

<style scoped>

</style>
