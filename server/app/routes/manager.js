'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/manager', controller.manager.index);
};
