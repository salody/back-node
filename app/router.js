'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.proxy.proxy);
  router.get('/hello', controller.home.index);
  router.get('/ip/:address', controller.util.getIp);
  router.get('/redirect', controller.util.redirect);
};
