const Coordinates = require("./coordinates");

module.exports = class RenderSymbol {
  /** 
   * @param {string} symbol 
   * @param {Coordinates} coords 
   */
  constructor(symbol, coords) {
    this.symbol = symbol;
    this.coords = coords;
    this.disabled = false;
    this.removed = false;
  }

  disable() {
    this.disabled = true;
  }

  remove() {
    this.removed = true;
  }
};
