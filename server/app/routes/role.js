'use strict';

module.exports = app => {
  const { router, controller: { role }, middleware: { authRules } } = app;

  router.get('/api/role', authRules(['role:list']), role.page);
  router.get('/api/role/list', authRules(['role:list']), role.list);
  router.post('/api/role', authRules(['role:create']), role.create);
  router.delete('/api/role', authRules(['role:delete']), role.remove);
  router.put('/api/role/:id', authRules(['role:update']), role.update);
  router.get('/api/role/:id', authRules(['role:list']), role.item);

  router.post('/api/role/rule/:id', authRules(['role:update']), role.setRules);
  router.get('/api/role/rule/:id', authRules(['role:update']), role.getRules);

};
