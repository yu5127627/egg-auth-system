'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/api/rule', controller.rule.index);
};
