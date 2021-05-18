const whitelist = ['/api/auth/login'];

// 全局路由验证中间件
module.exports = () => {
  return async function (ctx, next) {
    const url = ctx.url;
    if (whitelist.includes(url)) {
      await next();
    } else {
      const payload = ctx.helper.verifyToken(ctx.headers.authorization, ctx.app.config.jwtTokenSecret);
      const user = await ctx.app.redis.get(`eggAuth:token:${payload.id}`);
      if (user === null) {
        ctx.status = 401;
        ctx.resBody({ code: 401, message: '无权访问' });
      } else {
        ctx.payload = JSON.parse(user);
        ctx.payload.user.password = null;
        await next();
      }
    }
  };
};
