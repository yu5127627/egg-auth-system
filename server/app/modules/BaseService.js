'use strict';

const { Service } = require('egg');

class BaseService extends Service {
  /**
   * 设置实体
   * @param entity
   */
  setEntity(entity) {
    this.entity = entity;
  }

  async create(body) {
    return await this.entity.create(body);
  }

  async page(query) {
    console.log(1);
    return await this.entity.findAndCountAll();
  }

  async list() {
    return await this.entity.findAll();
  }

  async update(id, body) {
    return await this.entity.update(body, { where: { id } });
  }
}

module.exports = BaseService;
