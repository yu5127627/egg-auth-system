
module.exports = app => {
  const { router, controller: { auth }, middleware } = app;
  const verifyManager = middleware.verifyManager();
  router.post('/api/auth/login', verifyManager, auth.login);
};
