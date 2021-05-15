import { constantRoutes } from "@/router";
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
      if (item.islink) {
        pmenu.push({
          id: item.id,
          path: item.url,
          component: Layout,
          meta: {
            title: item.title,
            icon: item.icon
          }
        });
      } else {
        pmenu.push({
          id: item.id,
          path: item.url,
          component: Layout,
          hidden: !item.show,
          alwaysShow: true,
          redirect: "noRedirect",
          meta: {
            title: item.title,
            icon: item.icon,
            noCache: !item.cache
          }
        });
      }
    } else {
      child.push({
        id: item.id,
        pid: item.pid,
        name: item.name,
        path: item.url,
        hidden: !item.show,
        component: resolve => require([`@/views${item.path}`], resolve),
        meta: {
          title: item.title,
          icon: item.icon,
          noCache: !item.cache
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
  pmenu.push({ path: "*", redirect: "/404", hidden: true });
  return pmenu;
};

const mergeMenu = (pid, menu) => {
  const children = [];
  menu.forEach(item => {
    if (item.pid === pid) {
      const currentChild = mergeMenu(item.id, menu);
      if (currentChild.length > 0) {
        item.children = currentChild;
      }
      children.push(item);
    }
  });
  return children;
};

const state = {
  routes: [],
  addRoutes: [],
  menuList: []
};

const getters = {
  MENU_LIST(state) {
    return state.menuList;
  }
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
  SET_MENUS_LIST: (state, menus) => {
    state.menuList = mergeMenu(0, menus);
  }
};

const actions = {
  async asyncMenus({ commit }) {
    const { result } = await getAllList();
    result.sort((a, b) => a.sort - b.sort);
    commit("SET_MENUS_LIST", JSON.parse(JSON.stringify(result)));
    const routes = mergeMenus(result);
    commit("SET_ROUTES", routes);
    return routes;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
