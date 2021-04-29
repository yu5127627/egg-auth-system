'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const SysRole = app.model.define('sys_role', {
    name: {
      type: STRING(30),
      comment: '名称',
      allowNull: false,
    },
    desc: {
      type: STRING,
      comment: '角色介绍',
      allowNull: false,
    },
  }, {
    tableName: 'sys_role',
    freezeTableName: true,
    timestamps: true,
    underscored: false,
  });

  SysRole.associate = function() {
    SysRole.belongsToMany(app.model.SysMenu, {
      through: 'sys_role_menu',
      foreignKey: 'roleId',
    }, { timestamps: false });

    SysRole.belongsToMany(app.model.SysRule, {
      through: 'sys_role_rule',
      foreignKey: 'roleId',
    }, { timestamps: false });
  };

  return SysRole;
};
