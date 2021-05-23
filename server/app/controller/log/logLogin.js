const BaseController = require('../../modules/BaseController');
const MODULE_KEY = 'loglogin';

class LogloginController extends BaseController {
  init() {
    this.MODULE_KEY = MODULE_KEY;
    this.setEntity(this.ctx.model.LogLogin);
  }
}

module.exports = LogloginController;
