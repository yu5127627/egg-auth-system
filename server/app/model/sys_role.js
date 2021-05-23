'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const SysRole = app.model.define('sys_role', {
    name: {
      type: STRING(30),
      comment: '名称',
      allowNull: false,
    },
    level: {
      type: INTEGER(10),
      comment: '角色级别',
      allowNull: false,
      defaultValue: 10,
    },
    desc: {
      type: STRING,
      comment: '角色介绍',
      defaultValue: '',
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
  };

  return SysRole;
};
