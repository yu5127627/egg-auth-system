module.exports = app => {
  const { router, controller: { log }, middleware: { authRules } } = app;

  /* ---------------------------- 分割线 ---------------------------------- */
  router.get('/api/log/login', authRules(['logLogin:list']), log.logLogin.page);
  router.delete('/api/log/login', authRules(['logLogin:delete']), log.logLogin.remove);
};
