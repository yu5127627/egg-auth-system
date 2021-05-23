'use strict';

const { Service } = require('egg');

class BaseService extends Service {
  /**
   * 设置实体
   * @param entity
   */
  setEntity (entity) {
    this.entity = entity;
  }

  async create (body) {
    return await this.entity.create(body);
  }

  async page(where, option) {
    return await this.entity.findAndCountAll({ where, ...option });
  }

  async list(where, option) {
    const filter = where ? { where } : {};
    option ? Object.assign(filter, option) : null;
    console.log(filter);
    return await this.entity.findAll(filter);
  }

  async update (id, body) {
    return await this.entity.update(body, { where: { id } });
  }
}

module.exports = BaseService;
