'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.OpService = this.service.comm;
    this.init();
  }

  init() {
  }

  /**
   * 设置服务
   * @param service
   */
  setService(service) {
    this.OpService = service;
    this.OpService.setEntity(this.entity);
  }

  /**
   * 设置操作实体
   * @param entity
   */
  setEntity(entity) {
    this.entity = entity;
    this.OpService.setEntity(this.entity);
  }

  // 创建一个 model 实例
  async create() {
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].create) {
      this.ctx.validate(this.app.validator[this.MODULE_KEY].create, this.ctx.request.body);
    }
    const result = await this.OpService.create(this.ctx.request.body);
    this.ctx.resBody({ result });
  }

  // 分页查询
  async index() {
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].index) {
      this.ctx.validate(this.app.validator[this.MODULE_KEY].index, this.ctx.request.query);
    }
    const result = await this.OpService.page(this.ctx.query);
    this.ctx.resBody({ result });
  }

  // 查询一个
  async item() {
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].item) {
      this.ctx.validate(this.app.validator[this.MODULE_KEY].item, { id: this.ctx.params.id });
    }
    const result = await this.entity.findByPk(this.ctx.params.id);
    this.ctx.resBody({ result });
  }

  // 所有查询
  async list() {
    const result = await this.OpService.list(this.ctx.query);
    this.ctx.resBody({ result });
  }

  // 更新
  async update() {
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].update) {
      this.ctx.validate(this.app.validator[this.MODULE_KEY].update, { ...this.ctx.request.body, id: this.ctx.params.id });
    }
    await this.OpService.update(this.ctx.params.id, this.ctx.request.body);
    this.ctx.resBody();
  }

  // 删除
  async remove() {
    if (this.app.validator[this.MODULE_KEY] && this.app.validator[this.MODULE_KEY].remove) {
      this.ctx.validate(this.app.validator[this.MODULE_KEY].remove, { id: this.ctx.params.id });
    }
    await this.entity.destroy({ where: { id: this.ctx.params.id } });
    this.ctx.resBody();
  }
}

module.exports = BaseController;
