module.exports = app => {
  const { router, controller: { log }, middleware: { authRules } } = app;

  /* ---------------------------- 分割线 ---------------------------------- */
  router.get('/api/log/login', authRules(['logLogin:list']), log.logLogin.page);
  // router.get('/api/manager/list', authRules(['manager:list']), log.logLongin.list);
  // router.post('/api/manager', authRules(['manager:create']), log.logLongin.create);
  // router.put('/api/manager/:id', authRules(['manager:update']), log.logLongin.update);
  router.delete('/api/log/login', authRules(['logLogin:delete']), log.logLogin.remove);
  // router.get('/api/manager/:id', authRules(['manager:list']), log.logLongin.item);
};
