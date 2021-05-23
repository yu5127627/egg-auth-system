'use strict';

const BaseController = require('../modules/BaseController');
const MODULE_KEY = 'role';
const { Op } = require('sequelize');

class RoleController extends BaseController {
  init() {
    this.MODULE_KEY = MODULE_KEY;
    this.setEntity(this.ctx.model.SysRole);
    this.setService(this.service.role);
  }

  async page() {
    this.ctx.validate(this.app.validator[this.MODULE_KEY].page, this.ctx.request.query, { stripUnknown: true });
    let { limit, page } = this.ctx.request.query;
    const option = {};
    limit = parseInt(limit) || 20;
    page = parseInt(page) || 1;
    option.offset = (page - 1) * limit;
    option.limit = limit;
    option.order = [['level', 'ASC']];
    const where = {
      level: { [Op.gte]: this.ctx.payload.role.level },
    };
    const result = await this.OpService.page(where, option);
    this.ctx.resBody({ result });
  }

  async create() {
    const model = this.ctx.validate(this.app.validator[this.MODULE_KEY].create, this.ctx.request.body, { stripUnknown: true });
    const result = await this.OpService.create(model.value);
    this.ctx.resBody({ result });
  }

  async update() {
    const { value: { id, ...result } } = this.ctx.validate(this.app.validator[this.MODULE_KEY].update, { ...this.ctx.request.body, id: this.ctx.params.id }, { stripUnknown: true });
    await this.OpService.update(id, result);
    this.ctx.resBody();
  }

  // 删除
  async remove () {
    const { value: { ids } } = this.ctx.validate(this.app.validator[this.MODULE_KEY].remove, { ids: this.ctx.request.body.ids }, { stripUnknown: true });
    if (ids.includes(1)) throw new Error('顶级角色不可删除!');
    await this.entity.destroy({ where: { id: ids } });
    this.ctx.resBody();
  }

  async list() {
    const result = await this.OpService.list();
    this.ctx.resBody({ result });
  }

  async setRules() {
    await this.OpService.setRules(this.ctx.params.id, this.ctx.request.body.menuIds);
    this.ctx.resBody();
  }

  async getRules() {
    const result = await this.OpService.getRules(this.ctx.params.id);
    this.ctx.resBody({ result: result.map(item => item.id) });
  }
}

module.exports = RoleController;
