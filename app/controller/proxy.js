'use strict';

const Controller = require('egg').Controller;
const puppeteer = require('puppeteer');

class ProxyController extends Controller {
  async proxy() {
    const ctx = this.ctx;
    const url = decodeURIComponent(ctx.query.url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.pdf({ path: 'hn.pdf', format: 'A4' });

    await browser.close();

    ctx.body = '下载成功';
    // const result = await ctx.curl(url, {
    //   headers: {
    //     'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    //   },
    // });
    // // ctx.set(result.header);
    // ctx.status = result.status;
    // ctx.set(result.headers);
    // ctx.body = result.data;
  }
}

module.exports = ProxyController;
