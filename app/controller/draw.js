'use strict';

const Controller = require('egg').Controller;

class DrawController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { query } = ctx.request;
    // 宽高在 params 里
    const { params } = ctx;
    const l = params.width_height.split('x');
    console.log('params -------', params);
    console.log('list   -------', l);
    const styles = {
      width_height: params.width_height,
      text: query.text,
      bg: query.bg,
      fg: query.fg,
    };
    console.log('query  -------', query);
    console.log('styles -------', styles);
    const canvas = await service.draw.drawText(styles);
    await ctx.render('draw', {
      width_height: params.width_height,
      url: canvas.toDataURL(),
    });
    // const quality = 1;
    // ctx.body = canvas.toBuffer('image/png', { quality });
  }
}

module.exports = DrawController;
