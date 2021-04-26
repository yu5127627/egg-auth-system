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
        <el-form-item label="条件一">
          <el-input v-model="listQuery.input" placeholder="" />
        </el-form-item>
        <el-form-item label="条件二">
          <el-select v-model="listQuery" placeholder="">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 主要内容 -->
    <div class="main-table-view">
      <el-table :data="list" border style="width: 100%" @selection-change="(selection)=>{selectList = selection.map(item=>item.id)}">
        <el-table-column
          type="selection"
        />
        <el-table-column
          prop="id"
          label="ID"
          width="50px"
          align="center"
        />
        <el-table-column
          prop="action"
          label="规则"
          align="center"
        />
        <el-table-column
          prop="description"
          label="描述"
          align="center"
        />
        <el-table-column
          prop="createdAt"
          label="创建时间"
          align="center"
        />
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
import { getList } from "@/api/rule";
export default {
  name: "Rule",
  data() {
    return {
      limits: [10, 20, 50, 100],
      listQuery: { page: 1, count: 0, limit: 10 },
      rules: {},
      list: [],
      selectList: []
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
    handleRemove(row) {
      let ids;
      if (row.id) {
        ids = [row.id];
      } else {
        ids = this.selectList;
      }
      console.log(ids);
    },
    handleSearch() {},
    handleUpdate(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="scss" scoped></style>
