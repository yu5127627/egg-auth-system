module.exports = app => {
  const { router, controller } = app;
  router.get('/api/rule', controller.rule.index);
  router.get('/api/rule/list', controller.rule.list);
  router.post('/api/rule', controller.rule.create);
  router.put('/api/rule/:id', controller.rule.update);
  router.delete('/api/rule/:id', controller.rule.remove);
  router.get('/api/rule/:id', controller.rule.item);
};
