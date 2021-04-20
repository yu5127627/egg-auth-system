'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const SysManager = app.model.define('sys_manager', {
    username: {
      type: STRING(30),
      comment: '用户名',
      allowNull: false,
    },
    password: {
      type: STRING(32),
      comment: '密码',
      allowNull: false,
    },
  }, {
    tableName: 'sys_manager',
    freezeTableName: true,
    timestamps: true,
  });

  SysManager.associate = function() {
    SysManager.belongsTo(app.model.SysRole, {
      foreignKey: 'roleId',
      targetKey: 'id',
    });
  };

  return SysManager;
};
