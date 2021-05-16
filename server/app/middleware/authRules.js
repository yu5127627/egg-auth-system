
// 全局路由验证中间件
module.exports = rules => {
  return async function (ctx, next) {
    const haveRules = ctx.payload.rules;
    let disable = false;
    for (const rule of rules) {
      if (!haveRules.includes(rule)) {
        disable = true;
        break;
      }
    }
    if (disable) {
      ctx.status = 401;
      ctx.resBody({ code: 401, message: '无权操作' });
    } else {
      await next();
    }
  };
};
