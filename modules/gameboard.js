const Readline = require('readline');
const { EventEmitter } = require('stream');
const RenderSymbol = require('./render-symbol');

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = class Gameboard extends EventEmitter {
  /**
   * @param {number} width 
   * @param {number} height 
   */
  constructor(width, height) {
    super();
    /** @private */
    this._width = width;
    /** @private */
    this._height = height;
  }

  width() {
    return this._width;
  }

  height() {
    return this._height;
  }

  /** @param {RenderSymbol} part */
  renderCoord(part) {
    Readline.cursorTo(process.stdout, part.coords.x, part.coords.y);
    if (part.disabled) {
      console.log(' ');
      part.remove();
    } else {
      console.log(part.symbol);
    }
  }

  onRenderEnd() {
    Readline.cursorTo(process.stdout, this.width(), this.height());
  }
}