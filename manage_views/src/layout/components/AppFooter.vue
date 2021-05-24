<template>
  <div class="app-footer">
    <div class="mark">{{ mark }}</div>
  </div>
</template>

<script>
import { mark } from "@/settings";
export default {
  name: "AppFooter",
  data() {
    return {
      mark
    };
  }
};
</script>

<style lang="scss" scoped>
  .app-footer{
    height: 40px;
    font-weight: 500;
    .mark{
      font-size: 12px;
      line-height: 20px;
      color: #999;
      text-align: center;
      padding: 10px 0;
    }
  }
</style>
