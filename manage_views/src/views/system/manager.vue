<template>
  <div class="mian-view">
    <!-- 操作栏 -->
    <div class="main-operate">
      <div>
        <el-button v-rule="'manager:create'" type="primary" icon="el-icon-circle-plus-outline" @click="openDialog">新增</el-button>
        <el-button v-rule="'manager:delete'" type="danger" icon="el-icon-delete" @click="handleRemove">删除</el-button>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
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
        <el-form-item label="昵称">
          <el-input v-model="listQuery.nickname" placeholder="输入用户昵称" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="listQuery.username" placeholder="输入用户名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="listQuery.roleId" placeholder="选择角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- 主要内容 -->
    <div class="main-table-view">
      <el-table :data="list" border style="width: 100%" @selection-change="(selection)=>{selectList = selection.map(item=>item.id)}">
        <el-table-column type="selection" />
        <el-table-column prop="id" label="ID" width="50px" align="center" />
        <el-table-column
          prop="avatar"
          label="头像"
          align="center"
        >
          <template slot-scope="scope">
            <el-avatar size="medium" :src="host+scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center" />
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="roleId" label="角色" align="center">
          <template slot-scope="scope">
            {{ filterRole(scope.row.roleId) }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createdAt|moment('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-rule="'manager:update'" type="primary" size="mini" icon="el-icon-edit" @click="openDialog(scope.row)" />
            <el-button v-rule="'manager:delete'" type="danger" size="mini" icon="el-icon-delete" @click="handleRemove(scope.row)" />
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
      <el-form :model="dialogForm" :rules="dialog.rules" label-width="90px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dialogForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dialogForm.password" type="password" />
        </el-form-item>
        <el-form-item label="角色" prop="">
          <el-select v-model="dialogForm.roleId" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, update, create, remove } from "@/api/manager";
import { getAllList } from "@/api/role";
const defaultForm = JSON.stringify({
  username: "", password: "", roleId: ""
});
export default {
  name: "Manager",
  data() {
    return {
      dialogForm: JSON.parse(defaultForm),
      dialog: {
        show: false, title: null,
        rules: {
          username: [{ required: true, message: "用户名不得为空", trigger: "blur" }],
          password: [
            { required: true, message: "密码不得为空", trigger: "blur" },
            { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
          ],
          roleId: [{ required: true, message: "请关联一个角色", trigger: "blur" }]
        }
      },
      limits: [10, 20, 50, 100],
      listQuery: { page: 1, count: 0, limit: 10 },
      list: [],
      selectList: [],
      roles: []
    };
  },
  computed: {
    dialogTitle() { return this.dialogForm.id ? "编辑" : "创建"; }
  },
  async created() {
    await this.fetchData();
    const { result } = await getAllList();
    this.roles = result;
  },
  methods: {
    filterRole(id) {
      const item = this.roles.find(item => item.id === id);
      return item ? item.name : null;
    },
    openDialog(row) {
      this.dialogForm = row.id ? row : JSON.parse(defaultForm);
      this.dialog.show = true;
    },
    async handleSubmit() {
      try {
        const { code, message } = this.dialogForm.id ? await update(this.dialogForm.id, this.dialogForm) : await create(this.dialogForm);
        if (code === 200) {
          this.$message({
            message: message,
            type: "success"
          });
          this.dialog.show = false;
          this.dialogForm = JSON.parse(defaultForm);
          await this.fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchData() {
      const { result } = await getList(this.listQuery);
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
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
