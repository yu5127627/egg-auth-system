const whitelist = ['/api/auth/login']; // 接口白名单

// 全局路由验证中间件
module.exports = () => {
  return async function (ctx, next) {
    const url = ctx.url;
    if (whitelist.includes(url)) {
      await next();
    } else {
      const token = ctx.headers.authorization;
      if (token) {
        // 解析 token
        const payload = ctx.helper.verifyToken(token, ctx.app.config.jwtTokenSecret);
        // 获取 redis 中的用户信息
        const user = await ctx.app.redis.get(`eggAuth:token:${payload.id}`);
        // 登录失效
        if (user === null) {
          ctx.status = 401;
          ctx.resBody({ code: 401, message: '登录失效，请重新登录。' });
        } else {
          // 挂载用户信息
          ctx.payload = JSON.parse(user);
          ctx.payload.user.password = null;
          await next();
        }
      } else {
        // 未登录
        ctx.status = 401;
        ctx.resBody({ code: 401, message: '尚未登录，请先登录。' });
      }

    }
  };
};
