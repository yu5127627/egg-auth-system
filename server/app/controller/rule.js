'use strict';

const { Controller } = require('egg');

class RuleController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, rule';
  }
}

module.exports = RuleController;
