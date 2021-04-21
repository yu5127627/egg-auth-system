'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const SysRule = app.model.define('sys_rule', {
    action: {
      type: STRING(30),
      comment: '动作',
      allowNull: false,
    },
    description: {
      type: STRING,
      comment: '描述',
      allowNull: false,
    },
  }, {
    tableName: 'sys_rule',
    freezeTableName: true,
    timestamps: true,
  });

  SysRule.associate = function() {
    SysRule.belongsToMany(app.model.SysRole, {
      through: 'sys_role_rule',
      foreignKey: 'ruleId',
    }, { timestamps: false });
  };

  return SysRule;
};
