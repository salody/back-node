'use strict';

const Controller = require('egg').Controller;
const ip = require('ip');
const ipLocation = require('iplocation').default;

class UtilController extends Controller {
  async getIp() {
    const { ctx } = this;
    const ipAddress = ctx.params.address;
    if (ip.isV4Format(ipAddress)) {
      const location = await ipLocation(ipAddress);
      ctx.body = JSON.stringify(location);
    } else {
      ctx.body = '请输入正确的Ip地址';
    }
  }

  async redirect() {
    const { ctx } = this;
    console.log(ctx.get('user-agent'));
    const ua = ctx.get('user-agent').toLowerCase();
    const url = decodeURIComponent(ctx.query.url);
    if (/aliapp/i.test(ua)) {
      ctx.set('Content-Type', 'text/html; charset=utf-8');
      ctx.set('Content-Disposition', 'attachment;filename=test.wq');
      await ctx.render('redirect/index.njk', { url });
    } else {
      await ctx.render('redirect/index.njk', { url });
    }
  }
}

module.exports = UtilController;
