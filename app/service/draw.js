'use strict';

const { createCanvas } = require('canvas');

const Service = require('egg').Service;

class DrawService extends Service {
  async drawText(styles) {

    // 设定默认值
    const { fg: fontBg = '666666', bg: background = 'cccccc', width_height, text: source = width_height } = styles;
    const l = width_height.split('x');
    const width = parseFloat(l[0]) || 200;
    const height = parseFloat(l[1]) || 200;
    console.log('width  -------', width);
    console.log('height -------', height);
    const fontStyle = 'normal';
    const fontVariant = 'normal';
    const fontWeight = 'normal';
    let fontSize = 13;
    if (source.length === 1) {
      fontSize = 35;
    } else if (source.length === 2) {
      fontSize = 30;
    } else if (source.length === 3) {
      fontSize = 25;
    }
    const lineHeight = fontSize || 13;
    const fontFamily = 'sans-serif';
    const textAlign = 'left';
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const textArray = ('' + source).split('').map(item => {
      return {
        value: item,
        width: ctx.measureText(item).width,
      };
    });

    // console.log('textArray------', textArray.length, textArray);
    const { value: lineArray } = textArray.reduce(
      (acc, current) => {
        // console.log('acc------', acc, 'current-----', current);
        if (!acc.reduceEnd) {
          const currentWidth = current.width;
          //   const metrics = ctx.measureText(current.value);
          //   console.log('metrics.width------', metrics.width);
          //   const currentWidth = current.width + 2;
          if (current.value === '\r' || current.value === '\n' || current.value === '\r\n') {
            // 加上本行超出上限
            if ((acc.value.length + 1) * lineHeight > height) {
              acc.reduceEnd = true;
              acc.value[acc.value.length - 1] += '...';
            } else {
              acc.value.splice(acc.value.length, 0, '');
              acc.currentLineWidth = currentWidth;
            }
          } else if (acc.currentLineWidth + currentWidth <= width) {
            acc.currentLineWidth += currentWidth;
            acc.value[acc.value.length - 1] += current.value;
          } else if ((acc.value.length + 1) * lineHeight > height) {
            acc.reduceEnd = true;
            const str = acc.value[acc.value.length - 1];
            acc.value[acc.value.length - 1] =
                str.slice(0, str.length - 1) + '...';
          } else {
            acc.value.splice(acc.value.length, 0, current.value);
            acc.currentLineWidth = currentWidth;
          }
        }
        return acc;
      },
      { value: [ '' ], currentLineWidth: 0, reduceEnd: false }
    );
    console.log('lineArray------', lineArray.length, lineArray);


    // 这里画的是背景
    ctx.beginPath();
    ctx.fillStyle = '#' + background;
    ctx.fillRect(0, 0, width, height);
    // 画字体
    ctx.beginPath();
    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${lineHeight}px ${fontFamily}`;
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#' + fontBg;
    ctx.textAlign = textAlign;

    // 总高
    const totalHeight = lineArray.length * lineHeight;
    const dy = (height - totalHeight) / 2;
    let dx = 0;
    const metrics = ctx.measureText(lineArray[0]);
    if (metrics.width < width) {
      dx = (width - metrics.width) / 2;
    }
    console.log('dx------', dx);
    console.log('dy------', dy);
    lineArray.forEach((item, index) => {
      ctx.fillText(item, dx, dy + (index + 1) * lineHeight, width);
    });
    return canvas;
  }
}

module.exports = DrawService;
