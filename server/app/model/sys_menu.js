'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const SysMenu = app.model.define('sys_menu', {
    title: {
      type: STRING(30),
      comment: '名称',
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
