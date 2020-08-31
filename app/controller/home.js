'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    const { text, fg, bg } = ctx.request.query;
    const drawData = {
      text,
      fg,
      bg,
    };
    const canvas = await service.home.drawText(drawData);
    await ctx.render('home', {
      url: canvas.toDataURL(),
    });
    // const quality = 1;
    // ctx.body = canvas.toBuffer('image/png', { quality });
  }
}

module.exports = HomeController;
