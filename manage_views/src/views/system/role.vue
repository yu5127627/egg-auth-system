<template>
  <div class="mian-view">
    <!-- 操作栏 -->
    <div class="main-operate">
      <div>
        <el-button v-rule="'role:create'" type="primary" icon="el-icon-circle-plus-outline" @click="openDialog">新增</el-button>
        <el-button v-rule="'role:delete'" type="danger" icon="el-icon-delete" @click="handleRemove">删除</el-button>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-refresh" @click="fetchData">刷新</el-button>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="main-table-view">
      <el-table :data="list" border style="width: 100%" @selection-change="(selection)=>{selectList = selection.map(item=>item.id)}">
        <el-table-column type="selection" />
        <el-table-column prop="id" label="ID" width="50px" align="center" />
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="level" label="级别" align="center" />
        <el-table-column prop="desc" label="描述" align="center" />
        <el-table-column fixed="right" label="资源配置" align="center">
          <template slot-scope="scope">
            <el-button v-rule="'role:update'" type="primary" size="mini" icon="el-icon-menu" @click="openDialogMenu(scope.row)">资源分配</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-rule="'role:update'" type="primary" size="mini" icon="el-icon-edit" @click="openDialog(scope.row)" />
            <el-button v-rule="'role:delete'" type="danger" :disabled="scope.row.level===0||scope.row.id===1?true:false" size="mini" icon="el-icon-delete" @click="handleRemove(scope.row)" />
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="dialogForm.name" />
        </el-form-item>
        <el-form-item label="角色级别" prop="level">
          <el-input-number v-model="dialogForm.level" :min="1" label="角色级别" />
        </el-form-item>
        <el-form-item label="角色描述" prop="">
          <el-input v-model="dialogForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 资源配置 -->
    <el-dialog v-if="dialogMenu.show" :title="dialogMenu.title" :visible.sync="dialogMenu.show">
      <menu-tree :check-menu="dialogMenu.checkMenuIds" @checklist="changeCheck" />
    </el-dialog>
  </div>
</template>

<script>
import MenuTree from "@/components/MenuTree";
import { getList, update, create, remove, setRules, getRules } from "@/api/role";
const defaultForm = JSON.stringify({ name: "", desc: "", level: "" });
export default {
  name: "Role",
  components: {
    MenuTree
  },
  data() {
    return {
      dialogForm: JSON.parse(defaultForm),
      dialog: {
        show: false, title: null,
        rules: {
          name: [{ required: true, message: "角色名称不得为空", trigger: "blur" }],
          level: [{ required: true, message: "角色级别必填", trigger: "blur" }]
        }
      },
      dialogMenu: {
        show: false, title: "资源分配", id: null, checkMenuIds: []
      },
      limits: [10, 20, 50, 100],
      listQuery: { page: 1, count: 0, limit: 10 },
      list: [],
      selectList: []
    };
  },
  computed: {
    dialogTitle() { return this.dialogForm.id ? "编辑" : "创建"; }
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async changeCheck(list) {
      const { code, message } = await setRules(this.dialogMenu.id, { menuIds: list });
      if (code === 200) {
        this.$message({ message, type: "success" });
        this.dialogMenu.show = false;
      }
    },
    openDialog(row) {
      this.dialogForm = row.id ? row : JSON.parse(defaultForm);
      this.dialog.show = true;
    },
    async handleSubmit() {
      const { code, message } = this.dialogForm.id ? await update(this.dialogForm.id, this.dialogForm) : await create(this.dialogForm);
      if (code === 200) {
        await this.$store.dispatch("user/getRole");
        this.$message({
          message: message,
          type: "success"
        });
        this.dialog.show = false;
        this.dialogForm = JSON.parse(defaultForm);
        await this.fetchData();
      }
    },
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
        await this.$store.dispatch("user/getRole");
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    async openDialogMenu(row) {
      const { result } = await getRules(row.id);
      this.dialogMenu.checkMenuIds = result;
      this.dialogMenu.id = row.id;
      this.dialogMenu.show = true;
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
