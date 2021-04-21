module.exports = app => {
  const { router, controller } = app;
  router.get('/api/manager', controller.manager.index);
  router.get('/api/manager/list', controller.manager.list);
  router.post('/api/manager', controller.manager.create);
  router.put('/api/manager/:id', controller.manager.update);
  router.delete('/api/manager/:id', controller.manager.remove);
  router.get('/api/manager/:id', controller.manager.item);
};
