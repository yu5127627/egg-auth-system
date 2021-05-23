const { hashSync } = require('bcryptjs');

module.exports = app => {
  const { STRING, DATE, NOW } = app.Sequelize;

  const SysManager = app.model.define('sys_manager', {
    username: {
      type: STRING(30),
      comment: '用户名',
      allowNull: false,
    },
    password: {
      type: STRING(64),
      comment: '密码',
      allowNull: false,
      set (val) {
        this.setDataValue('password', hashSync(val));
      },
    },
    nickname: {
      type: STRING(30),
      comment: '昵称',
      allowNull: false,
    },
    avatar: {
      type: STRING,
      comment: '头像',
      allowNull: false,
    },
    ctime: { type: DATE, allowNull: false, defaultValue: NOW, comment: '创建时间' },
    login_time: { type: DATE, allowNull: false, defaultValue: NOW, comment: '登录时间' },
  }, {
    tableName: 'sys_manager',
    freezeTableName: true,
    timestamps: false,
  });

  SysManager.associate = function () {
    SysManager.belongsTo(app.model.SysRole, {
      foreignKey: 'roleId',
      targetKey: 'id',
    });
  };

  SysManager.updateLogin = async function(id) {
    const row = await this.findByPk(id);
    return await row.update({ login_time: Date.now() });
  };

  return SysManager;
};
