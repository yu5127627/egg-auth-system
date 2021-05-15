<template>
  <div class="menu-tree">
    <el-tree
      ref="menuTree"
      :data="MENU_LIST"
      show-checkbox
      node-key="id"
      :default-checked-keys="checklist"
      :props="defaultProps"
    />
    <div class="opera">
      <el-button type="primary" @click="getCurrentKey">保存</el-button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("permission");
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
    ...mapGetters(["MENU_LIST"])
  },
  methods: {
    getCurrentKey() {
      this.$emit("checklist", this.$refs.menuTree.getCheckedKeys());
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
