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
    proxy: true,
    maxIpsCount: 1,
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      domainWhiteList: ['*'], // []中放放出的白名单，*代表所有
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
