'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/menu', controller.menu.index);
};
