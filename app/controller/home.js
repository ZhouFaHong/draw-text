'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { query } = ctx.request;
    // 宽高在 params 里
    const { params } = ctx;
    const l = params.width_height.split('x');
    console.log('params -------', params);
    console.log('list   -------', params.width_height.split('x'));
    query.width = parseFloat(l[0]) || 200;
    query.height = parseFloat(l[1]) || 200;
    console.log('width  -------', parseFloat(l[0]));
    console.log('height -------', parseFloat(l[1]));
    console.log('query  -------', query);
    const canvas = await service.home.drawText(query);
    await ctx.render('home', {
      url: canvas.toDataURL(),
    });
    // const quality = 1;
    // ctx.body = canvas.toBuffer('image/png', { quality });
  }
}

module.exports = HomeController;
