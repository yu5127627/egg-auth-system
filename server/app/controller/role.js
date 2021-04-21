'use strict';

const BaseController = require('../modules/BaseController');
const MODULE_KEY = 'role';

class RoleController extends BaseController {
  init() {
    this.MODULE_KEY = MODULE_KEY;
    this.setEntity(this.ctx.model.SysRole);
    this.setService(this.service.role);
  }
}

module.exports = RoleController;
