'use strict';

const BaseController = require('../modules/BaseController');
const MODULE_KEY = 'role';

class RoleController extends BaseController {
  init() {
    this.MODULE_KEY = MODULE_KEY;
    this.setEntity(this.ctx.model.SysRole);
    this.setService(this.service.role);
  }

  async list () {
    const result = await this.OpService.list(null, { attributes: ['id', 'name'] });
    this.ctx.resBody({ result });
  }

  async setRules() {
    const role = await this.entity.findByPk(this.ctx.params.id);
    await role.setSys_menus(this.ctx.request.body.menuIds);
    this.ctx.resBody();
  }

  async getRules() {
    const role = await this.entity.findByPk(this.ctx.params.id);
    const result = await role.getSys_menus({ attributes: ['id'] });
    this.ctx.resBody({ result: result.map(item => item.id) });
  }
}

module.exports = RoleController;
