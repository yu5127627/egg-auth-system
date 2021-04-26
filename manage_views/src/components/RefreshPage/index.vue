<template>
  <div>
    <svg-icon icon-class="refresh" @click="handleClick" />
  </div>
</template>

<script>
export default {
  name: "RefreshPage", // 刷新页面组件
  methods: {
    handleClick() {
      this.$router.replace({
        path: this.$router.currentRoute.fullPath
      });
    }
  }
};
</script>

<style></style>
