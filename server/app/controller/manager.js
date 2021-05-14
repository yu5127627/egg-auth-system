const BaseController = require('../modules/BaseController');
const MODULE_KEY = 'manager';
const { Op } = require('sequelize');

class ManagerController extends BaseController {
  init () {
    this.MODULE_KEY = MODULE_KEY;
    this.setEntity(this.ctx.model.SysManager);
  }

  info () {
    this.ctx.resBody({ result: this.ctx.user });
  }

  async index() {
    this.ctx.validate(this.app.validator[this.MODULE_KEY].index, this.ctx.request.query, { stripUnknown: true });
    let { limit, page, nickname, username, roleId } = this.ctx.request.query;
    const where = {};
    roleId ? where.roleId = roleId : null;
    nickname ? where.nickname = { [Op.like]: `%${nickname}%` } : null;
    username ? where.username = { [Op.like]: `%${username}%` } : null;
    const option = { attributes: { exclude: ['password'] } };
    limit = parseInt(limit) || 20;
    page = parseInt(page) || 1;
    option.offset = (page - 1) * limit;
    option.limit = limit;
    const result = await this.OpService.page(where, option);
    this.ctx.resBody({ result });
  }
}

module.exports = ManagerController;
