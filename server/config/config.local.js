const path = require('path');
const fs = require('fs');

module.exports = app => {
  return {
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
    redis: {
      client: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '',
        db: 0,
      },
    },
  };
};
