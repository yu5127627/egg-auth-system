module.exports = app => {
  app.beforeStart(async () => {
    if (app.config.env === 'local') {
      await app.model.sync();
    }
  });
};
