<template>
  <div class="mian-view">
    <!-- 操作栏 -->
    <div class="main-operate">
      <div>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="handleCreate"
        >新增</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="handleRemove"
        >删除</el-button>
      </div>
      <div>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
        >搜索</el-button>
      </div>
    </div>
    <!-- 工具 筛选栏 -->
    <div class="main-toolbar">
      <el-form
        ref="listQuery"
        :model="listQuery"
        :rules="rules"
        label-width="100px"
        inline
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="" />
      </el-form>
    </div>
    <!-- 主要内容 -->
    <div class="main-table-view">
      <el-table :data="list" border style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="50px"
          align="center"
        />
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="avatar"
          label="头像"
          align="center"
        />
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
        />
        <el-table-column
          prop="roleId"
          label="角色"
          align="center"
        />
        <el-table-column
          prop="createdAt"
          label="创建时间"
          align="center"
        />
      </el-table>
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="limits"
        :page-size="limits[0]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listQuery.count"
        @size-change="
          current => {
            listQuery.limit = current;
            fetchData();
          }
        "
        @current-change="
          current => {
            listQuery.page = current;
            fetchData();
          }
        "
      />
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/manager";
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
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      const { code, message, result } = await getList(this.listQuery);
      this.list = result.rows;
      this.listQuery.count = result.count;
    },
    handleCreate() {},
    handleRemove() {},
    handleSearch() {}
  }
};
</script>

<style lang="scss" scoped></style>
