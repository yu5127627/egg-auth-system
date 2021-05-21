import Vue from "vue";
import store from "../store";

Vue.directive("rule", {
  // 当绑定元素插入到 DOM 中。
  bind: function(el, binding) {
    if (store.state.user.rules.includes(binding.value)) return;
    el.setAttribute("disabled", "disabled");
    el.classList.add("is-disabled");
  }
});
