<template>
  <div class="mian-view">
    <!-- 操作栏 -->
    <div class="main-operate">
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="()=>{dialog.show=true;}">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handleRemove">删除</el-button>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
        <el-table-column type="selection" />
        <el-table-column prop="id" label="ID" width="50px" align="center" />
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="()=>{dialog.show=true;dialogForm = scope.row;}">编辑</el-button>
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
        @size-change="current => {listQuery.limit = current;fetchData();}"
        @current-change="current => {listQuery.page = current;fetchData();}"
      />
    </div>

    <!-- 新增/编辑 弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialog.show">
      <el-form :model="dialogForm" :rules="dialog.rules" label-width="120px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动区域" prop="">
          <el-select v-model="dialogForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="dialog.show = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/rule";
export default {
  name: "",
  data() {
    return {
      dialogForm: {},
      dialog: {
        show: false, title: null,
        rules: { name: [{ required: true, message: "必填" }] }
      },
      limits: [10, 20, 50, 100],
      listQuery: { page: 1, count: 0, limit: 10 },
      rules: {},
      list: [],
      selectList: []
    };
  },
  computed: { dialogTitle() { return this.dialogForm.id ? "编辑" : "创建"; } },
  async created() { await this.fetchData(); },
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
    handleSearch() {
      console.log(this.listQuery);
    },
    handleUpdate(row) {
      console.log(row);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
