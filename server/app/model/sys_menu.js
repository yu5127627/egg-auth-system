'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const SysMenu = app.model.define('sys_menu', {
    title: {
      type: STRING(30),
      comment: '路由显示的名称',
      allowNull: false,
    },
    name: {
      type: STRING(30),
      comment: '路由名称',
      allowNull: false,
    },
    icon: {
      type: STRING(64),
      comment: '图标',
      allowNull: false,
    },
    shownav: {
      type: BOOLEAN,
      defaultValue: true,
      allowNull: false,
      comment: '是否显示在侧边栏',
    },
    keepalive: {
      type: BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: '是否缓存',
    },
    path: {
      type: STRING,
      comment: '路径',
      allowNull: false,
    },
    router: {
      type: STRING,
      comment: '组件路径',
      allowNull: false,
    },
    sort: {
      type: INTEGER,
      comment: '排序',
      allowNull: false,
      defaultValue: 1000,
    },
    pid: {
      type: INTEGER,
      comment: '父菜单',
      defaultValue: 0, // 0:无  1: 菜单
      allowNull: false,
    },
  }, {
    tableName: 'sys_menu',
    freezeTableName: true,
    timestamps: true,
    underscored: false,
  });

  SysMenu.associate = function() {
    SysMenu.belongsToMany(app.model.SysRole, {
      through: 'sys_role_menu',
      foreignKey: 'menuId',
    }, { timestamps: false });
  };

  return SysMenu;
};
