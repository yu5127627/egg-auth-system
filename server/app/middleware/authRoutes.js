const whitelist = ['/api/auth/login', '/api/auth/success', '/api/auth/failure'];

// 全局路由验证中间件
module.exports = () => {
  return async function (ctx, next) {
    const url = ctx.url;
    if (whitelist.includes(url)) {
      await next();
    } else {
      const token = ctx.headers.authorization;
      const payload = ctx.helper.verifyToken(token, ctx.app.config.jwtTokenSecret);
      if (payload === null) {
        ctx.status = 401;
        ctx.resBody({ code: 401, message: '无权访问' });
      } else {
        const { dataValues: { password, createdAt, updatedAt, username, ...result } } = await ctx.model.SysManager.findByPk(payload.id);
        ctx.user = result;
        await next();
      }
    }
  };
};
