const BaseController = require('../modules/BaseController');
const MODULE_KEY = 'menu';

class MenuController extends BaseController {
  init() {
    this.MODULE_KEY = MODULE_KEY;
    this.setEntity(this.ctx.model.SysMenu);
  }
}

module.exports = MenuController;
