module.exports = app => {
  const { router, controller: { manager }, middleware: { authRules } } = app;
  router.get('/api/manager/info', manager.info);

  /* ---------------------------- 分割线 ---------------------------------- */

  router.get('/api/manager', authRules(['manager:list']), manager.index);
  router.get('/api/manager/list', authRules(['manager:list']), manager.list);
  router.post('/api/manager', authRules(['manager:create']), manager.create);
  router.put('/api/manager/:id', authRules(['manager:update']), manager.update);
  router.delete('/api/manager', authRules(['manager:delete']), manager.remove);
  router.get('/api/manager/:id', authRules(['manager:list']), manager.item);
};
