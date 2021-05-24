const { compareSync } = require('bcryptjs');

// 验证用户名账号密码中间件
module.exports = () => {
  return async function verifyManager (ctx, next) {
    const { username, password } = ctx.request.body;
    const manager = await ctx.model.SysManager.findOne({ where: { username } });
    if (manager && compareSync(password, manager.password)) {
      ctx.user = manager.dataValues;
      await next();
    } else {
      throw new Error('用户名或密码错误');
    }
  };
};
