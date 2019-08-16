/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/util/hello', controller.util.index);
  router.get('/util/ip/:address', controller.util.getIp);
  router.get('/util/redirect', controller.util.redirect);
  router.get('*', controller.home.index);
};
