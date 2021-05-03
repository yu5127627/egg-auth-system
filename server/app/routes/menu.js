module.exports = app => {
  const { router, controller } = app;
  router.get('/api/menu', controller.menu.index);
  router.get('/api/menu/list', controller.menu.list);
  router.post('/api/menu', controller.menu.create);
  router.delete('/api/menu', controller.menu.remove);
  router.put('/api/menu/:id', controller.menu.update);
  router.get('/api/menu/:id', controller.menu.item);
};
