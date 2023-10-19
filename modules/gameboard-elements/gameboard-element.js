const { EventEmitter } = require('stream');
const Coordinates = require("../coordinates");
const Gameboard = require('../gameboard');
const RenderSymbol = require('../render-symbol');
const ArrayMap = require('../../helpers/array-map');
const SyncTimer = require('../sync-timer');

module.exports = class GameboardElement extends EventEmitter {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {Gameboard} gameboard 
   */
  constructor(x, y, gameboard) {
    super();
    /** @protected */
    this.coordinates = new Coordinates(x, y);
    /** @protected @type {ArrayMap<RenderSymbol>} */
    this._parts = new ArrayMap((e) => {
      return e.coords.x + '_' + e.coords.y;
    });
    /** @protected */
    this._gameboard = gameboard;

    /** @private */
    this._started = false;
    /** @private */
    this._startIntervalId = 0;

    /** @private */
    this._fps = 10;

    this.timer = new SyncTimer(this._fps);
  }

  get coords() {
    return this.coordinates;
  }

  render() {
    for (let i = 0; i < this._parts.length; i++) {
      this._gameboard.renderCoord(this._parts[i]);
      if (this._parts[i].removed) {
        this._parts.delete(i--);
      }
    }
    this._gameboard.onRenderEnd();
  }

  update() {
    if (!this.started()) return;

    this.emit('update');
  }

  // startInterval() {
  //   if (this._startIntervalId) {
  //     clearInterval(this._startIntervalId);
  //   }

  //   this._startIntervalId = setInterval(() => {
  //     this.update();
  //   }, 1000 / this.fps);
  // }

  // stopInterval() {
  //   if (this._startIntervalId) clearInterval(this._startIntervalId);
  //   this._startIntervalId = 0;
  // }

  start(fps = 0) {
    // this.fps = (fps || this.fps);
    this.updateFps(fps);
    this._started = true;
    // this.startInterval();
    this.emit('start');
  }

  stop() {
    this._started = false;
    // this.stopInterval();
    this.emit('stop');
  }

  started() {
    return this._started;
  }

  get fps() {
    return this._fps;
  }

  /** @param {number} fps */
  updateFps(fps) {
    fps = parseInt(fps);
    this._fps = (fps > 0 ? fps : 1);
    this.timer.fps(this._fps);
    // this.stopInterval();
    // this.startInterval();
  }
};
