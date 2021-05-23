<template>
  <div class="mian-view">
    <!-- 操作栏 -->
    <div class="main-operate">
      <div>
        <el-button v-rule="'logLogin:delete'" type="danger" icon="el-icon-delete" @click="handleRemove">删除</el-button>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="fetchData">刷新</el-button>
      </div>
    </div>

    <!-- 工具 筛选栏 -->
    <div class="main-toolbar">
      <el-form
        :model="listQuery"
        label-width="100px"
        inline
        class="demo-ruleForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="listQuery.username" placeholder="输入用户名" />
        </el-form-item>
        <el-form-item label="登录地址">
          <el-input v-model="listQuery.address" placeholder="输入登录地址" />
        </el-form-item>
        <el-form-item label="登录平台">
          <el-input v-model="listQuery.username" placeholder="输入登录平台" />
        </el-form-item>
        <!-- <el-form-item label="角色">
          <el-select v-model="listQuery" placeholder="">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item> -->
      </el-form>
    </div>

    <!-- 主要内容 -->
    <div class="main-table-view">
      <el-table :data="list" border style="width: 100%" @selection-change="(selection)=>{selectList = selection.map(item=>item.id)}">
        <el-table-column type="selection" />
        <el-table-column prop="id" label="ID" width="50px" align="center" />
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="ip" label="登录IP" align="center" />
        <el-table-column prop="address" label="登录地址" align="center" />
        <el-table-column prop="browser" label="登录平台" align="center" />
        <el-table-column prop="login_time" label="登录时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.login_time|moment('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-rule="'logLogin:delete'" type="danger" size="mini" icon="el-icon-delete" @click="handleRemove(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="limits"
        :page-size="limits[0]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listQuery.count"
        @size-change="current => {listQuery.limit = current;fetchData();}"
        @current-change="current => {listQuery.page = current;fetchData();}"
      />
    </div>
  </div>
</template>

<script>
import { getList, remove } from "@/api/logLogin";
export default {
  name: "LoginLog",
  data() {
    return {
      limits: [10, 15, 20, 50, 100],
      listQuery: { page: 1, count: 0, limit: 10 },
      list: [],
      selectList: []
    };
  },
  async created() { await this.fetchData(); },
  methods: {
    async fetchData() {
      const { code, message, result } = await getList(this.listQuery);
      this.list = result.rows;
      this.listQuery.count = result.count;
    },
    handleRemove(row) {
      const ids = row.id ? [row.id] : this.selectList;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async(res) => {
        await remove({ ids });
        await this.fetchData();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    handleSearch() {
      console.log(this.listQuery);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
