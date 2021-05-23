module.exports = app => {
  const { router, controller: { menu }, middleware: { authRules } } = app;

  router.get('/api/menu', authRules(['menu:list']), menu.page);
  router.get('/api/menu/list', authRules(['menu:list']), menu.list);
  router.post('/api/menu', authRules(['menu:create']), menu.create);
  router.delete('/api/menu', authRules(['menu:delete']), menu.remove);
  router.put('/api/menu/:id', authRules(['menu:update']), menu.update);
  router.get('/api/menu/:id', authRules(['menu:list']), menu.item);
};
