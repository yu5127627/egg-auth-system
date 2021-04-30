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
        <el-table-column prop="title" label="名称" align="center" />
        <el-table-column prop="name" label="唯一标识" align="center" />
        <el-table-column prop="path" label="文件地址" align="center" />
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.type===1?'菜单':'目录' }}
          </template>
        </el-table-column>
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
      <el-form :model="dialogForm" :rules="dialog.rules" label-width="100px" inline>
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="dialogForm.type">
            <el-radio-button label="0">目录</el-radio-button>
            <el-radio-button label="1">菜单</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="外链菜单">
          <el-radio-group v-model="dialogForm.islink">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="缓存菜单">
          <el-radio-group v-model="dialogForm.cache">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单可见">
          <el-radio-group v-model="dialogForm.show">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="dialogForm.title" />
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-popover
            placement="bottom-start"
            width="450"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <!-- <icon-select ref="iconSelect" @selected="selected" /> -->
            <el-input slot="reference" v-model="dialogForm.icon" placeholder="点击选择图标" readonly>
              <svg-icon v-if="dialogForm.icon" slot="prefix" :icon-class="dialogForm.icon" />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item label="菜单地址" prop="path">
          <el-input v-model="dialogForm.path" />
        </el-form-item>
        <el-form-item label="菜单排序">
          <el-input-number v-model="dialogForm.sort" :min="1" label="描述文字" />
        </el-form-item>
        <el-form-item label="组件名称" prop="name">
          <el-input v-model="dialogForm.name" placeholder="组件内的name" />
        </el-form-item>
        <el-form-item label="组件路径" prop="src">
          <el-input v-model="dialogForm.src" placeholder="组件的文件路径" />
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
// import IconSelect from "@/components/IconSelect";
import { getAllList } from "@/api/menu";
export default {
  name: "Menu",
  components: {
    // IconSelect
  },
  data() {
    return {
      dialogForm: {
        type: 0, icon: "eye", islink: 0, cache: 0, show: 1, title: "", name: "",
        path: "", sort: 999, src: ""
      },
      dialog: {
        show: false, title: null,
        rules: {
          title: [{ required: true, message: "必填" }],
          name: [{ required: true, message: "必填" }],
          path: [{ required: true, message: "必填" }],
          src: [{ required: true, message: "必填" }]
        }
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
      const { code, message, result } = await getAllList(this.listQuery);
      this.list = result;
      // this.listQuery.count = result.count;
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
    },
    // 选中图标
    selected(name) {
      console.log(name);
      this.dialogForm.icon = name;
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
