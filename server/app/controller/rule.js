'use strict';

const BaseController = require('../modules/BaseController');
const MODULE_KEY = 'rule';

class RuleController extends BaseController {
  async init() {
    this.MODULE_KEY = MODULE_KEY;
    this.setEntity(this.ctx.model.SysRule);
  }
}

module.exports = RuleController;
