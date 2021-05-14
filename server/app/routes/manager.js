module.exports = app => {
  const { router, controller: { manager } } = app;

  router.get('/api/manager/info', manager.info);

  /* ---------------------------- 分割线 ---------------------------------- */

  router.get('/api/manager', manager.index);
  router.get('/api/manager/list', manager.list);
  router.post('/api/manager', manager.create);
  router.put('/api/manager/:id', manager.update);
  router.delete('/api/manager', manager.remove);
  router.get('/api/manager/:id', manager.item);
};
