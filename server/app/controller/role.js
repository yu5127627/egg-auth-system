'use strict';

const BaseController = require('../modules/BaseController');

class RoleController extends BaseController {
  init() {
    this.setEntity(this.ctx.model.SysRole);
    this.setService(this.service.role);
  }
}

module.exports = RoleController;
