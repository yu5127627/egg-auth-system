<template>
  <div class="mian-view">
    <!-- 操作栏 -->
    <div class="main-operate">
      <div>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="handleCreate"
          >新增</el-button
        >
        <el-button type="danger" icon="el-icon-delete" @click="handleRemove"
          >删除</el-button
        >
      </div>
      <div>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
    </div>
    <!-- 工具 筛选栏 -->
    <div class="main-toolbar">
      <el-form
        :model="listQuery"
        :rules="rules"
        ref="listQuery"
        label-width="100px"
        inline
        class="demo-ruleForm"
      >
        <el-form-item label="" prop=""> </el-form-item>
      </el-form>
    </div>
    <!-- 主要内容 -->
    <div class="main-table-view">
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="50px" aligen="center">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="limits"
        :page-size="limits[0]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listQuery.count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      limits: [10, 20, 50, 100],
      listQuery: { page: 1, count: 0, limit: 10 },
      rules: {},
      list: []
    };
  },
  created() {},
  methods: {
    handleCreate() {},
    handleRemove() {},
    handleSearch() {}
  }
};
</script>

<style lang="scss" scoped></style>
