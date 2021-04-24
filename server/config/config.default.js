'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618835606536_4495';

  // add your middleware config here
  config.middleware = ['authRoutes', 'errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'], // []中放放出的白名单，*代表所有
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg_auth',
    username: 'root',
    password: '123456',
    logging: false,
    timezone: '+08:00',
    define: {
      underscored: false,
    },
  };

  config.jwtTokenSecret = 'jiami';

  config.joi = {
    options: {},
    locale: {
      'zh-cn': {},
    },
    throw: true, // throw immediately when capture exception
    throwHandle: error => { return error; }, // error message format when throw is true
    errorHandle: error => { return error; }, // error message format when throw is false
    resultHandle: result => { return result; }, // fromat result
  };

  config.cors = {
    origin: '*', // 匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return {
    ...config,
    ...userConfig,
  };
};
