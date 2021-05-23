const BaseController = require('../modules/BaseController');
const parser = require('ua-parser-js');
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
    await this.app.redis.set(`eggAuth:token:${ctx.user.id}`, JSON.stringify(content), 'EX', 3600);
    await this.ctx.model.SysManager.updateLogin(ctx.user.id);
    const ua = parser(ctx.headers['user-agent']);
    await this.ctx.model.LogLogin.create({ username: ctx.user.username, ip: ctx.ip, address: '', browser: `${ua.os.name}${ua.os.version} / ${ua.browser.name}${ua.browser.version} `, managerId: ctx.user.id });
    this.ctx.resBody({ result: { token } });
  }

  async logout(ctx) {
    await this.app.redis.del(`eggAuth:token:${ctx.payload.user.id}`);
    this.ctx.resBody();
  }
}

module.exports = AuthClass;
