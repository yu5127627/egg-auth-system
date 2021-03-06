'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.OpService = this.service.comm;
    this.init();
  }

  init () {
  }

  /**
   * 设置服务
   * @param service
   */
  setService (service) {
    this.OpService = service;
    this.OpService.setEntity(this.entity);
  }

  /**
   * 设置操作实体
   * @param entity
   */
  setEntity (entity) {
    this.entity = entity;
    this.OpService.setEntity(this.entity);
  }

  // 创建一个 model 实例
  async create() {
    let result;
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].create) {
      const model = this.ctx.validate(this.app.validator[this.MODULE_KEY].create, this.ctx.request.body, { stripUnknown: true });
      result = await this.OpService.create(model.value);
    } else {
      result = await this.OpService.create(this.ctx.request.body);
    }
    this.ctx.resBody({ result });
  }

  // 分页查询
  async page () {
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].page) {
      this.ctx.validate(this.app.validator[this.MODULE_KEY].page, this.ctx.request.query, { stripUnknown: true });
    }
    const where = {};
    const option = {};
    let { limit, page } = this.ctx.request.query;
    limit = parseInt(limit) || 20;
    page = parseInt(page) || 1;
    option.offset = (page - 1) * limit;
    option.limit = limit;
    const result = await this.OpService.page(where, option);
    this.ctx.resBody({ result });
  }

  // 查询一个
  async item () {
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].item) {
      this.ctx.validate(this.app.validator[this.MODULE_KEY].item, { id: this.ctx.params.id }, { stripUnknown: true });
    }
    const result = await this.entity.findByPk(this.ctx.params.id);
    this.ctx.resBody({ result });
  }

  // 所有查询
  async list () {
    const result = await this.OpService.list(this.ctx.query, null);
    this.ctx.resBody({ result });
  }

  // 更新
  async update() {
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].update) {
      const { value: { id, ...result } } = this.ctx.validate(this.app.validator[this.MODULE_KEY].update, { ...this.ctx.request.body, id: this.ctx.params.id }, { stripUnknown: true });
      await this.OpService.update(id, result);
    } else {
      const { id, ...result } = this.ctx.request.body;
      await this.OpService.update(this.ctx.params.id, result);
    }
    this.ctx.resBody();
  }

  // 删除
  async remove () {
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].remove) {
      const { value: { ids } } = this.ctx.validate(this.app.validator[this.MODULE_KEY].remove, { ids: this.ctx.request.body.ids }, { stripUnknown: true });
      await this.entity.destroy({ where: { id: ids } });
    } else {
      await this.entity.destroy({ where: { id: this.ctx.request.body.ids } });
    }
    this.ctx.resBody();
  }
}

module.exports = BaseController;
