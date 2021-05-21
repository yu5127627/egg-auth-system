<template>
  <div class="menu-tree">
    <el-tree
      ref="menuTree"
      :data="MENU_LIST"
      show-checkbox
      node-key="id"
      check-strictly
      :default-checked-keys="checklist"
      :props="defaultProps"
      @check="menuChange"
    />
    <div class="opera">
      <el-button type="primary" @click="getCurrentKey">保存</el-button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("permission");
const { mapState } = createNamespacedHelpers("user");
import { filterMenu } from "@/utils";
export default {
  name: "MenuTree",
  props: {
    checkMenu: {
      type: Array,
      default: () => { []; }
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title"
      },
      checklist: this.checkMenu
    };
  },
  computed: {
    ...mapGetters(["MENU_LIST"]),
    ...mapState(["menus"])
  },
  methods: {
    getCurrentKey() {
      this.$emit("checklist", this.$refs.menuTree.getCheckedKeys());
    },
    menuChange(menu) {
      let index = this.checklist.indexOf(menu.id);
      const childIds = filterMenu(menu.id, this.menus).map(item => item.id);
      if (index !== -1) {
        this.checklist.splice(index, 1);
        childIds.forEach(item => {
          index = this.checklist.indexOf(item);
          if (index !== -1) {
            this.checklist.splice(index, 1);
          }
        });
      } else {
        this.checklist.push(menu.id);
        childIds.forEach(item => {
          index = this.checklist.indexOf(item);
          if (index === -1) {
            this.checklist.push(item);
          }
        });
      }
      this.$refs.menuTree.setCheckedKeys(this.checklist);
    }
  }
};
</script>

<style>
.el-tree{
  max-height: 100%;
}
.opera{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
