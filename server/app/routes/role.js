'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/role', controller.role.index);
  router.get('/api/role/list', controller.role.list);
  router.post('/api/role', controller.role.create);
  router.delete('/api/role', controller.role.remove);
  router.put('/api/role/:id', controller.role.update);
  router.get('/api/role/:id', controller.role.item);

  router.post('/api/role/rule/:id', controller.role.setRules);
  router.get('/api/role/rule/:id', controller.role.getRules);

};
