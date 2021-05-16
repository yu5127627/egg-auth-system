'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  joi: {
    enable: true,
    package: 'egg-joi',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
