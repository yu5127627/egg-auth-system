const BaseController = require('../modules/BaseController');
const MODULE_KEY = 'manager';

class ManagerController extends BaseController {
  init() {
    this.MODULE_KEY = MODULE_KEY;
    this.setEntity(this.ctx.model.SysManager);
  }
}

module.exports = ManagerController;
