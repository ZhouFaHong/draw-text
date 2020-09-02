'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('home');
    // ctx.body = 'http://127.0.0.1:7001/drawtext';
  }
}

module.exports = HomeController;
