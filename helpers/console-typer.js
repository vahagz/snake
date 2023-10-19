const Readline = require('readline');
const Coordinates = require('../modules/coordinates');
const Stack = require('./stack');

class ConsoleTyper {
  /** @private */
  static _lastCoordsCount = 10;
  /** @private @type {Stack<Coordinates>} */
  static _lastCoords = new Stack(this._lastCoordsCount);

  static get terminalWidth() { return process.stdout.columns; }
  static get terminalHeight() { return process.stdout.rows; }

  static isReachable(x, y) {
    return Boolean(
      x >= 0 && x < this.terminalWidth &&
      y >= 0 && y < this.terminalHeight
    );
  }

  static isReachableCoord(coord) {
    return this.isReachable(coord.x, coord.y);
  }

  /** @returns {Promise<void>} */
  static cursorTo(x, y) {
    this._lastCoords.push(new Coordinates(x, y));
    return new Promise(resolve => Readline.cursorTo(process.stdout, x, y, resolve));
  }

  /** @param {Coordinates} coord */
  static cursorToCoord(coord) {
    return this.cursorTo(coord.x, coord.y);
  }

  static moveCursor(x = 0, y = 0) {
    this._lastCoords.push(new Coordinates(x, y));
    return new Promise(resolve => Readline.moveCursor(process.stdout, x, y, resolve));
  }

  static writeSymbol(...symbols) {
    let count = 0;
    symbols.forEach(symbol => {
      count += String(symbol).length;
      process.stdout.write(String(symbol));
    });
    const last = this._lastCoords.pop();
    this._lastCoords.push(new Coordinates(last.x + count, last.y));
  }

  static cursorBack(count = 1) {
    count = (count >= this._lastCoordsCount) ? this._lastCoordsCount - 1 : count;
    while (count-- && !this._lastCoords.empty()) this._lastCoords.pop();

    if (!this._lastCoords.empty()) {
      const coords = this._lastCoords.top();
      Readline.cursorTo(process.stdout, coords.x, coords.y);
      return coords;
    }
  }

  static logTo(x, y, ...text) {
    this.cursorTo(x, y);
    this.writeSymbol(...text);
    this.cursorBack();
  }

  /** @param {Coordinates} coord */
  static logToCoord(coord, ...text) {
    this.logTo(coord.x, coord.y, ...text);
  }
};

module.exports = ConsoleTyper;
