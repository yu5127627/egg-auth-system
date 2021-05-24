const BaseController = require('../modules/BaseController');
const parser = require('ua-parser-js');
class AuthClass extends BaseController {
  async login(ctx) {
    // 生成 token
    const token = ctx.helper.createToken(ctx.user.id, this.app.config.jwtTokenSecret);
    // 获取关联角色
    const role = await ctx.model.SysRole.findByPk(ctx.user.roleId);
    // 获取角色菜单(权限)
    const menu = await role.getSys_menus();
    const rules = [];
    menu.forEach(item => {
      item.type === 2 ? rules.push(item.rule) : null;
    });
    const content = {
      user: ctx.user, role: role.dataValues, rules: [...new Set(rules)], menus: menu.map(item => item.dataValues),
    };
    // 存入 redis
    await this.app.redis.set(`eggAuth:token:${ctx.user.id}`, JSON.stringify(content), 'EX', 3600);
    // 更新登录时间
    await this.ctx.model.SysManager.updateLogin(ctx.user.id);
    // 获取登录平台
    const ua = parser(ctx.headers['user-agent']);
    // 生成登录日志
    await this.ctx.model.LogLogin.create({ username: ctx.user.username, ip: ctx.ip, address: '', browser: `${ua.os.name}${ua.os.version} / ${ua.browser.name}${ua.browser.version} `, managerId: ctx.user.id });
    this.ctx.resBody({ result: { token } });
  }

  async logout(ctx) {
    await this.app.redis.del(`eggAuth:token:${ctx.payload.user.id}`);
    this.ctx.resBody();
  }
}

module.exports = AuthClass;
