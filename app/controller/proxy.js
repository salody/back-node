'use strict';

const Controller = require('egg').Controller;

class ProxyController extends Controller {
  async proxy() {
    const ctx = this.ctx;

    ctx.body = '下载成功';
  }
}

module.exports = ProxyController;
