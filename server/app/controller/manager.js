'use strict';

const { Controller } = require('egg');

class ManagerController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, manager';
  }
}

module.exports = ManagerController;
