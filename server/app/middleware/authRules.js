
// 全局权限验证中间件
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
      ctx.status = 403;
      ctx.resBody({ code: 403, message: '无权操作,请联系管理员。' });
    } else {
      await next();
    }
  };
};
