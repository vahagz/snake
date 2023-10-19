const Coordinates = require('../coordinates');
const Gameboard = require('../gameboard');
const RenderSymbol = require('../render-symbol');
const GameboardElement = require('./gameboard-element');

const { int } = require('../../helpers/random');

module.exports = class Food extends GameboardElement {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {Gameboard} gameboard 
   */
  constructor(x, y, gameboard) {
    super(x, y, gameboard);
    this._parts.assign([new RenderSymbol('o', this.coordinates)]);
  }

  update() {
    if (!this.started()) return;

    this.render();

    this.emit('update');
  }

  respawn() {
    this._parts.top().disable();
    this.coordinates = new Coordinates(
      int(1, this._gameboard.width() - 2),
      int(1, this._gameboard.height() - 2)
    );
    this._parts.push(new RenderSymbol('o', this.coordinates));
  }
};
