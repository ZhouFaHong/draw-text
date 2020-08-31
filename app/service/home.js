'use strict';

const { createCanvas } = require('canvas');

const Service = require('egg').Service;

class HomeService extends Service {
  async drawText(styles) {

    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    console.log(styles.text, styles.fg, styles.bg, 'end');
    // Write "Awesome!"
    ctx.font = '30px Impact';
    ctx.fillStyle = '#' + styles.fg;
    ctx.fillText(styles.text, 0, 0);
    return canvas;
  }
}

module.exports = HomeService;
