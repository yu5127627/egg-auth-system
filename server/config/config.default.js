'use strict';
const fs = require('fs');
const path = require('path');

/**
 * @param {Egg.EggAppInfo} app app info
 */
module.exports = app => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    // use for cookie sign key, should change to your own and keep security
    keys: app.name + '_1618835606536_4495',
    // add your middleware config here
    middleware: ['authRoutes', 'errorHandler'],
    assets: {
      publicPath: '/public/',
    },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      domainWhiteList: ['*'], // []中放放出的白名单，*代表所有
    },
    sequelize: {
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'egg_auth',
      username: 'root',
      password: '123456',
      logging: msg => {
        const sqlLog = path.join(__dirname, '../logs/mysql.dev.sql');
        if (!fs.existsSync(sqlLog)) {
          fs.writeFileSync(sqlLog, '', 'utf8');
        }
        fs.appendFileSync(sqlLog, '\n' + msg, 'utf8');
      },
      timezone: '+08:00',
      define: {
        underscored: false,
      },
    },
    jwtTokenSecret: 'jiami',
    joi: {
      options: {},
      locale: {
        'zh-cn': {},
      },
      throw: true, // throw immediately when capture exception
      throwHandle: error => { return error; }, // error message format when throw is true
      errorHandle: error => { return error; }, // error message format when throw is false
      resultHandle: result => { return result; }, // fromat result
    },
    cors: {
      origin: '*', // 匹配规则  域名+端口  *则为全匹配
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    static: {
      dir: [
        { prefix: '/public/', dir: path.join(app.baseDir, 'public') },
        { prefix: '/upload/', dir: path.join(app.baseDir, 'app/public/upload') },
      ],
    },
  };

  return {
    ...config,
  };
};
