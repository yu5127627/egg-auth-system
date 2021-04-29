import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [{
      path: "dashboard",
      name: "Dashboard",
      component: () => import("@/views/dashboard/index"),
      meta: { title: "仪表盘", icon: "el-icon-monitor", affix: true }
    }]
  },

  {
    path: "/system",
    component: Layout,
    meta: { title: "系统管理", icon: "el-icon-setting" },
    children: [
      {
        path: "menu",
        name: "Menu",
        component: () => import("@/views/system/menu"),
        meta: { title: "菜单列表", icon: "el-icon-menu" }
      },
      {
        path: "manager",
        name: "Manager",
        component: () => import("@/views/system/manager"),
        meta: { title: "用户列表", icon: "el-icon-user" }
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/system/role"),
        meta: { title: "角色列表", icon: "el-icon-s-custom" }
      },
      {
        path: "rule",
        name: "Rule",
        component: () => import("@/views/system/rule"),
        meta: { title: "资源配置", icon: "el-icon-s-operation" }
      }
    ]
  },
  // {
  //   path: "/cms",
  //   component: Layout,
  //   meta: { title: "cms", icon: "el-icon-setting" },
  //   children: [
  //     {
  //       path: "article",
  //       name: "article",
  //       component: () => import("@/views/cms/article"),
  //       meta: { title: "文章", icon: "el-icon-menu" }
  //     }
  //   ]
  // },

  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://panjiachen.github.io/vue-element-admin-site/#/",
        meta: { title: "Github", icon: "link" }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
