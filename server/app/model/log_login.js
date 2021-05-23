
module.exports = app => {
  const { STRING, DATE, NOW } = app.Sequelize;

  const LogLogin = app.model.define('log_login', {
    username: {
      type: STRING(30),
      comment: '用户名',
      allowNull: false,
    },
    ip: {
      type: STRING(64),
      comment: '登录ip',
      allowNull: false,
    },
    address: {
      type: STRING,
      comment: '位置',
      allowNull: false,
    },
    browser: {
      type: STRING,
      comment: '浏览器',
      allowNull: false,
    },
    login_time: { type: DATE, allowNull: false, defaultValue: NOW, comment: '登录时间' },
  }, {
    tableName: 'log_login',
    freezeTableName: true,
    timestamps: false,
  });

  LogLogin.associate = function () {
    LogLogin.belongsTo(app.model.SysManager, {
      foreignKey: 'managerId',
      targetKey: 'id',
    });
  };

  return LogLogin;
};
