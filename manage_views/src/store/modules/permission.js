import router, { constantRoutes } from "@/router";
import { getAllList } from "@/api/menu";
import Layout from "@/layout";

const filterMenus = (pid, child) => {
  const cmenu = [];
  child.forEach(item => {
    if (item.pid === pid) {
      const children = filterMenus(item.id, child);
      if (children.length > 0) {
        child.children = children;
      }
      cmenu.push(item);
    }
  });
  return cmenu;
};

const mergeMenus = (menu) => {
  // 过滤出目录菜单
  const pmenu = [];
  const child = [];
  menu.forEach(item => {
    if (item.pid === 0) {
      pmenu.push({
        id: item.id,
        // 父级菜单需要加根标识
        path: "/" + item.path,
        component: Layout,
        hidden: !item.shownav,
        meta: {
          title: item.title,
          icon: item.icon,
          noCache: !item.keepalive
        }
      });
    } else {
      child.push({
        id: item.id,
        pid: item.pid,
        name: item.name,
        path: item.path,
        component: resolve => require([`@/views/${item.router}`], resolve),
        hidden: !item.shownav,
        meta: {
          title: item.title,
          icon: item.icon,
          noCache: !item.keepalive
        }
      });
    }
  });
  pmenu.forEach(item => {
    const children = filterMenus(item.id, child);
    if (children.length > 0) {
      item.children = children;
    }
  });
  return pmenu;
};

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
    // state.routes = constantRoutes;
  }
};

const actions = {
  async asyncMenus({ commit }) {
    const { result } = await getAllList();
    const routes = mergeMenus(result);
    routes.push({ path: "*", redirect: "/404", hidden: true });
    commit("SET_ROUTES", routes);
    return routes;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
