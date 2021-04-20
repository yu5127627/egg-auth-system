'use strict';
const { readdirSync } = require('fs');
const path = require('path');
const ROUTES_DIR = './routes';

module.exports = app => {
  const routes = readdirSync(path.join(__dirname, ROUTES_DIR));
  routes.filter(v => (v.includes('.js') ? require(`${ROUTES_DIR}/${v}`)(app) : null));
};
