const BaseService = require('../modules/BaseService');
const { Op } = require('sequelize');

class RoleService extends BaseService {
  async create(body) {
    if (body.level === 0) throw new Error('顶级角色不可创建!');
    if (this.ctx.payload.role.level > body.level) {
      this.ctx.status = 403;
      throw new Error('操作越权!');
    }
    return await this.entity.create(body);
  }

  async update(id, body) {
    if (this.ctx.payload.role.level > body.level) {
      this.ctx.status = 403;
      throw new Error('操作越权!');
    }
    const { name, desc } = body;
    return await this.entity.update({ name, desc }, { where: { id } });
  }

  async setRules(id, menuIds) {
    const role = await this.entity.findByPk(id);
    if (this.ctx.payload.role.level > role.level) {
      this.ctx.status = 403;
      throw new Error('操作越权!');
    }
    await role.setSys_menus(menuIds);
  }

  async getRules(id) {
    const role = await this.entity.findByPk(id);
    if (this.ctx.payload.role.level > role.level) {
      this.ctx.status = 403;
      throw new Error('操作越权!');
    }
    return await role.getSys_menus({ attributes: ['id'] });
  }

  async list() {
    const LEVEL = this.ctx.payload.role.level;
    const where = LEVEL !== 0 ? { level: { [Op.gte]: LEVEL } } : {};
    return await this.ctx.model.SysRole.findAll({ where, attributes: ['id', 'name', 'level'], order: [['level', 'ASC']] });
  }
}

module.exports = RoleService;
