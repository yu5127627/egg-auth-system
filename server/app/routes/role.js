'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/role', controller.role.index);
  router.get('/api/role/list', controller.role.list);
  router.post('/api/role', controller.role.create);
  router.put('/api/role/:id', controller.role.update);
  router.delete('/api/role/:id', controller.role.remove);
  router.get('/api/role/:id', controller.role.item);
};
