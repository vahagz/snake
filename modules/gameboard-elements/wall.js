const Gameboard = require('../gameboard');
const RenderSymbol = require('../render-symbol');
const GameboardElement = require('./gameboard-element');

module.exports = class Wall extends GameboardElement {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {Gameboard} gameboard 
   */
  constructor(x, y, gameboard) {
    super(x, y, gameboard);
    this._parts.assign([new RenderSymbol('#', this.coordinates)]);
  }

  update() {

  }
};
