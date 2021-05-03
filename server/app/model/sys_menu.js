'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const SysMenu = app.model.define('sys_menu', {
    type: {
      type: INTEGER(1),
      allowNull: false,
      defaultValue: 0,
      comment: '菜单类型', // 0:目录  1:菜单
    },
    icon: {
      type: STRING(64),
      allowNull: false,
      comment: '图标',
    },
    islink: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '外链菜单',
    },
    cache: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '缓存菜单',
    },
    show: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: '菜单可见',
    },
    title: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '菜单名称',
    },
    url: {
      type: STRING,
      allowNull: false,
      defaultValue: '/',
      comment: '菜单地址',
    },
    name: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '组件名称',
    },
    rule: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '权限规则',
    },
    sort: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 999,
      comment: '排序',
    },
    path: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '组件路径',
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
    timestamps: false,
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
