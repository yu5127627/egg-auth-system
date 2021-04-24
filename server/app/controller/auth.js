const BaseController = require('../modules/BaseController');

class AuthClass extends BaseController {
  login (ctx) {
    const token = ctx.helper.createToken(ctx.user.id, this.app.config.jwtTokenSecret);
    this.ctx.resBody({ result: { token } });
  }
}

module.exports = AuthClass;
