'use strict';

const { Controller } = require('egg');

class MenuController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, menu';
  }
}

module.exports = MenuController;
