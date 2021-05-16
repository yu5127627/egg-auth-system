const BaseController = require('../modules/BaseController');

class AuthClass extends BaseController {
  async login(ctx) {
    const token = ctx.helper.createToken(ctx.user.id, this.app.config.jwtTokenSecret);
    const role = await ctx.model.SysRole.findByPk(ctx.user.roleId);
    const menu = await role.getSys_menus();
    const rules = [];
    menu.forEach(item => {
      item.type === 2 ? rules.push(item.rule) : null;
    });
    const content = {
      user: ctx.user, role: role.dataValues, rules: [...new Set(rules)], menus: menu.map(item => item.dataValues),
    };
    await this.app.redis.set(`eggAuth:token:${token}`, JSON.stringify(content), 'EX', 3600);
    this.ctx.resBody({ result: { token } });
  }
}

module.exports = AuthClass;
