<template>
  <div class="mian-view">
    <!-- 操作栏 -->
    <div class="main-operate">
      <div>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="openDialog"
        >新增</el-button>
        <el-button v-rule="'menu:delete'" type="danger" icon="el-icon-delete" @click="handleRemove">删除</el-button>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-refresh" @click="fetchData">刷新</el-button>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="main-table-view">
      <el-table
        v-loading="loading"
        :data="list"
        row-key="id"
        :default-expand-all="true"
        lazy
        style="width: 100%"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="(selection)=>{selectList = selection.map(item=>item.id)}"
      >
        <el-table-column type="selection" />
        <el-table-column prop="title" label="名称" align="center" />
        <el-table-column prop="icon" label="图标" align="center">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.icon ? scope.row.icon : ''" />
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column prop="rule" label="权限规则" align="center" />
        <el-table-column prop="path" label="组件路径" align="center" />
        <el-table-column prop="islink" label="外链" align="center">
          <template slot-scope="scope">
            {{ scope.row.islink?'是':'否' }}
          </template>
        </el-table-column>
        <el-table-column prop="cache" label="缓存" align="center">
          <template slot-scope="scope">
            {{ scope.row.cache==true?'是':'否' }}
          </template>
        </el-table-column>
        <el-table-column prop="show" label="可见" align="center">
          <template slot-scope="scope">
            {{ scope.row.show==true?'是':'否' }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type===0" type="success" effect="plain">目录</el-tag>
            <el-tag v-if="scope.row.type===1" effect="plain">菜单</el-tag>
            <el-tag v-if="scope.row.type===2" type="info" effect="plain">规则</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-rule="'menu:update'" type="primary" size="mini" icon="el-icon-edit" @click="openDialog(scope.row)" />
            <el-button v-rule="'menu:delete'" type="danger" size="mini" icon="el-icon-delete" @click="handleRemove(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增/编辑 弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialog.show">
      <el-form :model="dialogForm" :rules="dialog.rules" label-width="90px" inline>
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="dialogForm.type" size="mini">
            <el-radio-button label="0">目录</el-radio-button>
            <el-radio-button label="1">菜单</el-radio-button>
            <el-radio-button label="2">规则</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="dialogForm.type!=2" label="菜单图标" prop="icon">
          <el-popover
            placement="bottom-start"
            width="450"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <icon-select ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="dialogForm.icon" placeholder="点击选择图标" style="width:450px;">
              <svg-icon v-if="dialogForm.icon" slot="prefix" :icon-class="dialogForm.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item v-if="dialogForm.type!=2" label="外链菜单">
          <el-radio-group v-model="dialogForm.islink" size="mini">
            <el-radio-button label="true">是</el-radio-button>
            <el-radio-button label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="dialogForm.type!=2&&dialogForm.type==1" label="缓存菜单">
          <el-radio-group v-model="dialogForm.cache" size="mini">
            <el-radio-button label="true">是</el-radio-button>
            <el-radio-button label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="dialogForm.type!=2" label="菜单可见">
          <el-radio-group v-model="dialogForm.show" size="mini">
            <el-radio-button label="true">是</el-radio-button>
            <el-radio-button label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="dialogForm.type==2?'规则名称':'菜单名称'" prop="title">
          <el-input v-model="dialogForm.title" />
        </el-form-item>
        <el-form-item label="权限规则" prop="rule">
          <el-input v-model="dialogForm.rule" />
        </el-form-item>
        <el-form-item v-if="dialogForm.type!=2" label="路由地址" prop="url">
          <el-input v-model="dialogForm.url" />
        </el-form-item>
        <el-form-item label="菜单排序">
          <el-input-number v-model="dialogForm.sort" :min="1" label="描述文字" />
        </el-form-item>
        <el-form-item v-if="dialogForm.type==1" label="组件名称" prop="name">
          <el-input v-model="dialogForm.name" placeholder="组件内的name" />
        </el-form-item>
        <el-form-item v-if="dialogForm.type==1" label="组件路径" prop="path">
          <el-input v-model="dialogForm.path" placeholder="组件的文件路径" />
        </el-form-item>
        <el-form-item label="所属目录">
          <treeselect
            v-model="dialogForm.pid"
            :options="catalog"
            style="width: 450px;"
            placeholder="所属目录"
          />
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
import IconSelect from "@/components/IconSelect";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getAllList, create, update, remove } from "@/api/menu";
import { mergeMenu } from "@/utils";
const defaultForm = JSON.stringify({
  type: 0, icon: "", islink: false, cache: false, show: true, title: "", name: "", rule: "",
  path: "", sort: 999, url: "", pid: 0
});
export default {
  name: "Menu",
  components: {
    IconSelect, Treeselect
  },
  data() {
    return {
      catalog: [{ id: 0, label: "顶级目录" }],
      dialogForm: JSON.parse(defaultForm),
      dialog: {
        show: false, title: null,
        rules: {
          title: [{ required: true, message: "必填", trigger: "blur" }],
          name: [{ required: true, message: "必填", trigger: "blur" }],
          path: [{ required: true, message: "必填", trigger: "blur" }],
          icon: [{ required: true, message: "必填", trigger: "blur" }],
          url: [{ required: true, message: "必填", trigger: "blur" }]
        }
      },
      loading: true,
      limits: [10, 20, 50, 100],
      listQuery: { },
      rules: {},
      list: [],
      selectList: []
    };
  },
  computed: { dialogTitle() { return this.dialogForm.id ? "编辑" : "创建"; } },
  async created() { await this.fetchData(); },
  methods: {
    openDialog(row) {
      if (row.id) {
        this.dialogForm = row;
      } else {
        this.dialogForm = JSON.parse(defaultForm);
      }
      this.dialog.show = true;
    },
    async handleSubmit() {
      let result;
      if (this.dialogForm.id) {
        result = await update(this.dialogForm.id, this.dialogForm);
      } else {
        result = await create(this.dialogForm);
      }
      const { code, message } = result;
      if (code === 200) {
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
      this.loading = true;
      const { result } = await getAllList(this.listQuery);
      this.mergeDirs(result);
      this.list = mergeMenu(0, result);
      this.loading = false;
    },
    mergeDirs(menu) {
      const children = [];
      menu.forEach(item => {
        if (item.type !== 2 && item.pid === 0) {
          const currentChild = this.filterDirs(item.id, menu);
          const dir = { id: item.id, label: item.title };
          if (currentChild.length > 0) {
            dir.children = currentChild;
          }
          children.push(dir);
        }
      });
      if (children.length > 0) {
        this.catalog = [{ id: 0, label: "顶级目录", children }];
      }
    },
    filterDirs(pid, menu) {
      const children = [];
      menu.forEach(item => {
        if (item.type !== 2 && item.pid === pid) {
          children.push({ id: item.id, label: item.title });
        }
      });
      return children;
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
    // 选中图标
    selected(name) {
      this.dialogForm.icon = name;
    }
  }
};
</script>

<style lang='scss' scoped>

</style>
